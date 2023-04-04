//import create context/ use context and reducer
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers'
//decalare variables/ object
const StoreContext = createContext();
//is a property of the context object, so we destructure it from StoreContext.
const { Provider } = StoreContext;
//StoreProvider is a custom component that will wrap our app and provide access to the global state using the useProductReducer hook. This component receives a value prop which is an array containing the state and dispatch functions returned by useProductReducer. We also use the spread operator (...props) to pass any additional props to the Provider component.
const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};
//The useStoreContext function is a custom hook that returns the current context value 
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
