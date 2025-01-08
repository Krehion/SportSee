import { USER_MAIN_DATA } from "../../datas/mockData.js";

import "../../style/layout/_dashboard.scss";

import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import UserActivity from "../../components/userActivity/UserActivity";
import SessionLength from "../../components/sessionLength/SessionLength";
import ActivityType from "../../components/activityType/ActivityType";

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

	const user = USER_MAIN_DATA.find((user) => user.id === parseInt(id));

	return (
		<div className="dashboard">
			<Header />
			<div className="dashboard--content">
				<Sidebar />
				<main className="dashboard--content--main">
					<p className="dashboard--content--main--greetings">
						Bonjour <span className="primary-color">{user.userInfos.firstName}</span>
					</p>
					<p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>

					<UserActivity userId={id} />
					<SessionLength userId={id} />
					<ActivityType userId={id} />
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
