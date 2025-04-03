import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useBookmarks } from "../context/BookmarkContext";
import { 
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, 
  StyleSheet, Linking 
} from "react-native";
// import { Job } from "../context/BookmarkContext";

const API_URL = "https://testapi.getlokalapp.com/common/jobs?page=";

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
  whatsapp_link?: string; // this is added neww 
  updated_on?: string;
}

// ✅ Extract WhatsApp Link from contact_preference
const processJobData = (data: any[]): Job[] => {
  return data.map((job) => {
    const whatsappLink =
      Array.isArray(job.contact_preference) // ✅ Ensure it's an array
        ? job.contact_preference.find((c: any) => c.type === "whatsapp_link")?.value
        : undefined;

    return {
      ...job,
      whatsapp_link: whatsappLink || undefined, // ✅ Extract only the value safely
    };
  });
};


const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { bookmarks, toggleBookmark } = useBookmarks(); // ✅ Use global bookmarks

  // ✅ Fetch jobs
  const fetchJobs = async (pageNum: number) => {
    try {
      const response = await fetch(`${API_URL}${pageNum}`);
      const data = await response.json();
      if (data?.results) {
        setJobs((prev) => (pageNum === 1 ? processJobData(data.results) : [...prev, ...processJobData(data.results)]));
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);

  // ✅ Load more jobs on scroll
  const loadMoreJobs = () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPage((prev) => {
        const nextPage = prev + 1;
        fetchJobs(nextPage);
        return nextPage;
      });
    }
  };

   // ✅ Open WhatsApp Chat
   const openWhatsApp = (number: string) => {
    const url = `https://wa.me/${number}`;
    Linking.openURL(url).catch(() => alert("Could not open WhatsApp"));
  };

  // ✅ Open WhatsApp Group
  const openWhatsAppGroup = (link: string) => {
    Linking.openURL(link).catch(() => alert("Could not open WhatsApp group"));
  };


  // ✅ Render each job item
  const renderItem = ({ item }: { item: Job }) => {
    const isBookmarked = bookmarks.some((job) => job.id === item.id);
    
    return (
      <View style={styles.jobCard}>
        {/* Bookmark Button */}
        <TouchableOpacity onPress={() => toggleBookmark(item)} style={styles.bookmarkButton}>
          <Ionicons 
            name={isBookmarked ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={isBookmarked ? "#FFD700" : "#000"} 
          />
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

        {/* Updated On */}
        <Text style={styles.updatedOn}>🕒 {item?.updated_on || "N/A"}</Text>

        {/* Contact Info */}
        <View style={styles.container}>
          {item?.whatsapp_no && (
            <TouchableOpacity style={styles.whatsappButton} onPress={() => openWhatsApp(item.whatsapp_no!)}>
              <Text style={styles.buttonText}>📞 Contact HR</Text>
            </TouchableOpacity>
          )}
          {item?.whatsapp_link && (
            <TouchableOpacity style={styles.groupButton} onPress={() => openWhatsAppGroup(item.whatsapp_link!)}>
              <Text style={styles.buttonText}>🔗 Join WhatsApp Group</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, Job Seeker!</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={renderItem}
          onEndReached={loadMoreJobs}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#007AFF" /> : null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", paddingHorizontal: 15 },
  greeting: { fontSize: 24, fontWeight: "bold", color: "#333", marginVertical: 20 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  contactInfo: { fontSize: 12, color: "#007AFF", marginTop: 5 },
  bookmarkButton: { position: "absolute", top: 10, right: 10, zIndex: 1 },
  whatsappButton: { backgroundColor: "#25D366", padding: 10, borderRadius: 5, flex: 1, alignItems: "center", marginRight: 5 },
  groupButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5, flex: 1, alignItems: "center", marginLeft: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default JobList;
