import "./_app.scss";

import {Fragment, useState} from "react";

import AppAside from "./aside/AppAside";
import ConfigurationContextProvider from "./configuration/context/ConfigurationContext.provider";
import {ConfigurationView} from "./core/util/commonTypes";
import ConfigurationSwapView from "./configuration/view/swap/ConfigurationSwapView";
import ConfiguredWidget from "./widget/ConfiguredWidget";
import ConfigurationConnectionView from "./configuration/view/connection/ConfigurationConnectionView";
import ConfigurationStylingView from "./configuration/view/styling/ConfigurationStylingView";
import ConfigurationExportView from "./configuration/view/export/ConfigurationExportView";

function App() {
  const [view, setView] = useState<ConfigurationView>(ConfigurationView.Swap);

  return (
    <ConfigurationContextProvider>
      <main className={"app"}>
        <AppAside view={view} setView={setView} />

        <div className={"app__configuration"}>{renderConfigurationView()}</div>

        <div className="app__configured-widget is-centered">
          <ConfiguredWidget />
        </div>
      </main>
    </ConfigurationContextProvider>
  );

  function renderConfigurationView() {
    let configurationView = <Fragment />;

    switch (view) {
      case ConfigurationView.Swap:
        configurationView = <ConfigurationSwapView />;
        break;

      case ConfigurationView.Connection:
        configurationView = <ConfigurationConnectionView />;
        break;

      case ConfigurationView.Styling:
        configurationView = <ConfigurationStylingView />;
        break;

      case ConfigurationView.Export:
        configurationView = <ConfigurationExportView />;
        break;

      default:
        break;
    }

    return configurationView;
  }
}

export default App;
