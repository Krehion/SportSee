import "../../style/components/_activity-type.scss";

import PropTypes from "prop-types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { USER_PERFORMANCE } from "../../datas/mockData";

const ActivityType = ({ userId }) => {
	// Map kind id to corresponding activity labels
	const kindToLabel = {
		1: "Cardio",
		2: "Énergie",
		3: "Endurance",
		4: "Force",
		5: "Vitesse",
		6: "Intensité"
	};

	const rootStyles = getComputedStyle(document.documentElement);
	const colorRed = rootStyles.getPropertyValue("--color-primary").trim();

	// Find the user's performance data
	const userPerformance = USER_PERFORMANCE.find((performance) => performance.userId === parseInt(userId));

	if (!userPerformance) {
		return <p>No performance data available for this user.</p>;
	}

	// Map data to include activity labels
	const data = userPerformance.data.map((item) => ({
		...item,
		activity: kindToLabel[item.kind]
	}));

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
