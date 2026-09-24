import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import "../styles/LiveVisitor.css";

const LiveVisitors = () => {
  const [visitors, setVisitors] = useState([]);
   const removeVisitor = async (id) => {
  try {
    await deleteDoc(doc(db, "visitors", id));
  } catch (error) {
    console.error("Delete visitor error:", error);
  }
}; 

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "visitors"), (snapshot) => {
      const data = snapshot.docs.map((item) => ({id: item.id, ...item.data()}));
      setVisitors(data);
    }, (error) => {
      console.error("Visitors error:", error);
    });

    return () => unsubscribe();
  }, []);

  const now = Date.now();

  const liveVisitors = visitors.filter((visitor) => {
    if (!visitor.lastSeen?.toMillis) return false;
    return now - visitor.lastSeen.toMillis() < 70000;
  });

  const getFlag = (countryCode) => {
    if (!countryCode) return "🌍";
    return countryCode.toUpperCase().split("").map((char) => String.fromCodePoint(127397 + char.charCodeAt(0))).join("");
  };

  return (
    <div className="live-page">
      <div className="live-header">
        <div>
          <h1>Live Visitors</h1>
          <p>Monitor your website visitors</p>
        </div>
      </div>

      <div className="visitor-stats">
        <div className="visitor-stat">
          <span className="stat-icon">🟢</span>
          <div>
            <h2>{liveVisitors.length}</h2>
            <p>Live Visitors</p>
          </div>
        </div>

        <div className="visitor-stat">
          <span className="stat-icon">👥</span>
          <div>
            <h2>{visitors.length}</h2>
            <p>Total Visitors</p>
          </div>
        </div>
      </div>

      <div className="visitor-table-box">
        <div className="table-title">
          <h2>Visitors</h2>
          <span>{liveVisitors.length} Online</span>
        </div>

        {visitors.length === 0 ? (
          <p className="no-visitors">No visitors yet.</p>
        ) : (
          <div className="visitor-list">
            {visitors.map((visitor) => {
              const isLive = visitor.lastSeen?.toMillis && now - visitor.lastSeen.toMillis() < 70000;

              return (
                <div className="visitor-row" key={visitor.id}>
                  <div className="visitor-country">
                    <span className="flag">{getFlag(visitor.countryCode)}</span>
                    <div>
                      <strong>{visitor.country || "Unknown"}</strong>
                      <small>{visitor.city || "Unknown city"}</small>
                    </div>
                  </div>

                  <div className="visitor-ip">
                    <span>IP Address</span>
                    <strong>{visitor.ip || "Unknown"}</strong>
                  </div>

                  <div className="visitor-region">
                    <span>Region</span>
                    <strong>{visitor.region || "Unknown"}</strong>
                  </div>

                  <div className={isLive ? "visitor-status online" : "visitor-status offline"}>
                    <span></span>
                    {isLive ? "Online" : "Offline"}
                  </div>
                  <div className={isLive ? "visitor-status online" : "visitor-status offline"}>
                     <span></span>
                     {isLive ? "Online" : "Offline"}
                  </div>
                   {!isLive && <button className="delete-visitor" onClick={() => removeVisitor(visitor.id)}>✕</button>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveVisitors;