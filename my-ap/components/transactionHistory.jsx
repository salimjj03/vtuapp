import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TransactionHistory = ({ date, status, amount, description, type }) => {
  return (
    <View className="flex-row items-center gap-4 p-4 bg-white rounded-lg">
      {/* Icon Container */}
      <View
        className="w-12 h-12 items-center justify-center rounded-full"
        style={{
          backgroundColor: Colors.background.DEFAULT,
        }}
      >
        <MaterialCommunityIcons
          name={
              type === "Transfer" || type === "FUND" || type === "COMMISSION" ?
              "arrow-down-thin" :
               "arrow-up-thin"
              }
          size={24}
          color={
              type === "Transfer" || type === "FUND" || type === "COMMISSION" ?
              "green" :
              "red"
              }
        />
      </View>

      {/* Transaction Details */}
      <View className="flex-1">
        {/* Description and Amount */}
        <View className="flex-row justify-between">
          <Text className="text-gray-800 font-medium flex-1" numberOfLines={1}>
            {description}
          </Text>
          <Text className="font-semibold text-gray-900">
            {new Intl.NumberFormat("en-NG", {style: "currency", "currency": "NGN"}).format(amount)}
          </Text>
        </View>

        {/* Date and Status */}
        <View className="flex-row justify-between mt-1">
          <Text className="text-gray-500 text-xs">{date}</Text>
          <Text
            className={`text-xs font-semibold ${
              status === "failed" ? "text-red-500" : "text-green-500"
            }`}
          >
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionHistory;
