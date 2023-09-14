import {useReducer} from "react";
import {
  ConfigurationDispatchContext,
  ConfigurationStateContext,
  configurationStateReducer,
  initialConfigurationState
} from "./ConfigurationContext";

interface ConfigurationContextProviderProps {
  children: React.ReactNode;
}
function ConfigurationContextProvider({children}: ConfigurationContextProviderProps) {
  const [state, dispatch] = useReducer(
    configurationStateReducer,
    initialConfigurationState
  );

  return (
    <ConfigurationDispatchContext.Provider value={dispatch}>
      <ConfigurationStateContext.Provider value={state}>
        {children}
      </ConfigurationStateContext.Provider>
    </ConfigurationDispatchContext.Provider>
  );
}

export default ConfigurationContextProvider;
