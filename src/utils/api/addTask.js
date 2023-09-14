import { getFirestore, doc, updateDoc, setDoc, arrayUnion, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const app=initializeApp(firebaseConfig)
const db = getFirestore();
const auth=getAuth();

export const addTask = async (data) => {
    const docRef = doc(collection(db, "taskDetail"));
    try {
        await setDoc(docRef,{
            ...data,id:docRef.id,comment:[]
        });
        return docRef.id;
    } catch (error) {
        throw new Error(error.message);
    }
}