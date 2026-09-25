import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CalendarDays, Pause, Play } from "lucide-react";
import { categories, detailPath, featuredContent, formatDate, sectionPath, upcomingReleases } from "../../fandom/catalog";
import MediaModal from "./MediaModal";
import "../../styles/Fandom.css";

export function CategoryShowcase() {
  return (
    <section className="home-categories" aria-labelledby="home-categories-title">
      <div className="fv-container">
        <header className="fv-section-head">
          <div>
            <span className="fv-eyebrow">Seven worlds</span>
            <h2 id="home-categories-title">Explore Categories</h2>
            <p>Pick a hub to dive into its articles, galleries, videos, characters, events, merch and trailers.</p>
          </div>
          <Link className="fv-button-outline" to="/search">Search everything <ArrowRight size={16} /></Link>
        </header>

        <div className="home-category-grid">
          {categories.map((category, index) => (
            <Link key={category.slug} to={category.path} className={`home-category home-category-${index}`}>
              <img src={category.heroImage} alt="" loading="lazy" />
              <span className="home-category-symbol" aria-hidden="true">{category.icon}</span>
              <span className="home-category-copy">
                <small>{String(index + 1).padStart(2, "0")} · {category.items.length} items</small>
                <strong>{category.name}</strong>
                <em>{category.summary}</em>
              </span>
              <span className="home-category-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const featuredTabs = [
  { key: "article", label: "Articles" },
  { key: "trailer", label: "Trailers" },
  { key: "event", label: "Events" },
];

const ROTATE_MS = 6000;

export function FeaturedShowcase() {
  const [tab, setTab] = useState("article");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  const [playing, setPlaying] = useState(null);
  const items = featuredContent.filter((item) => item.type === tab).slice(0, 7);
  const spotlight = items[active] || items[0];

  useEffect(() => {
    if (paused || items.length < 2) return undefined;
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % items.length), ROTATE_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, items.length, tab]);

  const selectTab = (key) => {
    setTab(key);
    setActive(0);
  };

  const open = (item) => (item.type === "trailer" ? setPlaying(item) : null);

  return (
    <section className="home-featured" aria-labelledby="home-featured-title">
      <div className="fv-container">
        <header className="fv-section-head">
          <div>
            <span className="fv-eyebrow">Across every hub</span>
            <h2 id="home-featured-title">Featured this week</h2>
          </div>
          <div className="fv-segmented" role="tablist" aria-label="Featured content type">
            {featuredTabs.map((entry) => (
              <button key={entry.key} type="button" role="tab" aria-selected={tab === entry.key} className={tab === entry.key ? "active" : ""} onClick={() => selectTab(entry.key)}>
                {entry.label}
              </button>
            ))}
          </div>
        </header>

        {spotlight && (
          <div className="home-featured-layout" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <article key={spotlight.uid} className="home-spotlight">
              <img src={spotlight.image} alt="" />
              <div className="home-spotlight-copy">
                <span className="fv-chip">{spotlight.categoryName}</span>
                <h3>{spotlight.title}</h3>
                <p>{spotlight.description}</p>
                <div className="home-spotlight-meta">
                  {spotlight.date && <span><CalendarDays size={14} /> {formatDate(spotlight.date)}</span>}
                  {spotlight.location && <span>{spotlight.location}</span>}
                </div>
                {spotlight.type === "trailer" ? (
                  <button type="button" className="hub-hero-primary" onClick={() => open(spotlight)}>
                    <Play size={16} fill="currentColor" /> Watch trailer
                  </button>
                ) : (
                  <Link className="hub-hero-primary" to={detailPath(spotlight)}>
                    {spotlight.type === "event" ? "Event details" : "Read article"} <ArrowRight size={16} />
                  </Link>
                )}
              </div>
              {!paused && <span className="home-spotlight-progress" key={`${tab}-${active}`} style={{ animationDuration: `${ROTATE_MS}ms` }} />}
            </article>

            <ol className="home-featured-list">
              {items.map((item, index) => (
                <li key={item.uid}>
                  <button type="button" className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-current={index === active}>
                    <img src={item.image} alt="" loading="lazy" />
                    <span>
                      <small>{item.categoryName}</small>
                      <strong>{item.title}</strong>
                    </span>
                  </button>
                </li>
              ))}
              <li className="home-featured-controls">
                <button type="button" className="fv-icon-button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume rotation" : "Pause rotation"}>
                  {paused ? <Play size={15} /> : <Pause size={15} />}
                </button>
                <Link className="fv-link-button" to={spotlight.type === "article" ? "/search?type=article" : spotlight.type === "trailer" ? "/Trailers" : "/releases"}>
                  View all {featuredTabs.find((entry) => entry.key === tab).label.toLowerCase()} →
                </Link>
              </li>
            </ol>
          </div>
        )}
      </div>

      {playing && <MediaModal items={[playing]} index={0} onNavigate={() => {}} onClose={() => setPlaying(null)} />}
    </section>
  );
}

export function HubStrip() {
  const trailers = upcomingReleases.filter((item) => item.type === "trailer").slice(0, 4);
  if (!trailers.length) return null;
  return (
    <section className="home-strip" aria-label="Coming soon">
      <div className="fv-container home-strip-inner">
        <strong>Coming soon</strong>
        {trailers.map((item) => (
          <Link key={item.uid} to={sectionPath(item)}>
            {item.title} <small>{formatDate(item.date)}</small>
          </Link>
        ))}
        <Link to="/releases" className="home-strip-all">Release calendar →</Link>
      </div>
    </section>
  );
}
