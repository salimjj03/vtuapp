import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, Dimensions } from "react-native";

const SlidingText = ({message, textStyle}) => {
  const screenWidth = Dimensions.get("window").width;
  const translateX = useRef(new Animated.Value(screenWidth)).current;
  const [textWidth, setTextWidth] = useState(0); // Store the actual text width

  useEffect(() => {
    if (textWidth > 0) {
      Animated.loop(
        Animated.timing(translateX, {
          toValue: -textWidth, // Move the text completely out of view
          duration: 20000, // Adjust duration for smooth scrolling
          useNativeDriver: true,
        })
      ).start();
    }
  }, [textWidth]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textWrapper, { transform: [{ translateX }] }]}>
        <Text
          className={`text-nowrap overflow-hidden w-[1000] ${textStyle}`}
          numberOfLines={1}
          onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)} // Measure text width
        >
        { message }
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#f5f5f5",
    overflow: "hidden", // Clip text outside the screen
    borderRadius: 15,
    margin: 2
  },
  textWrapper: {
   // position: "absolute",
    flexDirection: "row", // Ensure single-line layout
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flexShrink: 0, // Prevent text from shrinking or wrapping
  },
});

export default SlidingText;
