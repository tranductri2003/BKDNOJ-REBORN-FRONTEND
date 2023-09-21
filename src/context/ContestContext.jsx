import React from 'react'
const ContestContext = React.createContext({})

export const ContestProvider = ContestContext.Provider
export const ContestConsumer = ContestContext.Consumer

export default ContestContext;