import GuideHeader from "../components/Installation/GuideHeader";
import GuideHero from "../components/Installation/GuideHero";
import GuideNavigation from "../components/Installation/GuideNavigation";
import GuideSections from "../components/Installation/GuideSections";
import "../styles/InstallationGuide.css";

function InstallationGuide() {
  return (
    <div className="installation-page">
      <GuideHeader />

      <div className="installation-layout">
        <GuideNavigation />

        <main className="installation-content">
          <GuideHero />

          <GuideSections />
        </main>
      </div>
    </div>
  );
}

export default InstallationGuide;