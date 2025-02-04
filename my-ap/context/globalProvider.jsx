import React, {useState, useEffect, createContext} from "react"

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getItem} from "@/components/localStorage"

export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [isLogIn, setIsLogIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [banks, setBanks] = useState([])
    const [singleTransaction, setSingleTransaction]  = useState(null)
    const [commission, setCommission] = useState(0)
    const [notification, setNotification] = useState(null)
    const [isView, setIsView] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        getItem("userData")
        .then((res) => {
            if (res !==  null) {
                setUser(JSON.parse(res));
                setIsLogIn(true)
                }
            })
        .catch((err) => {
            console.log("error!!");
            })
        .finally(() => {
            setIsLoading(false);
            })
        }, [])

    return(
        <GlobalContext.Provider
        value={{ isLogIn, setIsLogIn, isLoading, setSingleTransaction, notification, setNotification,
            setUser, user, banks, setBanks, singleTransaction, commission, isView, setIsView,
            setCommission }}
        >
            {children}
        </GlobalContext.Provider>
        )
    }

export default GlobalProvider

