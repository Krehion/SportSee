const useMockData = true; // Toggle this to switch between API and mock data

// Fetch mock data from public folder
const fetchMockData = async () => {
	try {
		const response = await fetch("/SportSee/mockData.json");
		if (!response.ok) throw new Error("Failed to load mock data");
		const data = await response.json();
		console.log("Mock data loaded:", data); // Debugging
		return data;
	} catch (error) {
		console.error("Error fetching mock data:", error);
		return null; // Return null instead of undefined
	}
};

// Models
import UserDataModel from "../models/UserDataModel";
import UserActivityModel from "../models/UserActivityModel";
import UserAverageSessionsModel from "../models/UserAverageSessionsModel";
import UserPerformanceModel from "../models/UserPerformanceModel";

// API URLs
const ApiBaseUrl = "http://localhost:3000";

// Fetch data from API
const fetchData = async (endpoint) => {
	const response = await fetch(`${ApiBaseUrl}${endpoint}`);
	if (!response.ok) {
		throw new Error(`Error fetching data from ${endpoint}`);
	}
	return response.json();
};

// Fetch all mock data once and filter inside functions
let mockDataCache = null;
const getMockData = async () => {
	if (!mockDataCache) {
		mockDataCache = await fetchMockData();
	}
	return mockDataCache;
};

// Service functions
export const getUserMainData = async (userId) => {
	if (useMockData) {
		const mockData = await getMockData();
		console.log("Mock data loaded:", mockData); // ✅ Check if mockData is loaded

		if (!mockData || !mockData.USER_MAIN_DATA) {
			console.error("Mock data is null or undefined!");
			return null;
		}
		const rawData = mockData?.USER_MAIN_DATA.find((user) => user.id === parseInt(userId, 10));
		console.log("Found user data:", rawData); // ✅ Check if a user is found

		if (!rawData) {
			console.error(`❌ ERROR: No user found for ID ${userId}`);
			return null;
		}

		return new UserDataModel(rawData);
	}
	try {
		const response = await fetchData(`/user/${userId}`);
		return new UserDataModel(response.data);
	} catch (error) {
		console.error(`Error fetching user activity for userId ${userId}:`, error);
		throw error;
	}
};

export const getUserActivity = async (userId) => {
	if (useMockData) {
		const mockData = await getMockData();
		if (!mockData || !mockData.USER_ACTIVITY) {
			console.error("Mock data is null or undefined!");
			return null;
		}
		const rawData = mockData?.USER_ACTIVITY.find((user) => user.userId === parseInt(userId, 10));
		return rawData ? new UserActivityModel(rawData) : null;
	}
	try {
		const response = await fetchData(`/user/${userId}/activity`);
		return new UserActivityModel(response.data);
	} catch (error) {
		console.error(`Error fetching user activity for userId ${userId}:`, error);
		throw error;
	}
};

export const getUserAverageSessions = async (userId) => {
	if (useMockData) {
		const mockData = await getMockData();
		if (!mockData || !mockData.USER_AVERAGE_SESSIONS) {
			console.error("Mock data is null or undefined!");
			return null;
		}
		const rawData = mockData?.USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId, 10));
		return rawData ? new UserAverageSessionsModel(rawData) : null;
	}

	try {
		const response = await fetchData(`/user/${userId}/average-sessions`);
		return new UserAverageSessionsModel(response.data);
	} catch (error) {
		console.error(`Error fetching user average sessions for userId ${userId}:`, error);
		throw error;
	}
};

export const getUserPerformance = async (userId) => {
	if (useMockData) {
		const mockData = await getMockData();
		if (!mockData || !mockData.USER_PERFORMANCE) {
			console.error("Mock data is null or undefined!");
			return null;
		}
		const rawData = mockData?.USER_PERFORMANCE.find((user) => user.userId === parseInt(userId, 10));
		return rawData ? new UserPerformanceModel(rawData) : null;
	}
	try {
		const response = await fetchData(`/user/${userId}/performance`);
		return new UserPerformanceModel(response.data);
	} catch (error) {
		console.error(`Error fetching user average sessions for userId ${userId}:`, error);
		throw error;
	}
};
