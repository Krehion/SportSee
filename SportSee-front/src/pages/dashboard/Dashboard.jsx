import "../../style/layout/_dashboard.scss";

import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import UserActivity from "../../components/userActivity/UserActivity";
import SessionLength from "../../components/sessionLength/SessionLength";
import ActivityType from "../../components/activityType/ActivityType";
import Score from "../../components/score/Score";
import SpentEnergy from "../../components/spentEnergy/SpentEnergy.jsx";

import caloriesIcon from "../../assets/icon-calories.svg";
import proteinIcon from "../../assets/icon-protein.svg";
import carbsIcon from "../../assets/icon-carbs.svg";
import fatIcon from "../../assets/icon-fat.svg";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getUserMainData } from "../../services/DataService.js";

const Dashboard = () => {
	const { id } = useParams(); // get ID from URL
	const numericUserId = parseInt(id, 10); // Convert string to number
	const { setUserId } = useUser();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// update context to store ID
	useEffect(() => {
		setUserId(numericUserId);

		const fetchData = async () => {
			try {
				const userData = await getUserMainData(id);
				setUser(userData);
			} catch (err) {
				setError("Failed to load user data.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id, numericUserId, setUserId]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = user.keyData;
	// changer : reconstituer un tableau et passer la variable au composant (prendre exemple sidebar)

	return (
		<div className="dashboard">
			<Header />
			<div className="dashboard--content">
				<Sidebar />
				<main className="dashboard--content--main">
					<div className="dashboard--content--main--greetings">
						<p className="dashboard--content--main--greetings__hello">
							Bonjour <span className="primary-color">{user.userInfos.firstName}</span>
						</p>
						<p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
					</div>
					<div className="dashboard--content--main--charts">
						<div className="dashboard--content--main--charts__left-col">
							<UserActivity userId={numericUserId} />
							<div className="dashboard--content--main--charts--small-charts">
								<SessionLength userId={numericUserId} />
								<ActivityType userId={numericUserId} />
								<Score userId={numericUserId} />
							</div>
						</div>
						<div className="dashboard--content--main--charts__right-col">
							<SpentEnergy
								icon={caloriesIcon}
								number={calorieCount.toLocaleString("fr-FR")}
								unit="kCal"
								name="Calories"
							/>
							<SpentEnergy icon={proteinIcon} number={proteinCount} unit="g" name="Protéines" />
							<SpentEnergy icon={carbsIcon} number={carbohydrateCount} unit="g" name="Glucides" />
							<SpentEnergy icon={fatIcon} number={lipidCount} unit="g" name="Lipides" />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
