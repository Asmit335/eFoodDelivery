import React from 'react'
import { API_Authentication } from '../../http'
import { useEffect } from 'react'
import { useState } from 'react'
import Loader from '../../global/loader/Loader'
import { emptyCart } from '../../store/cartSlice'
import { useDispatch } from 'react-redux'
const Sucess = () => {
  const dispatch=useDispatch()
  const [loading,setLoading]=useState(true)
  const queryParams=new URLSearchParams(location.search)
  const pidx=queryParams.get("pidx")
  const verifyPidx=async()=>{
    try {
      const response=await API_Authentication.post("/payment/khaltiverify",{pidx})
      if(response.status===200){
         setLoading(false)
         alert(response.data.message)
         dispatch(emptyCart())
         window.location.href=("/")

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    verifyPidx()
  },[])
  if(loading){
   return(
     <Loader status="Verifying..."/>
   )
  }else{
  return (
    <Loader status="Verified"/>
  )
}
} 
export default Sucess