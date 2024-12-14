import React, { useState } from "react";
import {
  View,
  Button,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import * as Contacts from "expo-contacts";
import Contact from "@/components/contact"

export default function App() {

  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");

  return (
    <View style={styles.container}>
      {/* Form Field */}
      <TextInput
        style={styles.textInput}
        placeholder="Selected Phone Number"
        value={selectedPhoneNumber}
        editable={false}
      />

      <Contact
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      selectedPhoneNumber={setSelectedPhoneNumber}
      setSelectedPhoneNumber={setSelectedPhoneNumber}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactPhone: {
    fontSize: 14,
    color: "gray",
  },
});
