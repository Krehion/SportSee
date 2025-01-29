import { useState, useEffect } from "react";
import { getUserPerformance } from "../../services/DataService.js";
import PropTypes from "prop-types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

import "../../style/components/_activity-type.scss";

const ActivityType = ({ userId }) => {
	// Get the root CSS variables
	const rootStyles = getComputedStyle(document.documentElement);
	const colorRed = rootStyles.getPropertyValue("--color-primary").trim();

	// States to store data, loading and errors
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Find the user's performance data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const userPerformance = await getUserPerformance(userId);
				if (!userPerformance || !userPerformance.data) {
					throw new Error("Aucune donnée de performance trouvée.");
				}

				// Map kind IDs to activity labels
				const kindToLabel = {
					1: "Cardio",
					2: "Énergie",
					3: "Endurance",
					4: "Force",
					5: "Vitesse",
					6: "Intensité"
				};

				const formattedData = userPerformance.data.map((item) => ({
					...item,
					activity: kindToLabel[item.kind]
				}));

				setData(formattedData);
			} catch (err) {
				console.error("Error fetching performance data:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [userId]);
	if (loading) return <p>Chargement des données...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className="activity-type-chart">
			<ResponsiveContainer width="95%" height="95%">
				<RadarChart outerRadius="70%" data={data}>
					<PolarGrid gridType="polygon" radialLines={false} stroke="#ffffff" />
					<PolarAngleAxis dataKey="activity" tick={{ fontSize: 12, fill: "#ffffff" }} />
					<Radar name="Performance" dataKey="value" fill={colorRed} fillOpacity={0.7} />
				</RadarChart>
			</ResponsiveContainer>
		</div>
	);
};

ActivityType.propTypes = {
	userId: PropTypes.number.isRequired
};

export default ActivityType;
