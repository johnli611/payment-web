import React, { Component }       from 'react';
import {
  BrowserRouter as Router,
  Route
}                                 from 'react-router-dom';
import { StripeProvider }         from 'react-stripe-elements';
import Layout                     from './js/views/layout';
import CheckoutFormContainer      from './js/components/checkoutFormContainer';


class App extends Component {

  render() {
    return (
      <Router>
        <StripeProvider apiKey="pk_test_JfkJNk8SSeqeBrfmHhKBh4K6">
          <Layout>
            <Route path="/charge/:user_id" component={CheckoutFormContainer} />
          </Layout>
        </StripeProvider>
      </Router>
    );
  }
}

export default App;
