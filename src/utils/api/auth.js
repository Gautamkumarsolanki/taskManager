import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig)

const db = getFirestore();
const auth = getAuth(app);
export const login = (result) => {
    return new Promise(async (resolve, reject) => {
        const docRef = doc(db, "users", "oJtV5fLKpNSqlQ9ThiJ8");
        try {
            const res = await getDoc(docRef);
            if (res.data().users[auth.currentUser.email]) {
                resolve(res.data().users);
            }
            else {
                await setDoc(docRef, {
                    users: { ...res.data().users, [auth.currentUser.email]: "member" }
                }, { merge: true });
                resolve({ ...res.data().users, [auth.currentUser.email]: "member" });
            }
        } catch (error) {
            reject(error.message);
        }
    })
}
export const signUpWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const docRef = doc(db, "users", "oJtV5fLKpNSqlQ9ThiJ8");
                try {
                    const res = await getDoc(docRef);
                    if (res.data().users[email]) {
                        return res.data().users;
                    } else {
                        await setDoc(docRef, {
                            users: { ...res.data().users, [user.email]: "member" }
                        }, { merge: true });
                        resolve({ ...res.data().users, [user.email]: "member" });
                    }
                } catch (error) {
                    throw new Error(error.message);
                }
            })
            .catch((error) => {
                reject(error.message);
            });
    })
}

export const loginWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const docRef = doc(db, "users", "oJtV5fLKpNSqlQ9ThiJ8");
                try {
                    const res = await getDoc(docRef);
                    if (res.data().users[email]) {
                        return res.data().users;
                    } else {
                        await setDoc(docRef, {
                            users: { ...res.data().users, [user.email]: "member" }
                        }, { merge: true });
                        resolve({ ...res.data().users, [user.email]: "member" });
                    }
                } catch (error) {
                    throw new Error(error.message);
                }
            })
            .catch((error) => {
                reject(error.message);
            });
    })
}

export const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            return "ok";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}