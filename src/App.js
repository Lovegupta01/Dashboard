import AppHeader from "./Components/AppHeader.js";
// import { Space } from "antd";
import SideMenu from "./Components/SideMenu.js/index.js";
import PageContent from "./Components/PageContent.js/index.js";
import AppFooter from "./Components/AppFooter.js/index.js";
import "./App.css"

function App() {
  return (
    <>
      <div className="App">
        <AppHeader />
        <div className="sideMenuandPageContent">
          <SideMenu />
          <PageContent />
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default App;
