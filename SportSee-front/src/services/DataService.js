const useMockData = true; // Toggle this to switch between API and mock data

// Mocked data
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from "../datas/mockData";

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

// Service functions
export const getUserMainData = async (userId) => {
	if (useMockData) {
		const rawData = USER_MAIN_DATA.find((user) => user.id === parseInt(userId, 10));
		return rawData ? new UserDataModel(rawData) : null;
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
		const rawData = USER_ACTIVITY.find((user) => user.userId === parseInt(userId, 10));
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
		const rawData = USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId, 10));
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
		const rawData = USER_PERFORMANCE.find((user) => user.userId === parseInt(userId, 10));
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
