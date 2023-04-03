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
import Footer from "./components/Footer";
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
