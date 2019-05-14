import React, { Component }     from 'react';
import { Elements }             from 'react-stripe-elements';
import CheckoutForm             from './checkoutForm';


export default class CheckoutFormContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      amount: null,
      shouldShowToast: false,
    };

    this.handleCloseChargeModal = this.handleCloseChargeModal.bind(this);
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        marginTop: '100px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{borderRadius: '3px', width: '550px', border: '1px solid #4E516A', padding: '20px', minHeight: '200px'}}>
          {!this.state.shouldShowToast ? this.renderCheckoutForm() : this.renderToast()}
        </div>
      </div>
    );
  }

  renderCheckoutForm() {
    return (
      <Elements>
        <CheckoutForm
          handleCloseChargeModal={this.handleCloseChargeModal}
          description={'Monthly subscription'}
          amount={this.state.amount}
          userId={this.props.match.params.user_id}
        />
      </Elements>
    );
  }

  renderToast() {
    return <div>Thank you!</div>
  }

  handleCloseChargeModal() {
    this.setState({
      amount: null,
      shouldShowToast: true
    });
  }
}
