import "../../style/components/_score.scss";

import PropTypes from "prop-types";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { USER_MAIN_DATA } from "../../datas/mockData";

const Score = ({ userId }) => {
	// Fetch the user's main data
	const userData = USER_MAIN_DATA.find((user) => user.id === parseInt(userId));

	if (!userData) {
		return <p>No score data available for this user.</p>;
	}

	// Extract the user's score or todayScore
	const score = userData.todayScore || userData.score;

	// Format data for the pie chart
	const data = [
		{ name: "Achieved", value: score },
		{ name: "Remaining", value: 1 - score }
	];

	const COLORS = ["#ff0101", "transparent"];

	return (
		<div className="score-chart">
			<h2 className="chart-title">Score</h2>
			<div className="score-center">
				<p className="score-percentage">{`${Math.round(score * 100)}%`}</p>
				<p className="score-label">
					de votre
					<br />
					objectif
				</p>
			</div>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={90}
						outerRadius={100}
						startAngle={90}
						endAngle={450}
						paddingAngle={5}
						cornerRadius={10}>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index]} stroke={COLORS[index]} />
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

Score.propTypes = {
	userId: PropTypes.number.isRequired
};

export default Score;
