import React from 'react'
import { useEffect } from 'react'

const Khalti = () => {
    const queryParams=new URLSearchParams(location.search)
    const totalAmount=queryParams.get("totalAmount")
    const orderId=queryParams.get("orderid")
    console.log(totalAmount,orderId);

    useEffect(()=>{

    },[])
    
  return (
    <div>Khalti</div>
  )
}

export default Khalti