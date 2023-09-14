import {GenerateWidgetIframeUrlParams} from "@tinymanorg/tinyman-swap-widget-sdk";
import {OnOffToggleValue} from "../../../component/on-off-toggle/OnOffToggle";
import OnOffToggleContainer from "../../../component/on-off-toggle/container/OnOffToggleContainer";
import {
  useConfigurationDispatch,
  useConfigurationState
} from "../../context/ConfigurationContext";
import ConfigurationViewTitle from "../title/ConfigurationViewTitle";

function ConfigurationConnectionView() {
  const configuration = useConfigurationState();
  const dispatch = useConfigurationDispatch();

  return (
    <div>
      <ConfigurationViewTitle>{"Connection settings"}</ConfigurationViewTitle>

      <OnOffToggleContainer
        value={configuration.useParentSigner ? OnOffToggleValue.Off : OnOffToggleValue.On}
        onToggle={handleToggleUseParentSigner}
        title={"Local signer"}
        description={
          "The widget will use wallet connection inside widget ('local signer')"
        }
      />
    </div>
  );

  function handleToggleUseParentSigner() {
    let payload: GenerateWidgetIframeUrlParams = configuration;

    if (configuration.useParentSigner) {
      payload = {...payload, useParentSigner: false};
    } else {
      payload = {
        ...payload,
        useParentSigner: true,
        accountAddress: "YOUR_ACCOUNT_ADDRESS_VARIABLE_NAME"
      };
    }

    dispatch({
      type: "SET_CONFIGURATION",
      payload
    });
  }
}

export default ConfigurationConnectionView;
