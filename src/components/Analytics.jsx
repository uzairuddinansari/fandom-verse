import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import "../styles/Analytics.css";

const Analytics = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "visitors"), (snapshot) => {
      setVisitors(snapshot.docs.map((item) => ({id: item.id, ...item.data()})));
    });

    return () => unsubscribe();
  }, []);

  const now = Date.now();

  const liveVisitors = visitors.filter((visitor) => visitor.lastSeen?.toMillis && now - visitor.lastSeen.toMillis() < 70000);

  const countries = [...new Set(visitors.map((visitor) => visitor.country).filter(Boolean))];

  const todayVisitors = visitors.filter((visitor) => {
    if (!visitor.lastSeen?.toDate) return false;
    const date = visitor.lastSeen.toDate();
    const today = new Date();
    return date.toDateString() === today.toDateString();
  });

  const countryCount = visitors.reduce((acc, visitor) => {
    if (visitor.country) acc[visitor.country] = (acc[visitor.country] || 0) + 1;
    return acc;
  }, {});

  const topCountries = Object.entries(countryCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const getFlag = (countryCode) => {
    if (!countryCode) return "🌍";
    return countryCode.toUpperCase().split("").map((char) => String.fromCodePoint(127397 + char.charCodeAt(0))).join("");
  };

  const getCountryCode = (country) => {
    const visitor = visitors.find((item) => item.country === country);
    return visitor?.countryCode || "";
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Website Analytics</h1>
        <p>Overview of your website visitors and traffic</p>
      </div>

      <div className="analytics-cards">
        <div className="analytics-card">
          <div className="analytics-icon">👥</div>
          <div>
            <h2>{visitors.length}</h2>
            <p>Total Visitors</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon">🟢</div>
          <div>
            <h2>{liveVisitors.length}</h2>
            <p>Live Visitors</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon">📅</div>
          <div>
            <h2>{todayVisitors.length}</h2>
            <p>Today's Visitors</p>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-icon">🌍</div>
          <div>
            <h2>{countries.length}</h2>
            <p>Countries</p>
          </div>
        </div>
      </div>

      <div className="analytics-section">
        <div className="section-header">
          <h2>Top Countries</h2>
          <span>{countries.length} Countries</span>
        </div>

        {topCountries.length === 0 ? (
          <p className="analytics-empty">No visitor data yet.</p>
        ) : (
          <div className="country-list">
            {topCountries.map(([country, count]) => (
              <div className="country-item" key={country}>
                <div className="country-info">
                  <span className="country-flag">{getFlag(getCountryCode(country))}</span>
                  <strong>{country}</strong>
                </div>
                <div className="country-count">{count} visitors</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;