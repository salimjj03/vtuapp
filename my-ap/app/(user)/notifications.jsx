import React, {useContext, useEffect} from "react";
import {  Text, View, FlatList } from "react-native";
import { GlobalContext } from "@/context/globalProvider";
import { SafeAreaView } from "react-native-safe-area-context";


const Notification = () => {

  const { notification, setIsView } = useContext(GlobalContext);

  useEffect( () => {
      setIsView(true)
      }, [])
  return (
      <SafeAreaView className="flex-1 items-center bg-background">
          <FlatList
              keyExtractor={(item) => item.id}
              data={notification}
              renderItem= { ({item}) =>
              <View className="m-4 rounded-xl bg-primary-100" >
                   <Text className="text-center m-4">{item.message}</Text>
                   <Text className="text-center m-4">{new Date(item.created_at).toLocaleString()} </Text>
              </View>
              }
          />
      </SafeAreaView>
       )}

export default Notification;
