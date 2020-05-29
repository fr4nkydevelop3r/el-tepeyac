import React, {useEffect, useRef} from 'react';
import UIfx from 'uifx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import eventually from '../../sounds/eventually.mp3';


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
         const sound = new UIfx(
        eventually
    )
      sound.play()
    
  }
},[totalOrders]);



return (
    <>
        <div>Hola mundo!</div>
    </>
)
}

export default Test;
