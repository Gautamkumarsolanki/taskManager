import { Route, Routes } from "react-router-dom";
import Protector from "./components/Protector";
import About from "./components/About";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import Reset from "./pages/Reset";
import Login from "./pages/Login";

const auth = getAuth();
const db = getFirestore();
export function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const getUser = async () => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const res = await getDoc(doc(db, "users", "oJtV5fLKpNSqlQ9ThiJ8"));
				if (res.exists()) {
					setUser(res.data().users);
					setLoading(false);

				}
			} else {
				setLoading(false);
			}
		})
	}
	console.log("da");
	useEffect(() => {
		getUser();
	}, []);
	useEffect(() => {
		if (user) {
			setLoading(false);
		}
	}, [user]);
	if (loading) {
		return <Loading />;
	}
	return (
		<Routes>
			<Route path="/" element={<Protector user={user} />}>
				<Route index element={<Home setUser={setUser} user={user} />} />
				<Route path="about" element={<About />} />
			</Route>
			<Route path="login" element={<Login setLoading={setLoading} islogin={true} user={user} setUser={setUser} />} />
			<Route path="signup" element={<Login setLoading={setLoading} islogin={false} user={user} setUser={setUser} />} />
			<Route path="reset" element={<Reset />} />
		</Routes>
	);
}

export default App;
