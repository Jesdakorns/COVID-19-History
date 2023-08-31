import { NOTIFICATION_VARIANT } from "@/utils/constants";
import React, { createContext, ReactNode, useContext, useReducer } from "react";

export type StateContextDispatcher = React.Dispatch<Partial<IState>>;

export interface IToastNotification {
  message?: string;
  description?: string;
  icon?: any;
  variant?: NOTIFICATION_VARIANT;
}

export interface IState {
  toastNotification?: IToastNotification;
}

const defaultState: IState = {
  toastNotification: undefined,
};

export const StateContext = createContext(defaultState);
export const DispatchContext = createContext<any>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer((oldState: IState, newValue: any) => {
    if (typeof newValue === "function") return newValue(oldState);
    return {
      ...oldState,
      ...newValue,
    };
  }, defaultState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useAppContext: () => [IState, any] = () => [
  useContext(StateContext),
  useContext(DispatchContext),
];
