import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Auth from './auth/Auth'
import { useSelector } from 'react-redux';
import CustomProductEdit from './components/products/custom/CustomProductEdit';

const NotFound = React.lazy(() => import('./pages/NotFound'))
const Products = React.lazy(() => import('./pages/Products'))
const CreateProduct = React.lazy(() => import('./pages/CreateProduct'))
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'))

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated)

  return (
    <Layout>
      {!isAuth && <Auth />}
      {isAuth &&

        <Suspense fallback={
          <div className="centered" >
            <LoadingSpinner />
          </div>} >
          <Switch>
            <Route path="/" exact>
              <Redirect to="/products" />
            </Route>
            <Route path="/products" exact>
              <Products />
            </Route>
            <Route path="/products/:productId" >
              <ProductDetail />
            </Route>
            <Route path="/products-custom/:productId" >
              <CustomProductEdit />
            </Route>
            <Route path="/create-product" exact>
              <CreateProduct />
            </Route>
            <Route path="*" >
              <NotFound />
            </Route>
          </Switch>
        </Suspense>

      }
    </Layout>

  );
}

export default App;
