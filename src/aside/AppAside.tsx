import {ReactComponent as Logo} from "../core/ui/assets/Logo.svg";
import {ReactComponent as TransactionIcon} from "../core/ui/icon/Transaction.svg";
import {ReactComponent as WalletIcon} from "../core/ui/icon/Wallet.svg";
import {ReactComponent as BoxIcon} from "../core/ui/icon/Box.svg";
import {ReactComponent as InfoIcon} from "../core/ui/icon/Info.svg";
import {ReactComponent as BookIcon} from "../core/ui/icon/Book.svg";

import {ToggleButton, ToggleButtonGroup} from "@mui/material";

import "./_app-aside.scss";

import {ConfigurationView} from "../core/util/commonTypes";

interface AppAsideProps {
  view: ConfigurationView;
  setView: React.Dispatch<React.SetStateAction<ConfigurationView>>;
}

function AppAside({view, setView}: AppAsideProps) {
  return (
    <aside className={"app-aside"}>
      <Logo />

      <h1 className={"app-aside__title typography--caption"}>
        {"Minutes to integrate, instant best rates. Only with Tinyman Swap Widget."}
      </h1>

      <h4 className={"typography--caption color--text-gray-lighter"}>
        {"Configuration"}
      </h4>

      <ToggleButtonGroup
        className={"app-aside__configuration-toggle-buttons"}
        color={"primary"}
        orientation={"vertical"}
        value={view}
        exclusive
        onChange={handleChangeConfigurationView}
        aria-label="Settings">
        <ToggleButton value={ConfigurationView.Swap}>
          <TransactionIcon />
          {"Swap settings"}
        </ToggleButton>
        <ToggleButton value={ConfigurationView.Styling}>
          <BoxIcon />
          {"Styling"}
        </ToggleButton>
      </ToggleButtonGroup>

      <div className={"app-aside__export-button-wrapper"}>
        <button
          onClick={() => setView(ConfigurationView.Export)}
          className={"app-aside__export-button typography--button"}>
          {"EXPORT"}
        </button>
      </div>

      <div className={"app-aside__useful-links"}>
        <h4 className={"typography--caption color--text-gray-lighter"}>
          {"Useful links"}
        </h4>

        <a href={"https://www.google.com/"} target={"_blank"} rel={"noreferrer noopener"}>
          <BookIcon />

          {"Documentation"}
        </a>

        <a href={"https://www.google.com/"} target={"_blank"} rel={"noreferrer noopener"}>
          <InfoIcon />

          {"Join the community"}
        </a>
      </div>

      <div
        className={"app-aside__copyright typography--caption color--text-gray-lighter"}>
        <span>{"Terms of Services"}</span>
        <span>{`© ${new Date().getFullYear()} Tinyman`}</span>
      </div>
    </aside>
  );

  function handleChangeConfigurationView(
    _event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) {
    if (newView) {
      setView(newView as ConfigurationView);
    }
  }
}

export default AppAside;
