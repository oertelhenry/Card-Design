import { useState } from "react";
import PersonalyzAdmin from "./personalyz-admin-ui";
import PersonalyzDesignSpec from "./personalyz-design-spec";
import TrendReport from "./personalyz-trend-report-2026";
import Card from "./personalyz-card-v2";
import FormalCard from "./personalyz-card-formal";
import FormalCardDark from "./personalyz-card-formal-dark";
import VintageCard from "./personalyz-card-vintage";
import ModernCard from "./personalyz-card-modern";
import VintageCardV2 from "./personalyz-card-vintage-v2";
import GenericCardDark from "./generic-card-dark";
import GenericCardLight from "./generic-card-light";
import GenericCardClean from "./generic-card-clean";
import GenericCardEditor from "./generic-card-editor";
import GenericCardVintage from "./generic-card-vintage-v3";
import GenericMenuLight from "./GenericMenuLight";
import Majestic from "./Majestic";
import VehicleCardMobile from "./VehicleCardMobile";
import VehicleCardLight from "./VehicleCardLight";
import VehicleCardPreview from "./VehicleCardPreview";
import VehicleCardDesktop from "./VehicleCardDesktop";
import VehicleCard1 from "./VehicleCard1";
import VehicleCard2 from "./VehicleCard2";
import VehicleCard3 from "./VehicleCard3";
import BuildQuotePlatform from "./BuildQuotePlatform";
import ArcoLanding from "./ArcoLandingClean";
import QubrixLanding from "./QubrixLanding";
import BankSubmitWizard from "./BankSubmitWizard";
import BankerDashboard from "./BankerDashboard";
import TestDriveForm from "./TestDriveForm";
import TestDriveLight from "./TestDriveLight";
import TestDriveFormBlue from "./TestDriveFormBlue";
import ActivityTimeline from "./ActivityTimeline";
import ProjectMessages from "./ProjectMessages";
import LegalScreens from "./LegalScreens";
import QubrixLandingRedesign from "./QubrixLandingRedesign";
import QubrixBuilderDirectory from "./QubrixBuilderDirectory";
import QubrixDashboard from "./QubrixDashboard";
import QubrixLogin from "./QubrixLogin";
import QubrixQuoteBankApp from "./QubrixQuoteBankApp";
import QubrixApp from "./QubrixApp";
import QubrixProductsPage from "./QubrixProductsPage";
import AppLayout from "./AppLayout";
import Survey from "./survey-editor";
import SurveyCardPreview from "./SurveyCardPreview";
import CardzApp from "./cardz/layout";
import AllCards from "./cardz/AllCards";
import Surveys from "./cardz/Surveys";
import Microsites from "./cardz/Microsites";
import Notifications from "./cardz/Notifications";
import CardzMobi from "./readdy/CardzMobi";
import SeritiGreenCard from "./SeritiGreenCard";
import SeritiAwesomeCard from "./SeritiAwesomeCard";
import SeritiIceCard from "./SeritiIceCard";
import SeritiCoolCard from "./SeritiCoolCard";
import TechCard5 from "./TechCard5";
import NobleCard from "./NobleCard";
import AscendMicrosite from "./AscendMicrosite";
import ConstCard6 from "./ConstCard6";
import DeveloperPortal from "./DeveloperPortal";
import NewSurveys from "./newsurveys";
import SurveyCardNew from "./SurveyCardNew";

const TABS = [
  { label: "AppLayout", component: <AppLayout /> },
  { label: "Admin UI", component: <PersonalyzAdmin /> },
  { label: "Design Spec", component: <PersonalyzDesignSpec /> },
  { label: "Trend Report", component: <TrendReport /> },
  { label: "Card v2", component: <Card /> },
  { label: "Card Formal", component: <FormalCard /> },
  { label: "Card Formal Dark", component: <FormalCardDark /> },
  { label: "Card Vintage", component: <VintageCard /> },
  { label: "Card Modern", component: <ModernCard /> },
  { label: "Vintage Card v2", component: <VintageCardV2 /> },
  { label: "Generic Card Editor", component: <GenericCardEditor /> },
  { label: "Generic Card Dark", component: <GenericCardDark /> },
  { label: "Generic Card Light", component: <GenericCardLight /> },
  { label: "Generic Card Clean", component: <GenericCardClean /> },
  { label: "Generic Card Vintage", component: <GenericCardVintage /> },
  { label: "Generic Menu Light (Burger Bliss)", component: <GenericMenuLight /> },
  { label: "Majestic (Burger Bliss Dark)", component: <Majestic /> },
  { label: "Vehicle Card Mobile", component: <VehicleCardMobile /> },
  { label: "Vehicle Card Light", component: <VehicleCardLight /> },
  { label: "Vehicle Card Preview", component: <VehicleCardPreview /> },
  { label: "Vehicle Card Desktop", component: <VehicleCardDesktop /> },
  { label: "Test Drive Dark", component: <TestDriveForm /> },
  { label: "Test Drive Light", component: <TestDriveLight /> },
  { label: "Test Drive Blue", component: <TestDriveFormBlue /> },
  { label: "Survey", component: <Survey /> },
  { label: "Survey Card Preview", component: <SurveyCardPreview /> }
];

const QubrixTABS = [
  { label: "Qubrix Products Page", component: <QubrixProductsPage /> },  
  { label: "Build Quote Platform", component: <BuildQuotePlatform /> },
  { label: "Arco Landing Clean", component: <ArcoLanding /> },  
  { label: "Qubrix Landing", component: <QubrixLanding /> },  
  { label: "Activity Timeline", component: <ActivityTimeline /> },
  { label: "Project Messages", component: <ProjectMessages /> },
  { label: "Legal Screens", component: <LegalScreens /> },
  { label: "Qubrix Landing Gareth", component: <QubrixLandingRedesign /> },
  { label: "QubrixBuilderDirectory", component: <QubrixBuilderDirectory /> },
  { label: "QubrixDashboard", component: <QubrixDashboard /> },
  { label: "QubrixLogin", component: <QubrixLogin /> },
  { label: "QubrixQuoteBankApp", component: <QubrixQuoteBankApp /> },
  { label: "Qubrix App", component: <QubrixApp /> },
  { label: "Bank Submit Wizard", component: <BankSubmitWizard /> },
  { label: "Banker Dashboard", component: <BankerDashboard /> },
  { label: "Developer Portal", component: <DeveloperPortal /> }
];

const CardzTABS = [
  { label: "Cardz App", component: <CardzApp /> },
  { label: "Cardz All Cards", component: <AllCards /> },
  { label: "Cardz All Surveys", component: <Surveys /> },
  { label: "Cardz All Microsites", component: <Microsites /> },
  { label: "Cardz All Notifications", component: <Notifications /> },
  { label: "Cardz Mobi Web", component: <CardzMobi /> },
  { label: "Seriti Green Card", component: <SeritiGreenCard /> },
  { label: "Seriti Awesome Card", component: <SeritiAwesomeCard /> },
  { label: "Seriti Ice Card", component: <SeritiIceCard /> },
  { label: "Seriti Cool Card", component: <SeritiCoolCard /> },
  { label: "Tech Card 5 (Seriti Tech)", component: <TechCard5 /> },
  { label: "Const Card 6 (Seriti Construction)", component: <ConstCard6 /> },
  { label: "Noble Card (Seriti)", component: <NobleCard /> },
  { label: "Ascend Microsite (CFAO Toyota)", component: <AscendMicrosite /> },
  { label: "Vehicle Card 1 (Prestige Motors)", component: <VehicleCard1 /> },
  { label: "Vehicle Card 2 (Orbit / CardPwa)", component: <VehicleCard2 /> },
  { label: "Vehicle Card 3 (Horizon / CardPwa)", component: <VehicleCard3 /> },
  { label: "New Surveys", component: <NewSurveys /> },
  { label: "Survey Card New", component: <SurveyCardNew /> }
];

const GROUPS = [
  { key: "cards", label: "Cards", tabs: TABS },
  { key: "qubrix", label: "Qubrix", tabs: QubrixTABS },
  { key: "cardz", label: "Cardz", tabs: CardzTABS },
];

function App() {
  const [group, setGroup] = useState(GROUPS[0].key);
  const [indexByGroup, setIndexByGroup] = useState({ cards: 0, qubrix: 0, cardz: 0 });

  const activeGroup = GROUPS.find((g) => g.key === group);
  const activeTab = activeGroup.tabs[indexByGroup[group]];

  const dropdownStyle = (isActive) => ({
    padding: "6px 10px",
    fontSize: 13,
    fontWeight: 500,
    border: isActive ? "1px solid #2b6cb0" : "1px solid #ccc",
    borderRadius: 6,
    cursor: "pointer",
    background: isActive ? "#fff" : "#f0f0f0",
    color: isActive ? "#000" : "#666",
    outline: isActive ? "2px solid rgba(43,108,176,.2)" : "none",
  });

  return (
    <div style={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", position: "fixed", inset: 0 }}>
      <div style={{
        padding: "8px 16px",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        flexShrink: 0,
        zIndex: 9999,
        position: "relative",
        display: "flex",
        gap: 10,
        alignItems: "center",
        flexWrap: "wrap",
      }}>
        {GROUPS.map((g) => (
          <label key={g.key} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: ".05em" }}>{g.label}</span>
            <select
              value={group === g.key ? indexByGroup[g.key] : ""}
              onChange={(e) => {
                setIndexByGroup((prev) => ({ ...prev, [g.key]: Number(e.target.value) }));
                setGroup(g.key);
              }}
              style={dropdownStyle(group === g.key)}
            >
              {group !== g.key && <option value="" disabled hidden>Select {g.label}…</option>}
              {g.tabs.map((tab, i) => (
                <option key={tab.label} value={i}>{tab.label}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "auto" }}>{activeTab.component}</div>
    </div>
  );
}

export default App;
