import React, {useEffect, useRef} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


toast.configure();

const Test = ({totalOrders}) => {
    const isInitialMount = useRef(true);

    const notify = () => {
        toast('We got a new order =)!')
    }

  useEffect(() => {


      
  if (isInitialMount.current) {
     isInitialMount.current = false;
  } else {
      notify();  
       
 
  }
},[totalOrders]);




return (
    <>
        <div>Hola mundo!</div>
    </>
)
}

export default Test;
