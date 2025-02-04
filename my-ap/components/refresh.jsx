import React from "react";
import {  Text, View, ActivityIndicator } from "react-native";
import CustomButton from "@/components/customButton"
import {Colors} from "@/constants/Colors"

const Refresh = ({loading, error, setError, setRefresh}) => {

  return (
      <View>
       {(loading || error) && (
           <View className="w-[90vw] flex-row items-center mb-4 justify-center
            bg-white p-3 rounded-lg gap-3 flex-1">
            { error ?
                <View className="flex-col items-center">
                    <Text className="mb-2 font-pregular">Error occur, Try again</Text>
                    <CustomButton
                    title="Refresh"
                    onPress={ () => {
                        setRefresh( (r) => !r )
                        //setError(false)
                        }}
                    containerStyle="bg-primary w-[100]"
                    />
                </View>:
            <ActivityIndicator
            size="large"
            color={Colors.primary.DEFAULT}
            />
            }
            </View> )
            }
        </View>
  )
};

export default Refresh;
