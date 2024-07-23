import { createContext, useState } from "react";

const UserContext= createContext({
  userData:{},
  addUserData:()=>{}  
})

export const UserContextProvider=({children})=>{
    const [data,setData]=useState({})
    const addUserData=(data)=>{
        setData(data)
    }
    return <UserContext.Provider value={{
        userData:data,
        addUserData,
    }}>{children}</UserContext.Provider>
}



export default UserContext;