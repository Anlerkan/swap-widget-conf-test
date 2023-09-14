import {SwapWidgetThemeColorVariables} from "@tinymanorg/tinyman-swap-widget-sdk";
import {NetworkToggleValue} from "./commonTypes";

export const USDC_ASSET_ID = {
  [NetworkToggleValue.MainNet]: 31566704,
  [NetworkToggleValue.TestNet]: 10458941
};

export const SWAP_WIDGET_COLOR_KEY_LABEL_MAP: Record<
  keyof SwapWidgetThemeColorVariables,
  string
> = {
  widgetBg: "Widget Background",
  headerButtonBg: "Header button background",
  headerButtonText: "Header button text",
  headerTitle: "Header title",
  iframeBg: "Iframe background",
  containerButtonBg: "Button background",
  containerButtonText: "Button text"
};

export const SWAP_WIDGET_CONTAINER_COLORS: Array<keyof SwapWidgetThemeColorVariables> = [
  "widgetBg",
  "headerTitle",
  "headerButtonBg",
  "headerButtonText",
  "iframeBg"
];

export const SWAP_WIDGET_SWAP_CONTAINER_COLORS: Array<
  keyof SwapWidgetThemeColorVariables
> = ["containerButtonBg", "containerButtonText"];
