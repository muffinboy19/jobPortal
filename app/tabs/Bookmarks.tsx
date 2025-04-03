import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBookmarks } from "../context/BookmarkContext"; // ✅ Import global bookmarks

// Define the Job type
interface Job {
  id: number;
  title?: string;
  company_name?: string;
  place?: string;
  salary?: string;
  job_type?: string;
  experience?: string;
  qualification?: string;
  vacancies?: string;
  shift_timing?: string;
  locality?: string;
  job_role_id?: number;
  whatsapp_no?: string;
  contact_link?: string;
  whatsapp_link?: string;
  updated_on?: string;
}

const Bookmarks = () => {
  const { bookmarks, toggleBookmark } = useBookmarks(); // ✅ Use global bookmarks

  const renderItem = ({ item }: { item: Job }) => (
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

      {/* Experience & Qualification */}
      <View style={styles.row}>
        <Text style={styles.experience}>🛠 {item?.experience || "N/A"} Exp</Text>
        <Text style={styles.qualification}>🎓 {item?.qualification || "N/A"}</Text>
      </View>

      {/* Vacancies & Shift Timing */}
      <View style={styles.row}>
        <Text style={styles.vacancies}>👥 {item?.vacancies || "N/A"} Vacancies</Text>
        <Text style={styles.shiftTiming}>⏳ {item?.shift_timing || "N/A"}</Text>
      </View>

      {/* Locality */}
      <Text style={styles.locality}>📍 {item?.locality || "N/A"}</Text>

      {/* Contact Links */}
      {item?.whatsapp_link && (
        <TouchableOpacity onPress={() => Linking.openURL(item.whatsapp_link)}>
          <Text style={styles.link}>📲 WhatsApp</Text>
        </TouchableOpacity>
      )}
      {item?.contact_link && (
        <TouchableOpacity onPress={() => Linking.openURL(item.contact_link)}>
          <Text style={styles.link}>🔗 Apply Here</Text>
        </TouchableOpacity>
      )}

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
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
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
  experience: { fontSize: 14, fontWeight: "bold", color: "#E67E22" },
  qualification: { fontSize: 14, fontWeight: "bold", color: "#8E44AD" },
  vacancies: { fontSize: 14, fontWeight: "bold", color: "#C0392B" },
  shiftTiming: { fontSize: 14, fontWeight: "bold", color: "#2980B9" },
  locality: { fontSize: 14, fontWeight: "bold", color: "#2C3E50", marginTop: 5 },
  updatedOn: { fontSize: 12, color: "#888", marginTop: 5 },
  link: { fontSize: 14, fontWeight: "bold", color: "#007BFF", marginTop: 5 },
  bookmarkButton: { position: "absolute", top: 10, right: 10, zIndex: 1 },
});

export default Bookmarks;
