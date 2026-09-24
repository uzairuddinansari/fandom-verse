import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/Performance.css";

const WEBSITE_URL = "http://localhost:5173";
const CHECK_INTERVAL = 5 * 60 * 1000;

function Performance() {
  const sectionRef = useRef(null);
  const gaugeRef = useRef(null);
  const scoreRef = useRef(null);
  const barsRef = useRef([]);

  const [health, setHealth] = useState({
    status: "Checking",
    responseTime: null,
    httpStatus: null,
    lastChecked: null,
  });

  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);

    const start = performance.now();

    try {
      const response = await fetch(WEBSITE_URL, { method: "GET", cache: "no-store" });
      const responseTime = Math.round(performance.now() - start);

      setHealth({
        status: response.ok ? "Online" : "Issue",
        responseTime,
        httpStatus: response.status,
        lastChecked: new Date(),
      });
    } catch {
      setHealth({
        status: "Offline",
        responseTime: null,
        httpStatus: null,
        lastChecked: new Date(),
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    checkHealth();

    const interval = setInterval(checkHealth, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const score = health.status === "Offline" ? 0 : health.responseTime === null ? 0 : Math.max(45, Math.min(100, Math.round(100 - health.responseTime / 20)));

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(sectionRef.current.querySelectorAll(".wh-animate"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: "power3.out" });
  }, []);

  useEffect(() => {
    if (!gaugeRef.current || !scoreRef.current || health.status === "Checking") return;

    const circumference = 2 * Math.PI * 76;
    const progress = (score / 100) * circumference;

    gsap.fromTo(gaugeRef.current, { strokeDashoffset: circumference }, { strokeDashoffset: circumference - progress, duration: 1.5, ease: "power3.out" });

    const counter = { value: 0 };

    gsap.to(counter, {
      value: score,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        scoreRef.current.textContent = Math.round(counter.value);
      },
    });
  }, [score, health.status]);

  useEffect(() => {
    barsRef.current.forEach((bar, index) => {
      if (!bar) return;

      gsap.fromTo(bar, { height: 0 }, { height: `${[78, 65, 88, 58, 73, 92, 69, 84, 76, 94, 82, 89][index]}%`, duration: 1, delay: index * 0.05, ease: "power3.out" });
    });
  }, []);

  const statusText = health.status === "Online" ? "Your website is responding normally." : health.status === "Offline" ? "Unable to reach your website." : health.status === "Issue" ? "The website returned an unexpected response." : "Checking website status...";

  const scoreText = score >= 90 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Needs Attention" : "Unavailable";

  return (
    <section className="website-health" ref={sectionRef}>

      <div className="wh-header wh-animate">
        <div>
          <span className="wh-label">WEBSITE MONITORING</span>
          <h2>Website Health</h2>
          <p>Performance and availability overview.</p>
        </div>

        <div className="wh-header-right">
          <div className="wh-last-check">
            <span>Last checked</span>
            <strong>{health.lastChecked ? health.lastChecked.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--"}</strong>
          </div>

          <button className="wh-check-btn" onClick={checkHealth} disabled={loading}>
            <span className={loading ? "wh-loading-dot" : "wh-btn-dot"}></span>
            {loading ? "Checking" : "Check Now"}
          </button>
        </div>
      </div>

      <div className="wh-top-cards">

        <div className="wh-stat-card wh-animate">
          <span>Website Status</span>
          <div className="wh-stat-main">
            <i className={`wh-status-dot ${health.status.toLowerCase()}`}></i>
            <strong>{health.status}</strong>
          </div>
          <small>Current availability</small>
        </div>

        <div className="wh-stat-card wh-animate">
          <span>Response Time</span>
          <div className="wh-stat-main">
            <strong>{health.responseTime ?? "--"}</strong>
            <em>{health.responseTime !== null ? "ms" : ""}</em>
          </div>
          <small>Server response speed</small>
        </div>

        <div className="wh-stat-card wh-animate">
          <span>HTTP Status</span>
          <div className="wh-stat-main">
            <strong>{health.httpStatus ?? "--"}</strong>
          </div>
          <small>Latest response code</small>
        </div>

        <div className="wh-stat-card wh-animate">
          <span>Check Interval</span>
          <div className="wh-stat-main">
            <strong>5</strong>
            <em>min</em>
          </div>
          <small>Automatic monitoring</small>
        </div>

        <div className="wh-stat-card wh-animate">
          <span>Monitoring</span>
          <div className="wh-stat-main">
            <i className="wh-status-dot online"></i>
            <strong>Active</strong>
          </div>
          <small>System is watching</small>
        </div>

      </div>

      <div className="wh-main-grid">

        <div className="wh-panel wh-performance wh-animate">

          <div className="wh-panel-head">
            <div>
              <span>Performance</span>
              <h3>Overall Score</h3>
            </div>

            <div className="wh-score-badge">{scoreText}</div>
          </div>

          <div className="wh-gauge-area">

            <svg className="wh-gauge" viewBox="0 0 180 180">
              <circle className="wh-gauge-bg" cx="90" cy="90" r="76" />
              <circle ref={gaugeRef} className="wh-gauge-progress" cx="90" cy="90" r="76" />
            </svg>

            <div className="wh-gauge-center">
              <strong ref={scoreRef}>0</strong>
              <span>/ 100</span>
              <small>Performance</small>
            </div>

          </div>

          <div className="wh-performance-footer">
            <div>
              <span className="wh-mini-dot"></span>
              Current performance
            </div>
            <span>Updated automatically</span>
          </div>

        </div>

        <div className="wh-panel wh-status-panel wh-animate">

          <div className="wh-panel-head">
            <div>
              <span>Availability</span>
              <h3>Website Status</h3>
            </div>

            <span className="wh-live">LIVE</span>
          </div>

          <div className={`wh-big-status ${health.status.toLowerCase()}`}>
            <div className="wh-status-circle">
              <span></span>
            </div>

            <div>
              <strong>{health.status}</strong>
              <p>{statusText}</p>
            </div>
          </div>

          <div className="wh-info-row">
            <span>Website</span>
            <strong>{WEBSITE_URL.replace("http://", "").replace("https://", "").replace("/", "")}</strong>
          </div>

          <div className="wh-info-row">
            <span>HTTP Response</span>
            <strong>{health.httpStatus ?? "--"}</strong>
          </div>

          <div className="wh-info-row">
            <span>Last Check</span>
            <strong>{health.lastChecked ? health.lastChecked.toLocaleTimeString() : "--"}</strong>
          </div>

        </div>

      </div>

      <div className="wh-bottom-grid">

        <div className="wh-panel wh-chart-panel wh-animate">

          <div className="wh-panel-head">
            <div>
              <span>Response Performance</span>
              <h3>Recent Checks</h3>
            </div>

            <span className="wh-chart-value">{health.responseTime ?? "--"} <small>ms</small></span>
          </div>

          <div className="wh-chart">
            <div className="wh-chart-grid">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="wh-bars">
              {Array.from({ length: 12 }).map((_, index) => (
                <div className="wh-bar-wrap" key={index}>
                  <div ref={(el) => (barsRef.current[index] = el)} className="wh-bar"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="wh-chart-days">
            <span>Earlier</span>
            <span>Recent</span>
            <span>Now</span>
          </div>

        </div>

        <div className="wh-panel wh-monitor-panel wh-animate">

          <div className="wh-panel-head">
            <div>
              <span>Monitoring</span>
              <h3>System Activity</h3>
            </div>
          </div>

          <div className="wh-activity">

            <div className="wh-activity-item">
              <div className="wh-activity-icon">✓</div>
              <div>
                <strong>Health check completed</strong>
                <span>{health.lastChecked ? health.lastChecked.toLocaleTimeString() : "--"}</span>
              </div>
            </div>

            <div className="wh-activity-item">
              <div className="wh-activity-icon">↻</div>
              <div>
                <strong>Automatic monitoring active</strong>
                <span>Next check in 5 minutes</span>
              </div>
            </div>

            <div className="wh-activity-item">
              <div className="wh-activity-icon">●</div>
              <div>
                <strong>Website monitoring enabled</strong>
                <span>System is running normally</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Performance;