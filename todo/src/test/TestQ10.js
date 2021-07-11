import React from 'react'
import Test2 from './Test2';

export const NameContext = React.createContext();
export const AgeContext = React.createContext();
export class ProviderComponent extends React.Component {
 render() {
 return (
 <NameContext.Provider value="Backbench">
 <AgeContext.Provider value="3">
 <Test2 />
 </AgeContext.Provider>
 </NameContext.Provider>
 );
 }
}