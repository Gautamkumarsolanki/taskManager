import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
const app=initializeApp(firebaseConfig)
const db = getFirestore();

export const updateTask=async (data,id)=>{
    const taskDetailDoc = doc(db, "taskDetail", id);
    console.log(data);
    try {
        await updateDoc(taskDetailDoc, {
            ...data
        },{merge:true})
        return "Done";
    } catch (error) {
        throw new Error(error.message);
    }
}
export const addComment=async (data,id)=>{
    const taskDetailDoc = doc(db, "taskDetail", id);
    console.log(data);
    try {
        await updateDoc(taskDetailDoc, {
            ["comment"]:arrayUnion(data)
        },{merge:true})
        return "Done";
    } catch (error) {
        throw new Error(error.message);
    }
}