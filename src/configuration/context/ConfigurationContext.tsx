import {
  GenerateWidgetIframeUrlParams,
  SwapWidgetAppTheme,
  SwapWidgetBorderRadiusSize
} from "@tinymanorg/tinyman-swap-widget-sdk";

import {USDC_ASSET_ID} from "../../core/util/constants";
import {createContext, useContext} from "react";
import {NetworkToggleValue} from "../../core/util/commonTypes";

type ConfigurationState = GenerateWidgetIframeUrlParams;

type ConfigurationStateReducerAction = {
  type: "SET_CONFIGURATION";
  payload: ConfigurationState;
};

export type ConfigurationDispatchContextValue =
  null | React.Dispatch<ConfigurationStateReducerAction>;

const initialConfigurationState: ConfigurationState = {
  platformName: "Platform name",
  useParentSigner: false,
  assetIds: [0, USDC_ASSET_ID[NetworkToggleValue.MainNet]],
  network: NetworkToggleValue.MainNet,
  themeVariables: {
    theme: SwapWidgetAppTheme.Light,
    containerButtonBg: "#2cbca2",
    widgetBg: "#a056ff",
    headerButtonBg: "#8346d1",
    headerButtonText: "#ffffff",
    headerTitle: "#ffffff",
    containerButtonText: "#ffffff",
    iframeBg: "#F8F8F8",
    borderRadiusSize: SwapWidgetBorderRadiusSize.Medium,
    title: "Swap",
    shouldDisplayTinymanLogo: false
  }
};

const ConfigurationStateContext = createContext<ConfigurationState>(
  initialConfigurationState
);
const ConfigurationDispatchContext =
  createContext<ConfigurationDispatchContextValue>(null);

function useConfigurationState() {
  const state = useContext(ConfigurationStateContext);

  if (!state) {
    throw new Error("Configuration state context is being used outside of its Provider");
  }

  return state;
}

function useConfigurationDispatch() {
  const dispatch = useContext(ConfigurationDispatchContext);

  if (!dispatch) {
    throw new Error("Configuration state context is being used outside of its Provider");
  }

  return dispatch;
}

function configurationStateReducer(
  state: ConfigurationState,
  action: ConfigurationStateReducerAction
) {
  let newState = state;

  switch (action.type) {
    case "SET_CONFIGURATION":
      newState = action.payload;
      break;

    default:
      break;
  }

  return newState;
}

export {
  ConfigurationDispatchContext,
  ConfigurationStateContext,
  useConfigurationDispatch,
  useConfigurationState,
  initialConfigurationState,
  configurationStateReducer
};
export type {ConfigurationState, ConfigurationStateReducerAction};
