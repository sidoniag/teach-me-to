import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Login from './pages/Login'
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import ResourceAddEdit from './pages/ResourceAddEdit';
import ArticleView from './pages/ArticleView';
import ResourcePage from "./pages/ResourcePage";
import ProfilePage from "./pages/ProfilePage";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch"
import { ThemeProvider } from "@chakra-ui/core";

{/* <ThemeProvider theme={customTheme}>{props.children}</ThemeProvider>; */}

const client = new ApolloClient({
  // request: (operation) => {
  //   const token = localStorage.getItme('id_token')
  //   operations.setContext({
  //     headers: {
  //       authorization: token? `Bearer ${token}` : ''
  //     }
  //   })
  // },
  uri: '/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/resource/:id?" component={ResourceAddEdit} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/page" component={ResourcePage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/articles/:id" component={ArticleView} />
            <Route exact path="/nomatch" component={NoMatch} />
            {/* <Route component={NoMatch} /> */}
          </Switch>
          
          <Footer />
        </div>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
