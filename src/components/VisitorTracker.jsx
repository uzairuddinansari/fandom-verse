import { useEffect } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const VisitorTracker = () => {

   

  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;

    let visitorId = localStorage.getItem("visitorId");

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitorId", visitorId);
    }

    const trackVisitor = async () => {
      try {
        const response = await fetch("https://ipwho.is/");
        const data = await response.json();

        if (!data.success) throw new Error("IP location failed");

        await setDoc(doc(db, "visitors", visitorId), {visitorId, ip: data.ip || "", country: data.country || "", countryCode: data.country_code || "", city: data.city || "", region: data.region || "", latitude: data.latitude || null, longitude: data.longitude || null, lastSeen: serverTimestamp()}, {merge: true});
      } catch (error) {
        console.error("Visitor tracking error:", error);
      }
    };

    trackVisitor();

    const interval = setInterval(trackVisitor, 30000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default VisitorTracker;