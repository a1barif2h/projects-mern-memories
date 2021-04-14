import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";


function App() {

  return (
    <>
      <Router>
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
