import React, { useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const OrderNotification = ({ totalOrders }) => {
  const isInitialMount = useRef(true);

  const notify = () => {
    toast(' 🧑‍🍳 We got a new order!', {
      position: 'top-center',
      autoClose: false,
      draggable: true,
      type: 'success',
      style: {
        fontSize: '16px',
        textAlign: 'center',
      },
    });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      notify();
    }
  }, [totalOrders]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={false}
        type={'success'}
        style={{ fontSize: '16px', textAlign: 'center' }}
      />
    </>
  );
};

export default OrderNotification;
