import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthState from "./context/auth/AuthState";
import ContactState from "./context/contact/ContactState";
import AlertState from "./context/alert/AlertState";

import Header from "./components/Header";
import About from "./screens/About";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./components/routing/PrivateRoute";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import ResetConfirm from "./components/ResetConfirm";

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <>
              <Header />
              <main className="py-4">
                <Container>
                  <Switch>
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/about" component={About} />
                    <Route path="/reset-password" component={ResetPassword} />
                    <Route path="/reset-confirm" component={ResetConfirm} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute exact path="/" component={HomeScreen} />
                  </Switch>
                </Container>
              </main>
            </>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
