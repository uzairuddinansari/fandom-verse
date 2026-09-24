import ImageShowcase from "../components/ImageShowcase";
import ReviewsPanel from "./ReviewsPanel";
import TradingActivity from "./TradingActivity";

function DashboardHome() {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-section dashboard-top-left">
        <ImageShowcase />
      </div>

      <div className="dashboard-section dashboard-top-right">
        <ReviewsPanel />
      </div>

      <div className="dashboard-section dashboard-bottom-left">
        <TradingActivity />
      </div>

      <div className="dashboard-section dashboard-bottom-right"></div>
    </div>
  );
}

export default DashboardHome;
