import "./_configured-widget.scss";

import {
  GenerateWidgetIframeUrlParams,
  WidgetController
} from "@tinymanorg/tinyman-swap-widget-sdk";
import {useMemo} from "react";

import {useConfigurationState} from "../configuration/context/ConfigurationContext";

function ConfiguredWidget() {
  window.Buffer = window.Buffer || require("buffer").Buffer;

  const {
    platformName,
    useParentSigner,
    assetIds,
    network,
    parentUrlOrigin,
    platformFeeAccount,
    platformFeePercentage,
    themeVariables
  } = useConfigurationState();
  const widgetIframeUrlParams = useMemo<GenerateWidgetIframeUrlParams>(() => {
    let params: Partial<GenerateWidgetIframeUrlParams> = {
      network,
      themeVariables,
      parentUrlOrigin,
      assetIds,
      platformName,
      platformFeePercentage,
      platformFeeAccount
    };

    if (useParentSigner) {
      params = {
        ...params,
        useParentSigner: true,
        accountAddress: "YOUR_ACCOUNT_ADDRESS_VARIABLE_NAME"
      };
    } else {
      params = {
        ...params,
        useParentSigner: false
      };
    }

    return params as GenerateWidgetIframeUrlParams;
  }, [
    assetIds,
    network,
    parentUrlOrigin,
    platformFeeAccount,
    platformFeePercentage,
    platformName,
    themeVariables,
    useParentSigner
  ]);

  return (
    <iframe
      title={"tinyman swap widget"}
      className={"configured-widget"}
      src={WidgetController.generateWidgetIframeUrl(widgetIframeUrlParams)}
      sandbox={"allow-same-origin allow-scripts allow-popups allow-forms"}
    />
  );
}

export default ConfiguredWidget;
