import { ArrowLeft, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GuideHeader() {
  const navigate = useNavigate();

  return (
    <header className="guide-header">
      <button className="guide-back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={17} />
        <span>Back</span>
      </button>

      <div className="guide-header-title">
        <span>DOCUMENTATION</span>
        <h1>Installation Guide</h1>
      </div>

      <button className="guide-menu-button">
        <Menu size={19} />
      </button>
    </header>
  );
}

export default GuideHeader;