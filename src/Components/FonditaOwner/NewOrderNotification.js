import React  from 'react';
import useGetTotalOrders from './useGetTotalOrders';
import Test from './Test'



const NewOrderNotification = () => {
    
    const totalOrders = useGetTotalOrders();

  return ( 
    <>
    {totalOrders >= 0 && <Test totalOrders={totalOrders}  />}
    </>
  )

}

export default NewOrderNotification;