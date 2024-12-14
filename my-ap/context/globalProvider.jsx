import React, {useState, useEffect, createContext} from "react"
import {getItemAsync} from "expo-secure-store"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getItem} from "@/components/localStorage"

export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [isLogIn, setIsLogIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        value={{ isLogIn, setIsLogIn, isLoading, setUser, user }}
        >
            {children}
        </GlobalContext.Provider>
        )
    }

export default GlobalProvider

