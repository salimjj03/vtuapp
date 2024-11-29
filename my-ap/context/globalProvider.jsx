import React, {useState, useEffect, createContext} from "react"
import {getItemAsync} from "expo-secure-store"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalContext = createContext();

const GlobalProvider = ({children}) => {
    const [isLogIn, setIsLogIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        currentUser()
        .then((res) => {
            setUser(JSON.parse(res));
            setIsLogIn(true)
            })
        .catch((err) => {
            console.log("error!!");
            })
        .finally(() => {
            setIsLoading(false);
            })
        }, [])

    const currentUser = async () => {
        try {
            let userData = await AsyncStorage.getItem("userData");
            if (userData) {
                console.log(userData)
                }
            else {
                console.log("user not")
                }
            return userData;
        } catch (error) {
            console.log(error)
            }
        }

    return(
        <GlobalContext.Provider
        value={{ isLogIn, setIsLogIn, isLoading, setUser, user }}
        >
            {children}
        </GlobalContext.Provider>
        )
    }

export default GlobalProvider

