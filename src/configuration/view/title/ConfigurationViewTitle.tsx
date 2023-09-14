import React from "react";

import "./_configuration-view-title.scss";

interface ConfigurationViewTitleProps {
  children: React.ReactNode;
}
function ConfigurationViewTitle({children}: ConfigurationViewTitleProps) {
  return (
    <h2
      className={
        "configuration-view-title typography--secondary-subtitle is-semi-bold-text"
      }>
      {children}
    </h2>
  );
}

export default ConfigurationViewTitle;
