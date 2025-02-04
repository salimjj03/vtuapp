import React from "react"
import {View, Text} from "react-native"
import {Link} from "expo-router"


const Icon = ({icon, title, link}) => {
    return (<>
        <View
            className="flex justify-center  gap-2 items-center w-[95]">
                <Link href={link}>
                <View
                style={{
                    shadowColor: "gray", //Colors.primary.second,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
                className="w-[50] h-[50] bg-primary-200 rounded-2xl
                flex items-center justify-center"
                >
                   {icon}
                </View>
                </Link>
                <Text className="font-pregular text-nowrap"> {title} </Text>
            </View>
        </>)
    }

export default Icon