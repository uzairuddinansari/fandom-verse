import GuideHeader from "../components/Installation/GuideHeader";
import GuideHero from "../components/Installation/GuideHero";
import GuideNavigation from "../components/Installation/GuideNavigation";
import "../styles/InstallationGuide.css";

function InstallationGuide() {
  return (
    <div className="installation-page">
      <GuideHeader />

      <div className="installation-layout">
        <GuideNavigation />

        <main className="installation-content">
          <GuideHero />

          <section className="installation-placeholder">
            <span>01</span>
            <h2>Requirements</h2>
            <p>The installation steps will be added here.</p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default InstallationGuide;