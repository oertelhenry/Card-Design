import { useState } from "react";
import PersonalyzAdmin from "./personalyz-admin-ui";
import PersonalyzDesignSpec from "./personalyz-design-spec";
import TrendReport from "./personalyz-trend-report-2026";
import Card from "./personalyz-card-v2";
import FormalCard from "./personalyz-card-formal";
import VintageCard from "./personalyz-card-vintage";
import ModernCard from "./personalyz-card-modern";
import VintageCardV2 from "./personalyz-card-vintage-v2";
import GenericCardDark from "./generic-card-dark";
import GenericCardLight from "./generic-card-light";
import GenericCardClean from "./generic-card-clean";
import GenericCardEditor from "./generic-card-editor";
import GenericCardVintage from "./generic-card-vintage-v3";
import VehicleCardMobile from "./VehicleCardMobile";
import VehicleCardLight from "./VehicleCardLight";
import VehicleCardPreview from "./VehicleCardPreview";
import VehicleCardDesktop from "./VehicleCardDesktop";
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


const TABS = [
  { label: "AppLayout", component: <AppLayout /> },
  { label: "Admin UI", component: <PersonalyzAdmin /> },
  { label: "Design Spec", component: <PersonalyzDesignSpec /> },
  { label: "Trend Report", component: <TrendReport /> },
  { label: "Card v2", component: <Card /> },
  { label: "Card Formal", component: <FormalCard /> },
  { label: "Card Vintage", component: <VintageCard /> },
  { label: "Card Modern", component: <ModernCard /> },
  { label: "Vintage Card v2", component: <VintageCardV2 /> },
  { label: "Generic Card Editor", component: <GenericCardEditor /> },
  { label: "Generic Card Dark", component: <GenericCardDark /> },
  { label: "Generic Card Light", component: <GenericCardLight /> },
  { label: "Generic Card Clean", component: <GenericCardClean /> },
  { label: "Generic Card Vintage", component: <GenericCardVintage /> },
  { label: "Vehicle Card Mobile", component: <VehicleCardMobile /> },
  { label: "Vehicle Card Light", component: <VehicleCardLight /> },
  { label: "Vehicle Card Preview", component: <VehicleCardPreview /> },
  { label: "Vehicle Card Desktop", component: <VehicleCardDesktop /> },
  { label: "Build Quote Platform", component: <BuildQuotePlatform /> },
  { label: "Arco Landing Clean", component: <ArcoLanding /> },
  { label: "Qubrix Landing", component: <QubrixLanding /> },
  { label: "Bank Submit Wizard", component: <BankSubmitWizard /> },
  { label: "Banker Dashboard", component: <BankerDashboard /> },
  { label: "Test Drive Dark", component: <TestDriveForm /> },
  { label: "Test Drive Light", component: <TestDriveLight /> },
  { label: "Test Drive Blue", component: <TestDriveFormBlue /> },
  { label: "Activity Timeline", component: <ActivityTimeline /> },
  { label: "Project Messages", component: <ProjectMessages /> },
  { label: "Legal Screens", component: <LegalScreens /> },
  { label: "Qubrix Landing Gareth", component: <QubrixLandingRedesign /> },
  { label: "QubrixBuilderDirectory", component: <QubrixBuilderDirectory /> },
  { label: "QubrixDashboard", component: <QubrixDashboard /> },
  { label: "QubrixLogin", component: <QubrixLogin /> },
  { label: "QubrixQuoteBankApp", component: <QubrixQuoteBankApp /> },
  { label: "Qubrix App", component: <QubrixApp /> },
  { label: "Survey", component: <Survey /> },
  { label: "Survey Card Preview", component: <SurveyCardPreview /> },
  { label: "Qubrix Products Page", component: <QubrixProductsPage /> },
  { label: "Cardz App", component: <CardzApp /> },
];

function App() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", position: "fixed", inset: 0 }}>
      <div style={{
        padding: "8px 16px",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        flexShrink: 0,
        zIndex: 9999,
        position: "relative",
      }}>
        <select
          value={active}
          onChange={(e) => setActive(Number(e.target.value))}
          style={{
            padding: "6px 10px",
            fontSize: 13,
            fontWeight: 500,
            border: "1px solid #ccc",
            borderRadius: 6,
            cursor: "pointer",
            background: "#fff",
          }}
        >
          {TABS.map((tab, i) => (
            <option key={tab.label} value={i}>{tab.label}</option>
          ))}
        </select>
      </div>
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>{TABS[active].component}</div>
    </div>
  );
}

export default App;
