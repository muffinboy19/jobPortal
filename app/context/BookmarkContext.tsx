import React, { createContext, useContext, useState } from "react";

// Job type definition
// Job type definition
export type Job = {
  id: number; // ✅ Ensuring each job has a unique ID
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
  whatsapp_link?: string; // ✅ Added this to match the JobList.tsx structure
  updated_on?: string;
};


// Context type
type BookmarkContextType = {
  bookmarks: Job[];
  toggleBookmark: (job: Job) => void;
};

// Create context
const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

// Hook to use the bookmark context
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};

// Provider component
export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Job[]>([]);

  const toggleBookmark = (job: Job) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.some((b) => b.id === job.id)
        ? prevBookmarks.filter((b) => b.id !== job.id) // ✅ Remove using ID
        : [...prevBookmarks, job] // ✅ Add
    );
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
