import Header from "../../components/header/Header";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";

const Dashboard = () => {
	const { id } = useParams(); // get ID from URL
	const { setUserId } = useUser();
	// update context to store ID
	useEffect(() => {
		setUserId(id);
	}, [id, setUserId]);

	return (
		<div>
			<Header />
			<h1>Dashboard for User {id}</h1>
		</div>
	);
};

export default Dashboard;
