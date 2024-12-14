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
import AntDesign from '@expo/vector-icons/AntDesign';
import {Colors} from "@/constants/Colors"

export default function App({modalVisible, setModalVisible, setSelectedPhoneNumber}) {
  const [contacts, setContacts] = useState([]); // Full list of contacts
  const [filteredContacts, setFilteredContacts] = useState([]); // Filtered contacts for search
  //const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(""); // Selected phone number
  //const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  // Fetch contacts
  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync();
      if (data.length > 0) {
        setContacts(data);
        setFilteredContacts(data); // Initially display all contacts
        setModalVisible(true); // Show the modal
      } else {
        Alert.alert("No Contacts", "No contacts were found.");
      }
    } else {
      Alert.alert("Permission Denied", "Access to contacts was denied.");
    }
  };

  // Handle selecting a contact
  const handleSelectContact = (phoneNumber) => {
    setSelectedPhoneNumber(
        phoneNumber.trim()
          .replace(/\s+/g, "")
          .replace(/^\+234/, "0")
        );
    setModalVisible(false); // Close the modal
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  return (
    <>
      <TouchableOpacity
       className="w-[15vw]"
       onPress={fetchContacts}
       >
               <AntDesign name="contacts" size={40} color={Colors.primary.DEFAULT} />
      </TouchableOpacity>

      {/* Modal for Contacts */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Search Box */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search Contacts"
              value={searchQuery}
              onChangeText={handleSearch}
            />

            {/* Contact List */}
            <FlatList
              data={filteredContacts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() =>
                    item.phoneNumbers && item.phoneNumbers.length > 0
                      ? handleSelectContact(item.phoneNumbers[0].number)
                      : Alert.alert("No Phone Number", "This contact has no phone number.")
                  }
                >
                  <Text style={styles.contactName}>{item.name}</Text>
                  {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                    <Text style={styles.contactPhone}>
                      {item.phoneNumbers[0].number}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />

            {/* Close Button */}
            <Button
             title="Close"
             color={Colors.primary.DEFAULT}
             onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </>
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
