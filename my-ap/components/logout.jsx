import React, { useContext } from 'react';
import {deleteItem, getItem} from "@/components/localStorage"
import {router} from "expo-router";


export const handleLogout = (setIsLogIn) => {

            deleteItem("userData")
            .then( (res) => {
                if (res === true) {
                    getItem("userData")
                    .then((res) => {
                        if (res === null) {
                            console.log(res)
                            setIsLogIn(false);
                            router.push("/signin")
                            } else {
                                return false;
                                }
                        })
                    }
                })
            .catch( (err) => {
                console.log(err)
                })

        }