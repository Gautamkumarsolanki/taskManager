import { getFirestore, collection, query, where, getDocs} from 'firebase/firestore';
import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const app=initializeApp(firebaseConfig)
const db = getFirestore();
const auth=getAuth();

export const getAllTask=async (position="member")=>{
    const q=query(collection(db,"taskDetail"),where("assignedTo",'==',auth.currentUser.email));
    try {
        const tasks=[]
        const querySnapshot=await getDocs(q);
        querySnapshot.docs.forEach((doc)=>{
            tasks.push(doc.data());
        })
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}