import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig)
const db = getFirestore();

export const addTask = async (data) => {
    const docRef = doc(collection(db, "taskDetail"));
    try {
        await setDoc(docRef, {
            ...data, id: docRef.id, comment: []
        });
        return docRef.id;
    } catch (error) {
        throw new Error(error.message);
    }
}