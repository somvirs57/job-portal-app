import firebase from "./firebase";
import "firebase/compat/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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

export const getJobById = async (id) => {
  const db = firebase.firestore();
  const docRef = doc(db, "jobs", id);
  const docSnap = await getDoc(docRef);
  return docSnap;
};

export const updateJobById = async (id, data) => {
  const db = firebase.firestore();
  const docRef = doc(db, "jobs", id);
  await updateDoc(docRef, data);
};
