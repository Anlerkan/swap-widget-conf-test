import {ReactComponent as CopyMiniIcon} from "../../../core/ui/icon/CopyMini.svg";
import {ReactComponent as TickIcon} from "../../../core/ui/icon/Tick.svg";

import {ButtonProps} from "@mui/material";
import {Button} from "@hipo/react-ui-toolkit";

import classNames from "classnames";

import useClipboard from "../useClipboard";

import "./_clipboard-button.scss";

export type ClipboardButtonProps = ButtonProps & {
  textToCopy: string;
  textCopiedMessage?: string;
  iconPosition?: "left" | "right";
};

function ClipboardButton({
  textToCopy,
  textCopiedMessage = "Copied",
  children,
  "aria-label": ariaLabel,
  iconPosition,
  ...otherProps
}: ClipboardButtonProps) {
  const clipboard = useClipboard();

  return (
    <Button
      customClassName={classNames(
        "is-vertically-centered",
        "has-space-between",
        "clipboard-button",
        {
          "clipboard-button--icon-right": iconPosition === "right"
        }
      )}
      aria-label={ariaLabel || "Copy to clipboard"}
      onClick={copy}
      {...otherProps}>
      <div className={"is-vertically-centered clipboard-button__content"}>
        <div className={"clipboard-button__icon"}>
          <CopyMiniIcon />
        </div>

        <span>{children || textToCopy}</span>
      </div>

      {clipboard.hasCopied && (
        <div
          className={
            "is-vertically-centered typography--caption clipboard-button__copied-message"
          }>
          <TickIcon />
          {textCopiedMessage}
        </div>
      )}
    </Button>
  );

  function copy() {
    clipboard.copyToClipboard(textToCopy);
  }
}

export default ClipboardButton;
