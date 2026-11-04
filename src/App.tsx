import { useEffect, useRef, useState, type CSSProperties } from "react"
import {
  appProjects,
  creativeBrands,
  education,
  experience,
  services,
  skillGroups,
  websiteProjects,
  type CreativeBrand,
} from "./data/portfolio"
import { AppleLogo, Arrow, ExternalLink, Instagram } from "./components/Icons"
import { Lightbox } from "./components/Lightbox"

type WorkFilter = "All" | "Websites" | "Mobile Apps"
type CreativeFilter = "All" | CreativeBrand["id"]

const workFilters: WorkFilter[] = ["All", "Websites", "Mobile Apps"]

const tickerItems = [
  "Software development",
  "Graphic design",
  "Social media",
  "Mobile apps",
  "Brand direction",
  "Content strategy",
]

function SectionHead({
  number,
  label,
  title,
  description,
}: {
  number: string
  label: string
  title: React.ReactNode
  description?: string
}) {
  return (
    <header className="section-head" data-reveal>
      <p className="eyebrow">
        <span>{number}</span>
        {label}
      </p>
      <div className="section-head-row">
        <h2>{title}</h2>
        {description ? <p className="section-description">{description}</p> : null}
      </div>
    </header>
  )
}

function StoreBadge({ href }: { href: string }) {
  return (
    <a
      className="store-badge"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on the App Store (opens in a new tab)"
    >
      <AppleLogo className="store-logo" />
      <span>
        <small>Download on the</small>
        <strong>App Store</strong>
      </span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [workFilter, setWorkFilter] = useState<WorkFilter>("All")
  const [creativeFilter, setCreativeFilter] = useState<CreativeFilter>("All")
  const [lightbox, setLightbox] = useState<{ brand: CreativeBrand; index: number } | null>(
    null,
  )

  const progress = useRef<HTMLSpanElement | null>(null)
  const hero = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        setScrolled((current) => {
          const next = y > 24
          return current === next ? current : next
        })
        if (progress.current) {
          const max = document.documentElement.scrollHeight - window.innerHeight
          progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
        }
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const node = hero.current
    if (!node || !window.matchMedia("(hover: hover)").matches) return
    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const rect = node.getBoundingClientRect()
        node.style.setProperty("--mx", `${event.clientX - rect.left}px`)
        node.style.setProperty("--my", `${event.clientY - rect.top}px`)
      })
    }
    node.addEventListener("pointermove", onMove)
    return () => {
      node.removeEventListener("pointermove", onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]")
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-in"))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-in")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [workFilter, creativeFilter])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const visibleBrands =
    creativeFilter === "All"
      ? creativeBrands
      : creativeBrands.filter((brand) => brand.id === creativeFilter)

  const showWebsites = workFilter !== "Mobile Apps"
  const showApps = workFilter !== "Websites"
  const workCount =
    (showWebsites ? websiteProjects.length : 0) + (showApps ? appProjects.length : 0)

  const filterWork = (filter: WorkFilter) => {
    setWorkFilter(filter)
  }

  const filterCreative = (filter: CreativeFilter) => {
    setCreativeFilter(filter)
    setLightbox(null)
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="scroll-progress" aria-hidden="true">
        <span ref={progress} />
      </div>

      <header className={`nav${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-active" : ""}`}>
        <div className="nav-inner">
          <a className="monogram" href="#top" aria-label="Giscard Ngabonziza, back to top">
            GN<span>.</span>
          </a>

          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#about">
              <small>01</small>About
            </a>
            <a href="#work">
              <small>03</small>Work
            </a>
            <a href="#social">
              <small>04</small>Social
            </a>
            <a href="#experience">
              <small>06</small>Experience
            </a>
            <a href="#contact">
              <small>08</small>Contact
            </a>
          </nav>

          <div className="nav-end">
            <a className="availability" href="#contact">
              <i aria-hidden="true" />
              Available for select projects
            </a>
            <button
              type="button"
              className="menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {[
            ["01", "About", "#about"],
            ["02", "Capabilities", "#services"],
            ["03", "Work", "#work"],
            ["04", "Social & Creative", "#social"],
            ["05", "Toolkit", "#toolkit"],
            ["06", "Experience", "#experience"],
            ["07", "Education", "#education"],
            ["08", "Contact", "#contact"],
          ].map(([number, label, href], index) => (
            <a
              href={href}
              key={href}
              onClick={closeMenu}
              style={{ "--i": index } as CSSProperties}
            >
              <small>{number}</small>
              <span>{label}</span>
              <Arrow diagonal />
            </a>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <div>
            <span>Say hello</span>
            <a href="mailto:ngabogiscard@hotmail.com">ngabogiscard@hotmail.com</a>
          </div>
          <div>
            <span>Find me</span>
            <div className="mobile-socials">
              <a
                href="https://www.instagram.com/giscard_tyler"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/giscard-ngabonziza"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/giscardng"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <p>Kigali, Rwanda · Working worldwide</p>
        </div>
      </div>

      <main id="main">
        <section className="hero" id="top" ref={hero}>
          <span className="hero-ghost" aria-hidden="true">
            GN
          </span>
          <div className="shell">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="hero-kicker reveal">
                  <i aria-hidden="true" />
                  Multidisciplinary digital professional · Kigali, Rwanda
                </p>
                <h1 className="reveal delay-1">
                  <span>I turn ideas</span>
                  <span>
                    into <em>digital</em>
                  </span>
                  <span>experiences.</span>
                </h1>
              </div>

              <div className="hero-portrait reveal delay-2">
                <div className="orbit-badge" aria-hidden="true">
                  <svg viewBox="0 0 120 120">
                    <defs>
                      <path
                        id="orbit-path"
                        d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                      />
                    </defs>
                    <text>
                      <textPath href="#orbit-path">
                        Open for select projects · Digital craft
                      </textPath>
                    </text>
                  </svg>
                  <span>
                    <Arrow diagonal />
                  </span>
                </div>

                <figure className="portrait-card">
                  <div className="portrait-caption">
                    <span>Based in Kigali</span>
                    <span>Working worldwide</span>
                  </div>
                  <div className="portrait-frame">
                    <img
                      src="/Giscard.jpg"
                      srcSet="/Giscard-sm.jpg 720w, /Giscard.jpg 1086w"
                      sizes="(max-width: 760px) 88vw, 34vw"
                      width="1086"
                      height="1448"
                      alt="Giscard Ngabonziza, designer and developer, photographed at his desk in Kigali"
                      fetchPriority="high"
                    />
                    <span className="portrait-tag">
                      Designer · Developer <br /> Storyteller
                    </span>
                  </div>
                  <figcaption>
                    <strong>Giscard Ngabonziza</strong>
                    <span>Building brands from first thought to final pixel.</span>
                  </figcaption>
                </figure>
              </div>

              <div className="hero-intro reveal delay-3">
                <p>
                  I’m <strong>Giscard Ngabonziza</strong> — I design, develop and
                  grow ambitious digital brands from first thought to final pixel.
                </p>
                <div className="hero-actions">
                  <a className="button button-light" href="#work">
                    Explore selected work <Arrow />
                  </a>
                  <a className="text-link" href="#contact">
                    Start a project <Arrow diagonal />
                  </a>
                </div>
              </div>

              <div className="hero-meta reveal delay-3">
                <div className="hero-stats">
                  <div>
                    <strong>08+</strong>
                    <span>Years creating</span>
                  </div>
                  <div>
                    <strong>40+</strong>
                    <span>Projects delivered</span>
                  </div>
                  <div>
                    <strong>04</strong>
                    <span>Brands managed</span>
                  </div>
                </div>
                <a className="scroll-cue" href="#about">
                  <span>Scroll to discover</span>
                  <i aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div className="ticker-group" key={copy}>
                {tickerItems.map((item) => (
                  <span key={`${copy}-${item}`}>
                    {item}
                    <i>✦</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="section about" id="about">
          <div className="shell">
            <SectionHead
              number="01"
              label="About"
              title={
                <>
                  One mind. Many disciplines.
                  <br />
                  <em>A singular focus on impact.</em>
                </>
              }
            />
            <div className="about-grid">
              <div className="about-lead" data-reveal>
                <p>
                  I sit at the intersection of <em>design, engineering</em> and{" "}
                  <em>digital strategy</em> — turning complex challenges into
                  experiences people choose to use.
                </p>
                <div className="about-note">
                  <span className="micro-label">Currently</span>
                  <p>
                    Building software at Sixcode, and shaping the social worlds of
                    brands across Rwanda.
                  </p>
                  <a className="text-link" href="#contact">
                    Work with me <Arrow diagonal />
                  </a>
                </div>
              </div>
              <div className="about-body" data-reveal style={{ "--delay": "120ms" } as CSSProperties}>
                <p>
                  My work moves fluidly between code and culture. I can architect
                  the platform, shape the interface, build the brand, and create the
                  strategy that puts it in front of the right people.
                </p>
                <p>
                  That range isn’t about doing everything. It’s about seeing the
                  whole picture — and making every part work harder together.
                </p>
                <div className="stat-row">
                  <div>
                    <strong>08+</strong>
                    <span>Years creating</span>
                  </div>
                  <div>
                    <strong>40+</strong>
                    <span>Projects delivered</span>
                  </div>
                  <div>
                    <strong>04</strong>
                    <span>Markets served</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="shell">
            <SectionHead
              number="02"
              label="Capabilities"
              title={
                <>
                  One practice.
                  <br />
                  <em>Six ways in.</em>
                </>
              }
              description="From the first line of code to the last post in a campaign — the full digital picture, handled with care."
            />
            <div className="service-list">
              {services.map((service) => (
                <article className="service-row" key={service.number} data-reveal>
                  <span className="service-number">{service.number}</span>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <span className="service-arrow" aria-hidden="true">
                    <Arrow diagonal />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section work" id="work">
          <div className="shell">
            <SectionHead
              number="03"
              label="Selected software & applications"
              title={
                <>
                  Digital products,
                  <br />
                  <em>made real.</em>
                </>
              }
              description="Websites, platforms and mobile applications built to move businesses forward — and make everyday work feel lighter."
            />

            <div className="filter-bar">
              <div className="work-filters" role="group" aria-label="Filter projects by type">
                {workFilters.map((filter) => {
                  const count =
                    filter === "All"
                      ? websiteProjects.length + appProjects.length
                      : filter === "Websites"
                        ? websiteProjects.length
                        : appProjects.length
                  return (
                    <button
                      type="button"
                      key={filter}
                      className={workFilter === filter ? "is-active" : ""}
                      onClick={() => filterWork(filter)}
                      aria-pressed={workFilter === filter}
                    >
                      {filter}
                      <span>{String(count).padStart(2, "0")}</span>
                    </button>
                  )
                })}
              </div>
              <p className="filter-count" aria-live="polite">
                {String(workCount).padStart(2, "0")} {workCount === 1 ? "project" : "projects"}
              </p>
            </div>

            {showWebsites ? (
              <div className="work-group" key={`websites-${workFilter}`}>
                <div className="work-group-label">
                  <span>Websites & platforms</span>
                  <span>04 live products</span>
                </div>
                <div className="project-grid">
                  {websiteProjects.map((project, index) => (
                    <a
                      className={`project-card${project.featured ? " featured" : ""}`}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={project.id}
                      data-reveal
                      style={{ "--delay": `${index * 70}ms` } as CSSProperties}
                      aria-label={`${project.name} — visit live website (opens in a new tab)`}
                    >
                      <div className="project-visual">
                        <div className="browser">
                          <div className="browser-bar" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                            <p>{project.displayUrl}</p>
                            <ExternalLink className="browser-open" />
                          </div>
                          <div className="browser-shot">
                            <img
                              src={project.image}
                              alt={project.imageAlt}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>
                        <span className="project-orbit" aria-hidden="true">
                          <Arrow diagonal />
                        </span>
                      </div>
                      <div className="project-info">
                        <div className="project-info-top">
                          <p className="project-index">
                            {String(index + 1).padStart(2, "0")} — {project.discipline}
                          </p>
                          <h3>{project.name}</h3>
                          <p className="project-summary">{project.summary}</p>
                          <p className="project-description">{project.description}</p>
                        </div>
                        <div className="project-foot">
                          <ul className="tags" aria-label="Project disciplines">
                            {project.tags.map((tag) => (
                              <li key={tag}>{tag}</li>
                            ))}
                          </ul>
                          <span className="project-link">
                            Visit site <Arrow diagonal />
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            {showApps ? (
              <div className="work-group apps-group" key={`apps-${workFilter}`}>
                <div className="work-group-label">
                  <span>Mobile applications</span>
                  <span>Available on the App Store</span>
                </div>
                <div className="app-grid">
                  {appProjects.map((app, index) => (
                    <article
                      className="app-card"
                      key={app.id}
                      data-reveal
                      style={
                        {
                          "--accent": app.accent,
                          "--delay": `${index * 90}ms`,
                        } as CSSProperties
                      }
                    >
                      <div className="app-copy">
                        <p className="project-index">iOS application — 0{index + 5}</p>
                        <div className="app-title">
                          <img src={app.icon} alt="" width="56" height="56" loading="lazy" />
                          <h3>{app.name}</h3>
                        </div>
                        <p className="project-summary">{app.summary}</p>
                        <p className="project-description">{app.description}</p>
                        <ul className="tags" aria-label="Project disciplines">
                          {app.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                        <div className="app-actions">
                          <StoreBadge href={app.storeUrl} />
                          <a
                            className="text-link"
                            href={app.storeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View on the App Store <Arrow diagonal />
                          </a>
                        </div>
                      </div>
                      <div className="app-visual" aria-hidden={false}>
                        <span className="app-halo" aria-hidden="true" />
                        <div className="phone">
                          <span className="phone-island" aria-hidden="true" />
                          <img src={app.screen} alt={app.screenAlt} loading="lazy" />
                          <span className="phone-glare" aria-hidden="true" />
                        </div>
                        <img
                          className="app-sticker"
                          src={app.icon}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="section social" id="social">
          <div className="shell">
            <SectionHead
              number="04"
              label="Social Media & Creative Work"
              title={
                <>
                  Designing
                  <br />
                  <em>the conversation.</em>
                </>
              }
              description="Graphic design and social media, brought together. Campaigns, posters and daily content made for brands that live in the feed."
            />

            <div className="social-intro" data-reveal>
              <p className="social-statement">
                Four brands. Eight years. <em>One consistent point of view.</em>
              </p>
              <div className="social-note">
                <p>
                  I designed the graphics, created the visual content, published the
                  posts and managed these brands’ social media presence — primarily
                  on Instagram.
                </p>
                <span className="micro-label">Selected archive · 2018—2026</span>
              </div>
            </div>

            <div className="brand-filters" role="group" aria-label="Filter creative work by brand">
              <button
                type="button"
                className={creativeFilter === "All" ? "is-active" : ""}
                onClick={() => filterCreative("All")}
                aria-pressed={creativeFilter === "All"}
              >
                <span className="brand-filter-all" aria-hidden="true">
                  ✦
                </span>
                All brands
                <small>04</small>
              </button>
              {creativeBrands.map((brand) => (
                <button
                  type="button"
                  key={brand.id}
                  className={creativeFilter === brand.id ? "is-active" : ""}
                  onClick={() => filterCreative(brand.id)}
                  aria-pressed={creativeFilter === brand.id}
                >
                  <img src={brand.logo} alt="" loading="lazy" />
                  {brand.shortName}
                  <small>{brand.posters.length || "IG"}</small>
                </button>
              ))}
            </div>

            <div className="brand-list" key={`creative-${creativeFilter}`}>
              {visibleBrands.map((brand, brandIndex) => {
                const globalIndex = creativeBrands.findIndex((item) => item.id === brand.id)
                return (
                  <article className="brand-chapter" key={brand.id}>
                    <header className="brand-head" data-reveal>
                      <div className="brand-mark">
                        <img src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
                      </div>
                      <div className="brand-title">
                        <p className="brand-kicker">
                          {String(globalIndex + 1).padStart(2, "0")} — {brand.handle}
                        </p>
                        <h3>{brand.name}</h3>
                      </div>
                      <div className="brand-side">
                        <span>{brand.years}</span>
                        <a
                          href={brand.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${brand.name} on Instagram (opens in a new tab)`}
                        >
                          <Instagram className="brand-ig-icon" />
                          Instagram
                          <Arrow diagonal />
                        </a>
                      </div>
                    </header>

                    <div className="brand-body">
                      <div className="brand-copy" data-reveal>
                        <p>{brand.description}</p>
                        <ul>
                          {brand.focus.map((item) => (
                            <li key={item}>
                              <span aria-hidden="true">✦</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <a
                          className="brand-visit"
                          href={brand.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit {brand.handle} <Arrow diagonal />
                        </a>
                      </div>

                      {brand.posters.length ? (
                        <div className="poster-grid" data-reveal>
                          {brand.posters.map((poster, index) => (
                            <button
                              type="button"
                              className="poster"
                              key={poster.src}
                              onClick={() => setLightbox({ brand, index })}
                              aria-label={`Open ${poster.title} — ${poster.type} in the ${brand.name} gallery`}
                              style={
                                {
                                  "--delay": `${index * 50}ms`,
                                  "--brand": brand.accent,
                                } as CSSProperties
                              }
                            >
                              <img
                                src={poster.src}
                                alt={poster.alt}
                                loading={index < 2 && brandIndex === 0 ? "eager" : "lazy"}
                                decoding="async"
                              />
                              <span className="poster-caption">
                                <strong>{poster.title}</strong>
                                <small>{poster.type}</small>
                              </span>
                              <span className="poster-open" aria-hidden="true">
                                <Arrow diagonal />
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="brand-plaque"
                          data-reveal
                          style={
                            {
                              "--brand": brand.accent,
                              "--brand-dark": brand.accentDark,
                            } as CSSProperties
                          }
                        >
                          <div className="plaque-top">
                            <span>Brand spotlight</span>
                            <span>{brand.years}</span>
                          </div>
                          <div className="plaque-mark">
                            <img src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
                          </div>
                          <p className="plaque-name">{brand.shortName}</p>
                          <div className="plaque-foot">
                            <span>Social media & creative direction</span>
                            <a
                              href={brand.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {brand.handle} <Arrow diagonal />
                            </a>
                          </div>
                          <span className="plaque-shine" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>

            <p className="archive-note" data-reveal>
              A selection from the archive. Full campaign work and additional
              creative direction are available on request.
            </p>
          </div>
        </section>

        <section className="section toolkit" id="toolkit">
          <div className="shell">
            <SectionHead
              number="05"
              label="Toolkit"
              title={
                <>
                  Fluent in ideas
                  <br />
                  <em>and execution.</em>
                </>
              }
              description="Tools change. The ability to learn, adapt and make the right thing endures."
            />
            <div className="skill-groups">
              {skillGroups.map((group, index) => (
                <div
                  className="skill-group"
                  key={group.label}
                  data-reveal
                  style={{ "--delay": `${index * 90}ms` } as CSSProperties}
                >
                  <p className="skill-label">
                    <span>0{index + 1}</span>
                    {group.label}
                  </p>
                  <div className="skill-cloud">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="shell">
            <SectionHead
              number="06"
              label="Experience"
              title={
                <>
                  A career built
                  <br />
                  <em>across disciplines.</em>
                </>
              }
              description="A decade spent moving between code, design and the conversations that connect a brand to its people."
            />
            <div className="timeline">
              {experience.map((item, index) => (
                <article
                  className="timeline-row"
                  key={`${item.company}-${item.date}`}
                  data-reveal
                  style={{ "--delay": `${index * 50}ms` } as CSSProperties}
                >
                  <span className="timeline-date">{item.date}</span>
                  <div className="timeline-company">
                    <span>0{index + 1}</span>
                    <h3>{item.company}</h3>
                  </div>
                  <div className="timeline-detail">
                    <h4>{item.role}</h4>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section education" id="education">
          <div className="shell">
            <SectionHead
              number="07"
              label="Education & credentials"
              title={
                <>
                  Always learning.
                  <br />
                  <em>Always sharpening.</em>
                </>
              }
            />
            <div className="education-grid">
              {education.map((item, index) => (
                <article key={item.title} data-reveal style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
                  <span className="education-type">
                    {item.type} · 0{index + 1}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.institution}</p>
                  <small>{item.detail}</small>
                  <Arrow diagonal className="education-arrow" />
                </article>
              ))}
            </div>
            <p className="placeholder-disclaimer">
              Education details shown as portfolio-ready placeholders and should be
              confirmed before publishing.
            </p>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="shell">
            <p className="eyebrow" data-reveal>
              <span>08</span>
              Start a conversation
            </p>
            <div className="contact-head" data-reveal>
              <h2>
                Have an idea?
                <br />
                <em>Let’s make it real.</em>
              </h2>
              <a
                className="round-link"
                href="mailto:ngabogiscard@hotmail.com"
                aria-label="Email Giscard"
              >
                <Arrow diagonal />
              </a>
            </div>

            <div className="contact-grid" data-reveal>
              <div>
                <span>Email</span>
                <a href="mailto:ngabogiscard@hotmail.com">ngabogiscard@hotmail.com</a>
              </div>
              <div>
                <span>Call / WhatsApp</span>
                <a href="https://wa.me/250785036809" target="_blank" rel="noopener noreferrer">
                  +250 785 036 809
                </a>
              </div>
              <div>
                <span>Based in</span>
                <p>Kigali, Rwanda</p>
              </div>
            </div>

            <div className="socials" data-reveal>
              <a
                href="https://www.instagram.com/giscard_tyler"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <Arrow diagonal />
              </a>
              <a
                href="https://www.linkedin.com/in/giscard-ngabonziza"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <Arrow diagonal />
              </a>
              <a href="https://github.com/giscardng" target="_blank" rel="noopener noreferrer">
                GitHub <Arrow diagonal />
              </a>
              <a href="https://wa.me/250785036809" target="_blank" rel="noopener noreferrer">
                WhatsApp <Arrow diagonal />
              </a>
            </div>

            <div className="contact-foot" data-reveal>
              <span>
                <i aria-hidden="true" /> Currently available for select projects
              </span>
              <span>Typical reply within 24 hours</span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell">
          <div className="footer-top">
            <p>
              Designing. Developing. <em>Creating impact.</em>
            </p>
            <a href="#top">Back to top ↑</a>
          </div>
          <div className="footer-wordmark" aria-hidden="true">
            GISCARD<span>.</span>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Giscard Ngabonziza</span>
            <span>Kigali, Rwanda · Working worldwide</span>
            <span>Built with care</span>
          </div>
        </div>
      </footer>

      {lightbox ? (
        <Lightbox
          brand={lightbox.brand.name}
          posters={lightbox.brand.posters}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onChange={(index) => setLightbox((current) => (current ? { ...current, index } : null))}
        />
      ) : null}
    </>
  )
}

export default App
