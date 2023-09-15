import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
const app=initializeApp(firebaseConfig)
const db = getFirestore();

export const deleteTask = async (id) => {
    const taskDetailDoc = doc(db, "taskDetail", id);
    try {
        await deleteDoc(taskDetailDoc);
        return "deleted";
    } catch (error) {
        throw new Error(error.message);
    }
}