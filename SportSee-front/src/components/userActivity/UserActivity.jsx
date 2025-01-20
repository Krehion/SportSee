import "../../style/base/_variables.scss";
import "../../style/components/_user-activity.scss";
import CustomBar from "../customBar/CustomBar";

import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { USER_ACTIVITY } from "../../datas/mockData";

const UserActivity = ({ userId }) => {
	// Get the root CSS variables
	const rootStyles = getComputedStyle(document.documentElement);
	const colorRedDark = rootStyles.getPropertyValue("--red-dark").trim();
	const colorGreyDark = rootStyles.getPropertyValue("--color-grey-dark").trim();

	// Filter the user activity data based on userId
	const userActivity = USER_ACTIVITY.find((activity) => activity.userId === parseInt(userId));

	// Check if user activity exists
	if (!userActivity) {
		return <p>No activity data available for this user.</p>;
	}

	// Extract the sessions array
	const data = userActivity.sessions;

	const CustomLegend = ({ payload }) => {
		return (
			<div
				style={{
					position: "absolute",
					height: "auto",
					right: "10px",
					top: "4px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}>
				{payload.map((entry, index) => (
					<div
						key={`item-${index}`}
						style={{
							display: "flex",
							alignItems: "center",
							marginLeft: "30px"
						}}>
						<div
							style={{
								width: "8px",
								height: "8px",
								backgroundColor: entry.color,
								marginRight: "10px",
								borderRadius: "50%"
							}}></div>
						<span className="activity-chart--legend">{entry.value}</span>
					</div>
				))}
			</div>
		);
	};

	CustomLegend.propTypes = {
		payload: PropTypes.arrayOf(
			PropTypes.shape({
				color: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired
			})
		).isRequired
	};

	return (
		<div className="activity-chart">
			<h2 className="chart-title">Activité quotidienne</h2>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid stroke="#DEDEDE" strokeDasharray="3 3" horizontal={true} vertical={false} />
					<XAxis dataKey="day" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="kilogram" fill={colorGreyDark || "#282d30"} name="Poids (kg)" shape={<CustomBar />} />
					<Bar
						dataKey="calories"
						fill={colorRedDark || "#e60000"}
						name="Calories brûlées (kCal)"
						shape={<CustomBar />}
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
