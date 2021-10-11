import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const NotFound = React.lazy(() => import('./pages/NotFound'))
const Products = React.lazy(() => import('./pages/Products'))
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'))

function App() {
  return (
    <Layout>
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
          <Route path="*" >
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>

  );
}

export default App;
