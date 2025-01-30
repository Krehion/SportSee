import { useEffect, useState } from "react";
import { getUserActivity } from "../../services/DataService.js";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

import "../../style/base/_variables.scss";
import "../../style/components/_user-activity.scss";

import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

const UserActivity = ({ userId }) => {
	// Get the root CSS variables
	const rootStyles = getComputedStyle(document.documentElement);
	const colorRedDark = rootStyles.getPropertyValue("--red-dark").trim();
	const colorGreyDark = rootStyles.getPropertyValue("--grey-dark").trim();
	const colorGreyLight = rootStyles.getPropertyValue("--grey-light").trim();

	const [userActivity, setUserActivity] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchActivityData = async () => {
			try {
				const activityData = await getUserActivity(userId); // Fetch the data
				setUserActivity(activityData); // Update state with the fetched data
				setError(null); // Clear any previous errors
			} catch (err) {
				console.error("Failed to fetch user activity:", err);
				setError(err.message); // Set the error state
			}
		};

		fetchActivityData();
	}, [userId]); // Ensure `useEffect` runs when `userId` changes

	if (error) {
		return <p>Error loading user activity: {error}</p>;
	}

	if (!userActivity || !userActivity.sessions) {
		return <p>Loading user activity...</p>;
	}

	const data = userActivity.sessions;
	return (
		<div className="activity-chart">
			<h2 className="chart-title">Activité quotidienne</h2>
			<ResponsiveContainer width="100%" height={310}>
				<BarChart
					data={data}
					margin={{ top: 24, right: 30, left: 30, bottom: 20 }}
					barGap={8} // Adjust the space between the bars within a group
				>
					<CartesianGrid stroke="#DEDEDE" strokeDasharray="3 3" horizontal={true} vertical={false} />
					<XAxis
						dataKey="day"
						tickFormatter={(day) => new Date(day).getDate()}
						tick={{ fill: colorGreyLight }}
						tickLine={false}
						stroke="#DEDEDE"
						strokeWidth={2}
						tickMargin={12}
					/>
					<YAxis
						orientation="right"
						tick={{ fill: colorGreyLight }}
						tickLine={false}
						axisLine={false}
						domain={["dataMin", "dataMax"]}
						ticks={(() => {
							// Get the min and max values of the data
							const minValue = Math.min(...data.map((item) => item.kg), ...data.map((item) => item.calories));
							const maxValue = Math.max(...data.map((item) => item.kg), ...data.map((item) => item.calories));

							// Calculate the number of ticks and step size
							const numberOfTicks = 3;
							const step = (maxValue - minValue) / (numberOfTicks - 1);

							// Create an array of ticks at equal intervals
							const ticks = [Math.ceil(minValue - 20)]; // Add the minimum value -20 (for better chart readability), rounded up
							for (let i = 1; i < numberOfTicks - 1; i++) {
								ticks.push(Math.ceil(minValue + step * i)); // Add the interval value(s), rounded up
							}
							ticks.push(Math.ceil(maxValue + 20)); // Add the maximum value +20, rounded up

							return ticks;
						})()}
						tickMargin={16}
					/>
					<Tooltip
						content={<CustomToolTip />}
						cursor={{
							fill: "rgba(196, 196, 196, 0.5)" // hover rectangle color
						}}
					/>
					<Bar dataKey="kg" fill={colorGreyDark} name="Poids (kg)" radius={[4, 4, 0, 0]} barSize={8} />
					<Bar
						dataKey="calories"
						fill={colorRedDark}
						name="Calories brûlées (kCal)"
						radius={[4, 4, 0, 0]}
						barSize={8}
					/>
					<Legend content={(props) => <CustomLegend {...props} />} verticalAlign="top" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

UserActivity.propTypes = {
	userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default UserActivity;
