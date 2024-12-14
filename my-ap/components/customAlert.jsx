import React from "react"
import {View, Text, Modal} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from "@/components/customButton"
import {Colors} from "@/constants/Colors"


const CustomAlert = ({title, response, onClose}) => {
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
                <AntDesign name={`${title === "error" ? "closecircle" : "checkcircle"}` }
                size={60}
                color={`${title === "error" ? "red" : Colors.primary.DEFAULT}` }
                />
                <Text className="font-psemibold text-lg">{title}</Text>
                <Text className="font-pregular text-lg text-center">{response}</Text>
                <CustomButton
                title="Close"
                containerStyle="w-[200]"
                onPress={onClose}
                />

            </View>
            </View>
        </Modal>
        )
    }

export default CustomAlert