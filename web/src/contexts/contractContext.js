import React from 'react';
const ContractContext = React.createContext();

function useWeb3() {
  const context = React.useContext(ContractContext)
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Provider')
  }
  return context
}

export {ContractContext, useWeb3}
