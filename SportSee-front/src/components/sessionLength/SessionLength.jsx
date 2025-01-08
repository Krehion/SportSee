import "../../style/components/_session-length.scss";

import PropTypes from "prop-types";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { USER_AVERAGE_SESSIONS } from "../../datas/mockData";

const SessionLength = ({ userId }) => {
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

	// Find the user's session data
	const userSessions = USER_AVERAGE_SESSIONS.find((session) => session.userId === parseInt(userId));

	if (!userSessions) {
		return <p>No session data available for this user.</p>;
	}

	// Map sessions data to include the weekday abbreviation
	const data = userSessions.sessions.map((session) => ({
		...session,
		weekday: dayToWeekday[session.day]
	}));

	return (
		<div className="session-length-chart">
			<h2>Durée moyenne des sessions</h2>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<XAxis dataKey="weekday" tick={{ fontSize: 12 }} />
					<YAxis dataKey="sessionLength" />
					<Tooltip />
					<Line type="monotone" dataKey="sessionLength" stroke="#ffffff" strokeWidth={2} dot={false} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

SessionLength.propTypes = {
	userId: PropTypes.number.isRequired
};

export default SessionLength;
