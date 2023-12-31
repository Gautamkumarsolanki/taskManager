import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Board from '../components/Board'
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import Loading from '../components/Loading';
const db = getFirestore();
const auth = getAuth();
export default function Home({ setUser, user }) {

	const [loading, setLoading] = useState(true);
	const [allTask, setAllTask] = useState(null);

	const logout = () => {
		signOut(auth)
			.then(() => {
				setAllTask(null);
				setUser(null);
			})
			.catch((error) => {
				window.alert(error.message);
			})
	}

	useEffect(() => {
		let initialSnapshot = true;
		if (user[auth.currentUser.email]) {
			onSnapshot(user[auth.currentUser.email] === "member" ? query(collection(db, "taskDetail"), where("assignedTo", '==', auth.currentUser.email)) : collection(db, "taskDetail"), (querySnapshot) => {
				const updatedTask = [];
				querySnapshot.docs.forEach((ele) => {
					updatedTask.push(ele.data());
				})
				setAllTask(updatedTask);
				setLoading(false);
			})
			onSnapshot(user[auth.currentUser.email] === "member" ? query(collection(db, "taskDetail"), where("assignedTo", '==', auth.currentUser.email)) : collection(db, "taskDetail"), (querySnapshot) => {
				if (initialSnapshot) {
					initialSnapshot = false;
					return;
				}
				querySnapshot.docChanges().forEach((change) => {
					if (change.type === 'added') {
						window.alert(`New Task ${change.doc.get("title")} added`);
					}
					else if (change.type === 'modified') {
						window.alert(`Task ${change.doc.get("title")} updated`);
					}
					else if (change.type === 'removed') {
						window.alert(`Task ${change.doc.get("title")} deleted`);
					}
				})
			})
		}

	}, [])
	return (
		<div className='flex flex-col w-screen h-screen overflow-auto bg-blue-200'>
			<Navbar logout={logout} />
			{loading ? <Loading /> :
				<Board user={user} allTask={allTask} />
			}
		</div>
	)
}
