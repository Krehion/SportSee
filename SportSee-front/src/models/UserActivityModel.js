class UserActivityModel {
	constructor(data) {
		this.userId = data.userId;
		this.sessions = data.sessions.map((session) => ({
			day: session.day,
			kg: session.kilogram,
			calories: session.calories
		}));
	}
}

export default UserActivityModel;
