import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getUserMainData } from "../../services/DataService.js";

import "../../style/components/_score.scss";

const Score = ({ userId }) => {
	// State variables
	const [score, setScore] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch user data from API
	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getUserMainData(userId);
				if (!userData) {
					throw new Error("Aucune donnée de score trouvée.");
				}

				// Extract score value (API may return `todayScore` or `score`)
				const userScore = userData.todayScore || userData.score;
				if (userScore === undefined) {
					throw new Error("Format de score invalide.");
				}

				setScore(userScore);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [userId]);

	// Handle loading and error states
	if (loading) return <p>Chargement des données...</p>;
	if (error) return <p>{error}</p>;

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
