import { useEffect, useState } from 'react';
import { firestore } from '../../firebase';
import { getDay } from '../../utilities';


const useGetTotalOrders = () => {
  const [total, setTotal] = useState();

    useEffect(() => {
    let unsubscribeFromFirestore;
    const ordersRef = firestore.collection('orders').doc(getDay());
        unsubscribeFromFirestore = ordersRef
            .onSnapshot((doc) => {
                //console.log(doc.data().totalOrders);
                if(doc.data()){
                setTotal(doc.data().totalOrders); 

                }
            });
    
    
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, []); 


return total;
};

export default useGetTotalOrders;
