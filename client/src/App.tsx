import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navibar from './components/Navibar';
import ProductListPage from './components/ProductListPage';

const App: React.FC = () => {

  return (
    <div>
      <Router>
        <Navibar />
        <h1> Verkkokauppa </h1>

        <Switch>
          <Route path="/" render={() => <ProductListPage />} />
        </Switch>
      </Router>
      
      
    </div>
  );
};

export default App;