import React from "react";

const EleventyContext = React.createContext();

export const EleventyProvider = EleventyContext.Provider;

export function useEleventy() {
  const $11ty = React.useContext(EleventyContext);
  return $11ty;
}
