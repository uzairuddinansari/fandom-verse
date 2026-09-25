import { useState } from "react";
import { Check, Clock3, LocateFixed, Mail, MapPin, Navigation, Phone, Send } from "lucide-react";
import team from "../JSON/team.json";
import Breadcrumbs from "../components/fandom/Breadcrumbs";
import "../styles/Fandom.css";

const { studio, members } = team;

/* Great-circle distance in kilometres. */
const distanceKm = (a, b) => {
  const rad = (deg) => (deg * Math.PI) / 180;
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

const embedFor = (query) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;

export default function ContactPage() {
  const [position, setPosition] = useState(null);
  const [gpsState, setGpsState] = useState("idle");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const locate = () => {
    if (!navigator.geolocation) {
      setGpsState("unsupported");
      return;
    }
    setGpsState("loading");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ latitude: coords.latitude, longitude: coords.longitude });
        setGpsState("found");
      },
      () => setGpsState("denied"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const submit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const nextErrors = {};
    if (!data.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) nextErrors.email = "Please enter a valid email address.";
    if (data.message.trim().length < 10) nextErrors.message = "Your message should be at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSent(true);
    event.currentTarget.reset();
  };

  const mapSrc = position ? embedFor(`${position.latitude},${position.longitude}`) : embedFor(studio.mapQuery);
  const directions = position
    ? `https://www.google.com/maps/dir/?api=1&origin=${position.latitude},${position.longitude}&destination=${encodeURIComponent(studio.mapQuery)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studio.mapQuery)}`;

  return (
    <main className="fv-page">
      <div className="fv-container">
        <Breadcrumbs trail={[{ label: "Contact us" }]} />
        <header className="fv-page-hero">
          <span className="fv-eyebrow">Contact us</span>
          <h1>Talk to the team.</h1>
          <p>Questions, feedback, accessibility needs or ideas for the next fandom — we&rsquo;d love to hear from you.</p>
        </header>

        <div className="fv-contact">
          <form className="fv-panel fv-form" onSubmit={submit} noValidate>
            <h2>Send a message</h2>
            {sent && (
              <p className="fv-success" role="status">
                <Check size={18} /> Thanks! Your message was received (demo only — nothing is sent to a server).
              </p>
            )}
            <label>
              <span>Name</span>
              <input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} onChange={() => setSent(false)} />
              {errors.name && <small className="fv-error">{errors.name}</small>}
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
              {errors.email && <small className="fv-error">{errors.email}</small>}
            </label>
            <label>
              <span>Topic</span>
              <select name="topic" defaultValue="General question">
                <option>General question</option>
                <option>Content suggestion</option>
                <option>Accessibility feedback</option>
                <option>Event partnership</option>
              </select>
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={5} aria-invalid={Boolean(errors.message)} />
              {errors.message && <small className="fv-error">{errors.message}</small>}
            </label>
            <button type="submit" className="fv-button"><Send size={16} /> Send message</button>
          </form>

          <aside className="fv-panel fv-location">
            <div className="fv-map">
              <iframe title={position ? "Map of your current location" : `Map of ${studio.name}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <h2>{studio.name}</h2>
            <ul className="fv-contact-list">
              <li><MapPin size={16} /> {studio.address}</li>
              <li><Mail size={16} /> <a href={`mailto:${studio.email}`}>{studio.email}</a></li>
              <li><Phone size={16} /> <a href={`tel:${studio.phone.replace(/\s/g, "")}`}>{studio.phone}</a></li>
              <li><Clock3 size={16} /> {studio.hours}</li>
            </ul>
            <div className="fv-actions">
              <button type="button" className="fv-button" onClick={locate} disabled={gpsState === "loading"}>
                <LocateFixed size={16} /> {gpsState === "loading" ? "Locating…" : "Use my GPS location"}
              </button>
              <a className="fv-button-outline" href={directions} target="_blank" rel="noreferrer">
                <Navigation size={16} /> {position ? "Get directions" : "Open in Google Maps"}
              </a>
            </div>
            <p className="fv-muted" role="status">
              {gpsState === "found" &&
                `You are about ${distanceKm(position, studio).toFixed(1)} km from our studio. The map now shows your location.`}
              {gpsState === "denied" && "Location permission was declined or unavailable."}
              {gpsState === "unsupported" && "Your browser does not support GPS location."}
              {gpsState === "idle" && "Your location is used only in this browser and never stored."}
            </p>
          </aside>
        </div>

        <section className="fv-team" aria-labelledby="team-contact-title">
          <h2 id="team-contact-title">Team contacts</h2>
          <div className="fv-team-grid">
            {members.map((member) => (
              <article key={member.name} className="fv-panel fv-member">
                <img src={member.image} alt={member.name} loading="lazy" />
                <div>
                  <h3>{member.name}</h3>
                  <p className="fv-muted">{member.role}</p>
                  <a href={`mailto:${member.email}`}><Mail size={14} /> {member.email}</a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
