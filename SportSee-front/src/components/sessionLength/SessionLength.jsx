import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from "recharts";
import { getUserAverageSessions } from "../../services/DataService.js";

import "../../style/components/_session-length.scss";
import "../../style/base/_base.scss";

import CustomToolTip from "./CustomToolTip";

// Function to convert hex color to rgba with transparency
const hexToRgba = (hex, alpha) => {
	if (!hex) return "";
	hex = hex.replace("#", ""); // Remove "#" if present
	const bigint = parseInt(hex, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SessionLength = ({ userId }) => {
	// Get the root CSS variables
	const rootStyles = getComputedStyle(document.documentElement);
	const colorRedDark = rootStyles.getPropertyValue("--red-dark").trim();

	// State variables
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch user session data
	useEffect(() => {
		// Map day number to the corresponding weekday
		const dayToWeekday = {
			1: "L",
			2: "M",
			3: "M",
			4: "J",
			5: "V",
			6: "S",
			7: "D"
		};

		const fetchData = async () => {
			try {
				const userSessions = await getUserAverageSessions(userId);
				if (!userSessions || !userSessions.sessions) {
					throw new Error("Aucune donnée de session trouvée.");
				}

				// Map sessions data to include weekday abbreviations
				const formattedData = [
					{ weekday: "", sessionLength: 0 }, // Placeholder at the start
					...userSessions.sessions.map((session) => ({
						...session,
						weekday: dayToWeekday[session.day]
					})),
					{ weekday: "", sessionLength: 0 } // Placeholder at the end
				];

				setData(formattedData);
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

	// Custom cursor component to highlight the right side
	const CustomCursor = ({ points, width, height }) => {
		if (!points || points.length === 0) return null;
		const { x } = points[0]; // Get the x-coordinate of the hovered point
		const rightMargin = 20;

		return (
			<Rectangle x={x} y={0} width={width - x + rightMargin} height={height * 2} fill={hexToRgba(colorRedDark, 0.5)} />
		);
	};

	CustomCursor.propTypes = {
		points: PropTypes.arrayOf(PropTypes.object),
		width: PropTypes.number,
		height: PropTypes.number,
		stroke: PropTypes.string
	};

	return (
		<div className="session-length-chart">
			<h2 className="chart-title">
				<span className="white-color">Durée moyenne des sessions</span>
			</h2>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={data} margin={{ top: 24, right: -20, left: -20, bottom: 5 }}>
					<Tooltip content={<CustomToolTip />} cursor={<CustomCursor />} />
					<Line
						type="natural"
						dataKey="sessionLength"
						stroke="url(#colorUv)"
						strokeWidth={3}
						activeDot={{
							stroke: "#ffffff",
							strokeWidth: 4,
							r: 2
						}}
						dot={false}
					/>
					<XAxis
						dataKey="weekday"
						tick={{ fontSize: "0.75rem", fontWeight: 500, fill: "#ffffff" }}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis hide domain={["dataMin-10", "dataMax+10"]} />
					<defs>
						<linearGradient id="colorUv" x1="0%" y1="0" x2="100%" y2="0">
							<stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
							<stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
						</linearGradient>
					</defs>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

SessionLength.propTypes = {
	userId: PropTypes.number.isRequired
};

export default SessionLength;
