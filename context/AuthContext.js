'use client'
import React,{Suspense} from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";
import Loading from "@/app/loading"; 
import { useRouter } from "next/navigation";

const auth = getAuth(firebase_app)

const AuthContext = React.createContext();
const AuthContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null)
    const router = useRouter();
    React.useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            if(user){
                setUser(user)
            }
            else{
                setUser(null)
                router.push('/')
            }
        })
    },[])
    return <AuthContext.Provider value={{user}}><Suspense fallback={<Loading/>}>{children}</Suspense></AuthContext.Provider>
}
export const useGlobalContext = () =>{
    return React.useContext(AuthContext)
}
export {AuthContext, AuthContextProvider}