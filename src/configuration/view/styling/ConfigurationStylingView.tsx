import "./_configuration-styling-view.scss";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import {
  SWAP_WIDGET_COLOR_KEY_LABEL_MAP,
  SWAP_WIDGET_CONTAINER_COLORS,
  SWAP_WIDGET_SWAP_CONTAINER_COLORS
} from "../../../core/util/constants";
import ConfigurationViewTitle from "../title/ConfigurationViewTitle";
import {
  initialConfigurationState,
  useConfigurationDispatch,
  useConfigurationState
} from "../../context/ConfigurationContext";
import React, {useState} from "react";
import Line from "../../../component/line/Line";
import {
  SwapWidgetAppTheme,
  SwapWidgetBorderRadiusSize
} from "@tinymanorg/tinyman-swap-widget-sdk";
import OnOffToggleContainer from "../../../component/on-off-toggle/container/OnOffToggleContainer";
import {OnOffToggleValue} from "../../../component/on-off-toggle/OnOffToggle";

function ConfigurationStylingView() {
  const configuration = useConfigurationState();
  const dispatch = useConfigurationDispatch();

  const [isCustomTitleEnabled, setIsCustomTitleEnabled] = useState(true);

  return (
    <div className={"configuration-styling-view"}>
      <ConfigurationViewTitle>{"Styling"}</ConfigurationViewTitle>

      <h3 className={"configuration-styling-view__subtitle typography--body"}>
        {"Widget container"}
      </h3>

      <div className={"configuration-styling-view__color-container"}>
        {SWAP_WIDGET_CONTAINER_COLORS.map((key) => (
          <TextField
            key={key}
            size={"small"}
            name={key}
            id={`color-${key}`}
            label={SWAP_WIDGET_COLOR_KEY_LABEL_MAP[key]}
            value={configuration.themeVariables![key]}
            InputProps={{
              startAdornment: (
                <input
                  type="color"
                  name={key}
                  value={configuration.themeVariables![key]}
                  onChange={handleChangeThemeVariable}
                  style={{
                    marginRight: 10,
                    borderRadius: "4px",
                    border: "none",
                    overflow: "hidden",
                    background: "transparent",
                    width: 20,
                    height: 20
                  }}
                />
              )
            }}
            onChange={handleChangeThemeVariable}
          />
        ))}
      </div>

      <Line margin="32px 0" />

      <h3 className={"configuration-styling-view__subtitle typography--body"}>
        {"Swap container"}
      </h3>

      <Box display={"grid"} gap={"16px"} marginBottom={"48px"}>
        <FormControl className={"configuration-styling-view__theme"}>
          <InputLabel>Select theme</InputLabel>
          <Select
            size="small"
            value={configuration.themeVariables?.theme}
            label="Select theme"
            onChange={handleChangeTheme}>
            <MenuItem value={SwapWidgetAppTheme.Dark}>Dark</MenuItem>
            <MenuItem value={SwapWidgetAppTheme.Light}>Light</MenuItem>
          </Select>
        </FormControl>

        <p className={"typography--caption color--text-gray"}>
          {
            "Tinyman widget provides you light and dark options for the swap container. Choose whichever fits your branding better."
          }
        </p>
      </Box>

      <div className={"configuration-styling-view__color-container"}>
        {SWAP_WIDGET_SWAP_CONTAINER_COLORS.map((key) => (
          <TextField
            key={key}
            size={"small"}
            name={key}
            id={`color-${key}`}
            label={SWAP_WIDGET_COLOR_KEY_LABEL_MAP[key]}
            value={configuration.themeVariables![key]}
            InputProps={{
              startAdornment: (
                <input
                  type="color"
                  name={key}
                  value={configuration.themeVariables![key]}
                  onChange={handleChangeThemeVariable}
                  style={{
                    marginRight: 10,
                    borderRadius: "4px",
                    border: "none",
                    overflow: "hidden",
                    background: "transparent",
                    width: 20,
                    height: 20
                  }}
                />
              )
            }}
            onChange={handleChangeThemeVariable}
          />
        ))}
      </div>

      <Line margin="32px 0" />

      <Box display={"grid"} gap={"30px"}>
        <OnOffToggleContainer
          value={isCustomTitleEnabled ? OnOffToggleValue.On : OnOffToggleValue.Off}
          title={"Use custom title"}
          onToggle={handleToggleIsCustomTitleEnabled}
          description={
            "You can either select Tinyman logo or custom title for your swap widget"
          }
        />

        {isCustomTitleEnabled && (
          <TextField
            label="Title"
            size={"small"}
            value={configuration.themeVariables?.title}
            onChange={handleChangeCustomTitle}
          />
        )}
      </Box>

      <Line margin="32px 0" />

      <h3 className={"configuration-styling-view__subtitle typography--body"}>
        {"Border radius"}
      </h3>

      <ToggleButtonGroup
        exclusive
        className={"configuration-styling-view__border-radius-size-toggle-button-group"}
        onChange={handleSetBorderRadiusSize}
        value={configuration.themeVariables?.borderRadiusSize}
        aria-label="border radius">
        <ToggleButton value={SwapWidgetBorderRadiusSize.Large} aria-label="0.5%">
          {"Large"}
        </ToggleButton>
        <ToggleButton value={SwapWidgetBorderRadiusSize.Medium} aria-label="1%">
          {"Medium"}
        </ToggleButton>
        <ToggleButton value={SwapWidgetBorderRadiusSize.Small} aria-label="2.5%">
          {"Small"}
        </ToggleButton>
        <ToggleButton value={SwapWidgetBorderRadiusSize.None} aria-label="2.5%">
          {"None"}
        </ToggleButton>
      </ToggleButtonGroup>

      <p className={"typography--caption color--text-gray"}>
        {
          "Tinyman widget provides you different levels of border radius. Choose whichever fits your branding better."
        }
      </p>
    </div>
  );

  function handleToggleIsCustomTitleEnabled() {
    dispatch({
      type: "SET_CONFIGURATION",
      payload: {
        ...configuration,
        themeVariables: {
          ...configuration.themeVariables,
          shouldDisplayTinymanLogo: isCustomTitleEnabled
        }
      }
    });

    setIsCustomTitleEnabled(!isCustomTitleEnabled);
  }

  function handleSetBorderRadiusSize(
    _event: React.MouseEvent<HTMLElement>,
    newSize: string | null
  ) {
    dispatch({
      type: "SET_CONFIGURATION",
      payload: {
        ...configuration,
        themeVariables: {
          ...configuration.themeVariables,
          borderRadiusSize: newSize as SwapWidgetBorderRadiusSize
        }
      }
    });
  }

  function handleChangeCustomTitle(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "SET_CONFIGURATION",
      payload: {
        ...configuration,
        themeVariables: {
          ...configuration.themeVariables,
          title: event.target.value,
          shouldDisplayTinymanLogo: !event.target.value
        }
      }
    });
  }

  function handleChangeTheme(event: SelectChangeEvent) {
    dispatch({
      type: "SET_CONFIGURATION",
      payload: {
        ...configuration,
        themeVariables: {
          ...configuration.themeVariables,
          theme: event.target.value as SwapWidgetAppTheme
        }
      }
    });
  }

  function handleChangeThemeVariable(event: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.currentTarget;

    dispatch({
      type: "SET_CONFIGURATION",
      payload: {
        ...configuration,
        themeVariables: {...configuration.themeVariables, [name]: value}
      }
    });
  }
}

export default ConfigurationStylingView;
