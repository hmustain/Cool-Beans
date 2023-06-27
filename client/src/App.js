//import all packages components/  context/ router /pages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./utils/GlobalState";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import ProductReviews from "./components/ProductReview";
import ShopAll from "./pages/ShopAll";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Pagenotfound from "./pages/pagenotfound";
import Success from "./pages/Success";
import Footer from "./components/Footer";
//connection to graphql
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});
//authorization header to it that contains a Bearer token. The token is retrieved from localStorage using the key id_token. If there is no token, the header is set to an empty string.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
//Finally, we create an ApolloClient instance using the client constant. The link property is set to authLink.concat(httpLink), which combines the authLink and httpLink instances. The cache property is set to a new instance of InMemoryCache, which is the default cache implementation used by Apollo Client.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
//function app that is wraped in appollo provider and router
//declare all our routes and which page will be rendered
//footer is always at the bottom
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Routes>
              <Route path="*" element={<Pagenotfound />} />
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/ShopAll" element={<ShopAll />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/success" element={<Success/>} />
              <Route
                path="/product/:productId/reviews"
                element={<ProductReviews />}
              />
              <Route path="/product/:id" element={<Detail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </StoreProvider>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
