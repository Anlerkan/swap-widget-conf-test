import "./_on-off-toggle.scss";

import {Toggle} from "@hipo/react-ui-toolkit";

export enum OnOffToggleValue {
  On = "on",
  Off = "off"
}
interface OnOffToggleProps {
  value: OnOffToggleValue;
  onToggle: (toggleState: OnOffToggleValue) => void;
}

function OnOffToggle({value, onToggle}: OnOffToggleProps) {
  const isOn = value === OnOffToggleValue.On;

  return (
    <Toggle
      customClassName={"on-off-toggle"}
      selectedItems={[isOn ? OnOffToggleValue.On : OnOffToggleValue.Off]}
      onToggle={handleToggle}>
      <Toggle.Item
        customClassName={"typography--button"}
        dataId={OnOffToggleValue.On}
        isDisabled={isOn}>
        {"ON"}
      </Toggle.Item>

      <Toggle.Item
        customClassName={"typography--button"}
        dataId={OnOffToggleValue.Off}
        isDisabled={!isOn}>
        {"OFF"}
      </Toggle.Item>
    </Toggle>
  );

  function handleToggle(selectedItems: string[]) {
    onToggle(selectedItems[0] as OnOffToggleValue);
  }
}

export default OnOffToggle;
