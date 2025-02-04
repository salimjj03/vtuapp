import React from "react"
import {View, Text, Modal} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from "@/components/customButton"
import {Colors} from "@/constants/Colors"
import Ionicons from '@expo/vector-icons/Ionicons';


const CustomAlert = ({title, response, onClose,
    secondTitle, secondOnClose}) => {

    const handleStatus = (title) => {
        if (title === "success" || title === true || title === "true" ||
            title === "successful" || title === "successfully" || title == 200 || title == 201) {
                return true
                } else {
                    return false
                    }
        }

    return (
        <Modal
        visible={true}
        animationType="fade"
        transparent={true}
        >
            <View
             className="flex-grow justify-center items-center"
             style={{
                 backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}
             >
            <View
            className="min-h-[220] w-[80vw] rounded-lg
            bg-white p-3 justify-center items-center gap-2"
            >
                { title === "Notification" ?
                <Ionicons name="notifications-circle-outline" size={80} color={Colors.primary.DEFAULT} /> :

                <AntDesign name={`${ !handleStatus(title) ? "closecircle" : "checkcircle"}` }
                size={60}
                color={`${ !handleStatus(title) ? "red" : Colors.primary.DEFAULT}` }
                />
                }
                { title && <Text className="font-psemibold text-lg">{title}</Text>}
                { response && <Text className="font-pregular text-lg text-center">{response}</Text> }
                <CustomButton
                title="Close"
                containerStyle="w-[200] bg-primary"
                onPress={onClose}
                />

                { handleStatus(title) && secondTitle &&
                <CustomButton
                title={secondTitle}
                containerStyle="w-[200] bg-primary"
                onPress={secondOnClose}
                />
                }

            </View>
            </View>
        </Modal>
        )
    }

export default CustomAlert