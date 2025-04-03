import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBookmarks } from "../context/BookmarkContext"; // ✅ Import global bookmarks

// Define the Bookmark type
type Bookmark = {
  title: string;
  company_name: string;
  place: string;
  salary: string;
  job_type: string;
  updated_on: string;
};

const BookmarkScreen = () => {
  const { bookmarks, toggleBookmark } = useBookmarks(); // ✅ Use global bookmarks

  const renderItem = ({ item }: { item: Bookmark }) => (
    <View style={styles.jobCard}>
      {/* Remove Bookmark Button */}
      <TouchableOpacity onPress={() => toggleBookmark(item)} style={styles.bookmarkButton}>
        <Ionicons name="bookmark" size={24} color="#FFD700" />
      </TouchableOpacity>
  
      {/* Job Title */}
      <Text style={styles.title}>{item?.title || "N/A"}</Text>
  
      {/* Company & Location */}
      <View style={styles.row}>
        <Text style={styles.company}>{item?.company_name || "N/A"}</Text>
        <Text style={styles.location}>{item?.place || "N/A"}</Text>
      </View>
  
      {/* Salary & Job Type */}
      <View style={styles.row}>
        <Text style={styles.salary}>💰 {item?.salary || "N/A"}</Text>
        <Text style={styles.jobType}>📌 {item?.job_type || "N/A"}</Text>
      </View>
  
      {/* Updated On */}
      <Text style={styles.updatedOn}>🕒 {item?.updated_on || "N/A"}</Text>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📌 Bookmarked Jobs</Text>

      {bookmarks.length === 0 ? (
        <Text style={styles.noBookmarkText}>No bookmarks yet!</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item, index) => item.title ? item.title : index.toString()}
          renderItem={({ item }) => (
            <View style={styles.jobCard}>
              <TouchableOpacity onPress={() => toggleBookmark(item)} style={styles.bookmarkButton}>
                <Ionicons name="bookmark" size={24} color="#FFD700" />
              </TouchableOpacity>

              <Text style={styles.title}>{item?.title || "N/A"}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", paddingHorizontal: 15 },
  header: { fontSize: 22, fontWeight: "bold", marginVertical: 15 },
  noBookmarkText: { textAlign: "center", fontSize: 16, marginTop: 20 },
  jobCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#000", marginBottom: 5 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  company: { fontSize: 14, fontWeight: "bold", color: "#333" },
  location: { fontSize: 14, color: "#666" },
  salary: { fontSize: 14, fontWeight: "bold", color: "#28A745" },
  jobType: { fontSize: 14, fontWeight: "bold", color: "#17A2B8" },
  updatedOn: { fontSize: 12, color: "#888", marginTop: 5 },
  bookmarkButton: { position: "absolute", top: 10, right: 10, zIndex: 1 },
});

export default BookmarkScreen;
