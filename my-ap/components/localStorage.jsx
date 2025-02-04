import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const getItem = async (item) => {
        try {
            let userData = await AsyncStorage.getItem(item);
            if (userData) {
                console.log("userData fetch successfully")
                } else {
                console.log(`${item} not found`)
                }
            return userData;
        } catch (error) {
            console.log(error)
            }
        }

export const deleteItem = async (item) => {
    try {
        await AsyncStorage.removeItem(item);
        console.log(`${item} delete successfully`);
        return true;
        } catch (error) {
            console.log(error);
            return error
            }
    }

export const setItem = async (name, data) => {
    try{
        await AsyncStorage.setItem(name, data);
        console.log("stored");
        return true
        } catch (error) {
            console.error(error)
            return false
            }
    }