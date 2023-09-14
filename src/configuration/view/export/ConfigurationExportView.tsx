import {ReactComponent as InfoIcon} from "../../../core/ui/icon/Info.svg";

import {Textarea} from "@hipo/react-ui-toolkit";
import {Box} from "@mui/material";

import ConfigurationViewTitle from "../title/ConfigurationViewTitle";
import {useConfigurationState} from "../../context/ConfigurationContext";
import {WidgetController} from "@tinymanorg/tinyman-swap-widget-sdk";
import Line from "../../../component/line/Line";

import "./_configuration-export-view.scss";
import ClipboardButton from "../../../component/clipboard/button/ClipboardButton";

function ConfigurationExportView() {
  const configuration = useConfigurationState();
  const widgetIframeUrl = WidgetController.generateWidgetIframeUrl(configuration);
  const iframeEmbedCode = `<iframe title="tinyman swap widget" src="${widgetIframeUrl}" style="width: 415px; height: 440px; border: none;" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" />`;

  return (
    <div className={"configuration-export-view"}>
      <ConfigurationViewTitle>{"Export the widget"}</ConfigurationViewTitle>

      <p className={"typography--secondary-body"}>
        {
          "If you finish configuring the widget, you can export the widget and start using it on your application. Copy the embed code and paste to the area you want to show in your hosting application."
        }
      </p>

      {configuration.useParentSigner ? (
        <>
          <Textarea
            customClassNames={{
              textarea: "configuration-export-view__parameters-object typography--tiny"
            }}
            isDisabled={true}
            onChange={() => undefined}
            value={JSON.stringify(configuration, null, 2)}
            name={"parametersObject"}
          />

          <ClipboardButton textToCopy={JSON.stringify(configuration, null, 2)}>
            {"COPY"}
          </ClipboardButton>

          <Line margin={"32px 0"} />

          <Box
            color={"color--text-gray"}
            display={"grid"}
            gridTemplateColumns={"16px 1fr"}
            gap={"9px"}>
            <InfoIcon />

            <Box display={"grid"} gap={"24px"}>
              <p className={"typography--caption color--text-gray"}>
                {
                  'For parent signer mode, you have to install the tinyman-swap-widget-sdk library, and use "generateIframeUrl" function with the parameters object above:'
                }
              </p>

              <code className={"typography--tiny"}>
                {"const iframeUrl = WidgetController.generateIframeUrl(...)"}
              </code>

              <p className={"typography--caption color--text-gray"}>
                {"Do not forget to update"}
              </p>

              <code className={"typography--tiny"}>
                {'"YOUR_ACCOUNT_ADDRESS_VARIABLE_NAME"'}
              </code>

              <p className={"typography--caption color--text-gray"}>
                {"part with the actual account address variable in your project."}
              </p>

              <div className={"color--text-gray"}>
                <span>{"Please see the instructions: "}</span>
                <a
                  target={"_blank"}
                  style={{
                    textDecoration: "underline",
                    color: "var(--text-gray)"
                  }}
                  rel={"noreferrer noopener"}
                  href={
                    "https://www.npmjs.com/package/@tinymanorg/tinyman-swap-widget-sdk"
                  }>
                  {"https://www.npmjs.com/package/@tinymanorg/tinyman-swap-widget-sdk"}
                </a>
              </div>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <div className={"configuration-export-view__iframe-embed-code-wrapper"}>
            <span
              className={
                "configuration-export-view__iframe-embed-code-title typography--tiny color--text-gray"
              }>
              {"Iframe Embed Code"}
            </span>
            <Textarea
              customClassNames={{
                textarea: "configuration-export-view__iframe-embed-code typography--tiny"
              }}
              isDisabled={true}
              onChange={() => undefined}
              value={iframeEmbedCode}
              name={"iframeEmbedCode"}
            />
          </div>

          <ClipboardButton textToCopy={iframeEmbedCode}>{"COPY"}</ClipboardButton>

          <Line margin={"32px 0"} />

          <Box
            color={"color--text-gray"}
            display={"grid"}
            gridTemplateColumns={"16px 1fr"}
            gap={"9px"}>
            <InfoIcon />

            <Box display={"grid"} gap={"24px"}>
              <p className={"typography--caption color--text-gray"}>
                {
                  'If you want to change some parameters dynamically, you can install tinyman-swap-widget-sdk library, and use "generateIframeUrl" function with an object of parameters that you want to customize, for example:'
                }
              </p>

              <code className={"typography--tiny"}>
                {
                  'const iframeUrl = WidgetController.generateIframeUrl({ themeVariables: { title: "AlgorandGovernance" } })'
                }
              </code>

              <div className={"color--text-gray"}>
                <span>{"Please see the instructions: "}</span>
                <a
                  target={"_blank"}
                  style={{
                    textDecoration: "underline",
                    color: "var(--text-gray)"
                  }}
                  rel={"noreferrer noopener"}
                  href={
                    "https://www.npmjs.com/package/@tinymanorg/tinyman-swap-widget-sdk"
                  }>
                  {"https://www.npmjs.com/package/@tinymanorg/tinyman-swap-widget-sdk"}
                </a>
              </div>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}

export default ConfigurationExportView;
