class UserPerformanceModel {
	constructor(data) {
		this.userId = data.userId;
		this.kind = data.kind;
		this.data = data.data.map((item) => ({
			value: item.value,
			kind: item.kind
		}));
	}
}

export default UserPerformanceModel;
