import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';


const PendingOrders = () => {
    const orders = useSelector((state) => state.orders);
    let pendingOrders = 0;

    if(!isEmpty(orders)){
        pendingOrders = Object.values(orders).filter(order => !order.orderCompleted).length;
    }

    
    return (
        <>
            <div>
                {pendingOrders}
            </div>
        </>
    )
}

export default PendingOrders;
