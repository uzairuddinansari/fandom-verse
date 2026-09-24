const guideSections = [
  { id: "introduction", number: "00", title: "Introduction" },
  { id: "requirements", number: "01", title: "Requirements" },
  { id: "installation", number: "02", title: "Installation" },
  { id: "environment", number: "03", title: "Environment" },
  { id: "firebase", number: "04", title: "Firebase Setup" },
  { id: "structure", number: "05", title: "Project Structure" },
  { id: "run", number: "06", title: "Run Project" },
  { id: "production", number: "07", title: "Production" },
  { id: "troubleshooting", number: "08", title: "Troubleshooting" }
];

function GuideNavigation() {
  const scrollToSection = id => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <aside className="guide-navigation">
      <div className="guide-navigation-heading">
        <span>ON THIS PAGE</span>
        <strong>Guide</strong>
      </div>

      <nav>
        {guideSections.map(section => (
          <button
            key={section.id}
            className={`guide-nav-item ${section.id === "introduction" ? "active" : ""}`}
            onClick={() => scrollToSection(section.id)}
          >
            <span>{section.number}</span>
            <strong>{section.title}</strong>
          </button>
        ))}
      </nav>

      <div className="guide-progress">
        <div className="guide-progress-heading">
          <span>SETUP PROGRESS</span>
          <strong>0%</strong>
        </div>

        <div className="guide-progress-track">
          <span />
        </div>

        <p>Follow the guide to complete your setup.</p>
      </div>
    </aside>
  );
}

export default GuideNavigation;