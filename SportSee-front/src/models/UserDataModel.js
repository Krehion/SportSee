class UserDataModel {
	constructor(data) {
		this.id = data.id;
		this.userInfos = {
			firstName: data.userInfos.firstName,
			lastName: data.userInfos.lastName,
			age: data.userInfos.age
		};
		this.score = data.todayScore || data.score; // Handle different API formats
		this.keyData = {
			calories: data.keyData.calorieCount,
			protein: data.keyData.proteinCount,
			carbs: data.keyData.carbohydrateCount,
			fat: data.keyData.lipidCount
		};
	}
}

export default UserDataModel;
