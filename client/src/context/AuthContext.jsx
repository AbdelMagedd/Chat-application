import {  createContext, useCallback , useEffect, useState  } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children}) => {
    const [user , setUser ] = useState(null)
    const [registerError , setRegisterError ] = useState(null)
    const [loginError , setLoginError ] = useState(null)
    const [isRegisterLoading , setIsRegisterLoading ] = useState(false)
    const [isLoginLoading , setIsLoginLoading ] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name:"",
        email:"",
        password:""
    });
    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password:""
    });

    useEffect(() => {
        const userr = localStorage.getItem("user");
        setUser(JSON.parse(userr))
        
    }, [])

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    },[])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    },[])

    const registerUser = useCallback(
        async (e) => {
        e.preventDefault()
        setIsRegisterLoading(true)
        setRegisterError(null)
        const response = await postRequest(`${baseUrl}/users/register` , JSON.stringify(registerInfo))

        setIsRegisterLoading(false)

        if (response.error) {
           return setRegisterError(response );
        }
        localStorage.setItem('User',JSON.stringify(response))
        setUser(response)
        
    },[registerInfo])

    const loginUser = useCallback(async (e) => {
        e.preventDefault()
        setIsLoginLoading(true)
        setLoginError(null)
        const response = await postRequest(`${baseUrl}/users/login` , JSON.stringify(loginInfo))

        setIsLoginLoading(false)
        if (response.error) {
           return setLoginError(response );
        }
        localStorage.setItem('User',JSON.stringify(response))
        setUser(response)

    }, [loginInfo])

    const logoutUser = useCallback( ( ) => {
        localStorage.removeItem('User')
        setUser(null)

    }, [])
    return <AuthContext.Provider value={{user , loginUser, loginError,loginInfo, isLoginLoading,  registerInfo ,updateLoginInfo, updateRegisterInfo , registerUser , registerError ,isRegisterLoading , logoutUser}}>
        {children}
    </AuthContext.Provider>
}

