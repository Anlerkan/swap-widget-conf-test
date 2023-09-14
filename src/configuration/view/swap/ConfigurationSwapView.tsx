import {Box, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import "./_configuration-swap-view.scss";
import {
  useConfigurationDispatch,
  useConfigurationState
} from "../../context/ConfigurationContext";
import {NetworkToggleValue} from "../../../core/util/commonTypes";
import {replaceInArray} from "../../../core/util/arrayUtils";
import OnOffToggleContainer from "../../../component/on-off-toggle/container/OnOffToggleContainer";
import {useState} from "react";
import Line from "../../../component/line/Line";
import {OnOffToggleValue} from "../../../component/on-off-toggle/OnOffToggle";
import ConfigurationViewTitle from "../title/ConfigurationViewTitle";

function ConfigurationSwapView() {
  const configuration = useConfigurationState();
  const dispatch = useConfigurationDispatch();

  const {assetIds, platformName, platformFeeAccount, platformFeePercentage} =
    configuration;

  const [isServiceFeeEnabled, setIsServiceFeeEnabled] = useState(false);

  return (
    <div className={"configuration-swap-view"}>
      <ConfigurationViewTitle>{"Swap settings"}</ConfigurationViewTitle>

      <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
        <h3 className={"typography--body"}>{"Swap assets"}</h3>

        <p className={"color--text-gray typography--caption"}>
          {"Enter the asset IDs of assets for the input and output areas."}
        </p>
      </Box>

      <Box
        marginTop={"40px"}
        display={"grid"}
        gap={"16px"}
        gridTemplateColumns={"1fr 1fr"}>
        <TextField
          id="outlined-required"
          label="Input"
          value={assetIds![0]}
          onChange={handleSetAssetIn}
        />

        <TextField
          id="outlined-required"
          label="Output"
          value={assetIds![1]}
          onChange={handleSetAssetOut}
        />
      </Box>

      <Line margin="32px 0" />

      <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
        <h3 className={"typography--body"}>{"Platform name"}</h3>

        <p className={"color--text-gray typography--caption"}>
          {
            "Enter the name of the application where the widget will be used. This name will be displayed as 'Platform Fee' on the Swap Form."
          }
        </p>
      </Box>

      <Box marginTop={"40px"}>
        <TextField
          size={"small"}
          placeholder="Your Project Name"
          label="Platform name"
          value={platformName}
          onChange={handleChangePlatformName}
        />
      </Box>

      <Line margin="32px 0" />

      <Box display={"flex"} flexDirection={"column"} gap={"32px"}>
        <OnOffToggleContainer
          value={isServiceFeeEnabled ? OnOffToggleValue.On : OnOffToggleValue.Off}
          onToggle={handleToggleEnableServiceFee}
          title={"Enable service fee"}
          description={
            "You can get a service fee (with a maximum of 5% of the swap amount) from every swap."
          }
        />

        {isServiceFeeEnabled && (
          <Box display={"flex"} flexDirection={"column"} gap={"39px"}>
            <Box display={"flex"} gap={"12px"}>
              <ToggleButtonGroup
                exclusive
                className={
                  "configuration-swap-view__service-fee-percentage-toggle-button-group"
                }
                onChange={handleSetServiceFeePercentage}
                value={platformFeePercentage}
                aria-label="platform fee percentage">
                <ToggleButton value={0.5} aria-label="0.5%">
                  {"0.5%"}
                </ToggleButton>
                <ToggleButton value={1} aria-label="1%">
                  {"1.0%"}
                </ToggleButton>

                <ToggleButton value={2.5} aria-label="2.5%">
                  {"2.5%"}
                </ToggleButton>
              </ToggleButtonGroup>

              <TextField
                type="number"
                inputProps={{
                  max: 5,
                  step: 0.1
                }}
                size={"small"}
                label="Custom"
                placeholder="0.00"
                value={
                  platformFeePercentage && [0.5, 1, 2.5].includes(platformFeePercentage)
                    ? undefined
                    : platformFeePercentage
                }
                onChange={handleChangePlatformFeePercentage}
              />
            </Box>

            <Box display={"flex"} flexDirection={"column"} gap={"24px"}>
              <TextField
                required
                size={"small"}
                label="Enter wallet address"
                value={platformFeeAccount}
                onChange={handleChangePlatformFeeAccount}
              />

              <p className={"typography--caption color--text-gray"}>
                {
                  "Enter the wallet address you want to receive service fees. Make sure that this address is opted into the assets you specify."
                }
              </p>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );

  function handleChangePlatformFeeAccount(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "SET_CONFIGURATION",
      payload: {
        ...configuration,
        platformFeeAccount: event.currentTarget.value,
        platformFeePercentage: platformFeePercentage!
      }
    });
  }

  function handleChangePlatformFeePercentage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value) {
      dispatch({
        type: "SET_CONFIGURATION",
        payload: {
          ...configuration,
          platformFeePercentage: Number(event.currentTarget.value),
          platformFeeAccount: ""
        }
      });
    } else {
      dispatch({
        type: "SET_CONFIGURATION",
        payload: {
          ...configuration,
          platformFeePercentage: undefined,
          platformFeeAccount: undefined
        }
      });
    }
  }

  function handleSetServiceFeePercentage(
    _event: React.MouseEvent<HTMLElement>,
    newPercentage: number | null
  ) {
    if (newPercentage) {
      dispatch({
        type: "SET_CONFIGURATION",
        payload: {
          ...configuration,
          platformFeePercentage: Number(newPercentage),
          platformFeeAccount: ""
        }
      });
    }
  }

  function handleToggleEnableServiceFee() {
    setIsServiceFeeEnabled(!isServiceFeeEnabled);

    if (isServiceFeeEnabled) {
      dispatch({
        type: "SET_CONFIGURATION",
        payload: {
          ...configuration,
          platformFeePercentage: undefined,
          platformFeeAccount: undefined
        }
      });
    }
  }

  function handleChangePlatformName(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "SET_CONFIGURATION",
      payload: {...configuration, platformName: event.currentTarget.value}
    });
  }

  function handleChangeNetwork(
    _event: React.MouseEvent<HTMLElement>,
    newNetwork: string | null
  ) {
    if (newNetwork) {
      dispatch({
        type: "SET_CONFIGURATION",
        payload: {
          ...configuration,
          network: newNetwork as NetworkToggleValue
        }
      });
    }
  }

  function handleSetAssetIn(event: React.ChangeEvent<HTMLInputElement>) {
    const formattedId = Number(event.currentTarget.value);

    dispatch({
      type: "SET_CONFIGURATION",
      payload: {
        ...configuration,
        assetIds: replaceInArray(configuration.assetIds!, 0, formattedId) as [
          number,
          number
        ]
      }
    });
  }

  function handleSetAssetOut(event: React.ChangeEvent<HTMLInputElement>) {
    const formattedId = Number(event.currentTarget.value);

    dispatch({
      type: "SET_CONFIGURATION",
      payload: {
        ...configuration,
        assetIds: replaceInArray(configuration.assetIds!, 1, formattedId) as [
          number,
          number
        ]
      }
    });
  }
}

export default ConfigurationSwapView;
