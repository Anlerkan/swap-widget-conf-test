import "./_on-off-toggle-container.scss";

import classNames from "classnames";

import OnOffToggle, {OnOffToggleValue} from "../OnOffToggle";

interface OnOffToggleContainerProps {
  title: string;
  value: OnOffToggleValue;
  onToggle: (toggleState: OnOffToggleValue) => void;
  description?: string;
  customClassName?: string;
}

function OnOffToggleContainer({
  title,
  value,
  onToggle,
  description,
  customClassName
}: OnOffToggleContainerProps) {
  return (
    <div
      className={classNames(
        "on-off-toggle-container has-space-between is-centered",
        customClassName
      )}>
      <div className={"is-flex-column"}>
        <h2 className={"typography--body"}>{title}</h2>

        {description && (
          <p
            className={
              "typography--caption color--text-gray on-off-toggle-container__description"
            }>
            {description}
          </p>
        )}
      </div>

      <OnOffToggle value={value} onToggle={onToggle} />
    </div>
  );
}

export default OnOffToggleContainer;
