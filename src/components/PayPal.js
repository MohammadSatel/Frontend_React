import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Pay = ({ amount }) => { // Accept `amount` as a prop if it's dynamic
  const paypalOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID, // Use an environment variable for the client ID
    currency: 'USD',
    // Add any additional PayPal options here
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: amount, // Use the dynamic amount passed as a prop
        },
      }],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(details => {
      // Implement logic for a successful transaction here
      console.log('Payment successful:', details);
      // e.g., update order status in your database, redirect to a success page, etc.
    });
  };

  const onError = (err) => {
    // Implement error handling logic
    console.error('Payment error:', err);
    // e.g., display a user-friendly error message, log error details, etc.
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default Pay;
