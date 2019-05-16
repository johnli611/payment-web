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
      <div>
        <div style={{marginTop: '20px'}}>
          <img width="50px" height="50px" src="https://i.imgur.com/CxrO132.png" alt=""/>
        </div>

        <div style={{
          display: 'flex',
          marginTop: '100px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{borderRadius: '3px', width: '550px', minHeight: '250px', border: '1px solid #4E516A', padding: '20px'}}>
            {!this.state.shouldShowToast ? this.renderCheckoutForm() : this.renderToast()}
          </div>
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
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '20px'
      }}>
        <div>
          <img
            width="100px"
            height="100px"
            src="https://img.icons8.com/dusk/384/checked.png"
          />
        </div>

        <div style={{fontSize: '24px', marginTop: '20px'}}>
          <b>
            Thank you!
          </b>
        </div>
      </div>
    )
  }

  handleCloseChargeModal() {
    this.setState({
      amount: null,
      shouldShowToast: true
    });
  }
}
