import firebase from "./firebase";
import "firebase/compat/firestore";

export const getAllJobs = async () => {
  const db = firebase.firestore();
  const dataRef = db.collection("jobs");
  const snapshot = await dataRef.get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
};

export const postJob = async (jobData) => {
  const db = firebase.firestore();
  const dataRef = db.collection("jobs");
  await dataRef.add(jobData);
};
