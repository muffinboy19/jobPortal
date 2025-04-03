import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/tabs/job" />; // Redirect to the job page
}