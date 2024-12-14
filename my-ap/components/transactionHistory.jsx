import React from "react";
import { View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TransactionHistory = ({ date, status, amount, description, type }) => {
  return (
    <View className="flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      {/* Icon Container */}
      <View
        className="w-12 h-12 items-center justify-center rounded-full"
        style={{
          backgroundColor: type === "credit" ? Colors.success.light : Colors.primary.light,
        }}
      >
        <MaterialCommunityIcons
          name={type === "credit" ? "arrow-down-thin" : "arrow-up-thin"}
          size={24}
          color={type === "credit" ? Colors.success.DEFAULT : Colors.primary.DEFAULT}
        />
      </View>

      {/* Transaction Details */}
      <View className="flex-1">
        {/* Description and Amount */}
        <View className="flex-row justify-between">
          <Text className="text-gray-800 font-medium" numberOfLines={1}>
            {description || "Electricity"}
          </Text>
          <Text className="font-semibold text-gray-900">
            {amount || "-3,000.00"}
          </Text>
        </View>

        {/* Date and Status */}
        <View className="flex-row justify-between mt-1">
          <Text className="text-gray-500 text-xs">{date || "Nov 29th, 09:41:52"}</Text>
          <Text
            className={`text-xs font-semibold ${
              status === "failed" ? "text-red-500" : "text-green-500"
            }`}
          >
            {status || "Success"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionHistory;
