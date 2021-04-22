import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

import Navibar from './components/Navibar';
import ProductListPage from './components/ProductListPage';
import AddProductModal from './components/AddProductModal';
import { initializeProducts } from './store/Product/actionCreators';
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [addProductModalOpen, setAddProductModalOpen] = useState<boolean>(false);
  useEffect(() => {
    dispatch(initializeProducts());
  },[]);

  const user: Credentials | null = useSelector(
    (state: AppState) => state.user.user,
  );

  return (
    <div>
      <Router>
        <Navibar user={user} />
        <br/>
        <Switch>
          <Route path="/" render={() => <ProductListPage />} />
        </Switch>
        <Switch>
          <Route path="/AddProduct" render={() => <AddProductModal modalOpen={addProductModalOpen} setModalOpen={setAddProductModalOpen} /> } />
        </Switch>
      </Router>
    </div>
  );
};

export default App;