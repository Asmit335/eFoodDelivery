import React from 'react'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children}) => {
    const {data}=useSelector((state)=>state.auth)
    if(data.role==="admin"){
        return(
            <div>
                {children}
            </div>
        )
    }else{
    return (
    <div>You dont have Permission here.</div>
  )
}
}
export default ProtectedRoute