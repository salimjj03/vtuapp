import React from 'react';
import { Button, Alert, Text, View, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const WhatsAppCommunity = () => {
  const handleJoinWhatsAppCommunity = () => {
    // WhatsApp Community invite link
    const communityLink = 'https://chat.whatsapp.com/DU3KSezcU5U5FIz1YkHy37'; // Replace with your Community link

    // Open the link
    Linking.openURL(communityLink).catch((err) => {
      Alert.alert('Error', 'Unable to open WhatsApp Community link.');
      console.error('An error occurred:', err);
    });
  };

  return (
      <TouchableOpacity
       className="flex-row  gap-4 p-2 items-center"
       onPress={handleJoinWhatsAppCommunity}
       >
        <View className="w-[50] h-[50] items-center justify-center rounded-full bg-background">
            <MaterialIcons name="groups" size={30} color="green" />
        </View>

        <View className="gap-2">
            <Text className="font-semibold">Whatsapp Group</Text>
            <Text className="regular">Join Group</Text>
        </View>
      </TouchableOpacity>
  );
};

export default WhatsAppCommunity;
