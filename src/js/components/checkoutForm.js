import React, { Component }     from 'react';
import {
  CardElement,
  injectStripe
}                               from 'react-stripe-elements';
import { Button }               from 'react-bootstrap';


class CheckoutForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      shouldShowInvalidCardError: false
    };

    this.submit = this.submit.bind(this);
  }

  render() {
    let style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    return (
      <div style={{background: 'white'}}>
        <p style={{marginBottom: '40px'}}>
          Please enter your payment information to start your subscription. You'll be charged monthly starting today.
        </p>

        <CardElement style={style} />

        <p className="m-t-10" style={{color: '#fa755a', height: '20px'}}>
          {this.state.shouldShowInvalidCardError && 'Invalid card information'}
        </p>

        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            variant="outline-info"
            onClick={this.submit}
            style={{marginTop: '25px'}}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }

  submit(ev) {
    Promise.resolve(this.props.stripe.createToken())
      .then(({token}) => {
        this.postSubscription(token)
          .then((response) => {
            // TODO: USE RESPONSE STATUS INSTEAD OF RESPONSE MESSAGE
            this.props.handleCloseChargeModal();
          })
          .catch((response) => {
            console.log('stripe charge error', response);
          });
      })
      .catch(({response}) => {
        console.log('Stripe error response', response);

        this.setState({shouldShowInvalidCardError: true});
      });
  }

  postSubscription(stripeToken) {
    let paymentData = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.constructSubscriptionData(stripeToken))
    };

    return fetch('http://localhost:3000/subscribe', paymentData)
    // return fetch('https://sunrise-dev.herokuapp.com/subscribe', paymentData)
      .then(response => response.json())
      .then((responseJSON) => console.log(responseJSON));
  }

  constructSubscriptionData(token) {
    return {
      subscription: {
        user_id: this.props.userId,
        // stripeToken: token.tokenId,
        stripeToken: token.id,
        trial_period_days: 0,
        amount: this.props.amount,
        currency: 'usd',
        plan_id: 'plan_Ee3sdyf1QMNUtX' // TODO: REMOVE HARDCODED VALUE
      }
    }
  }
}

export default injectStripe(CheckoutForm);
