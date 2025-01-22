// Mocked data
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from "../datas/mockData";

const useMockData = true; // Toggle this to switch between API and mock data

// API URLs
const ApiBaseUrl = "https://api.example.com";

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
		return USER_MAIN_DATA.find((user) => user.id === parseInt(userId, 10));
	}
	return fetchData(`/user/${userId}`);
};

export const getUserActivity = async (userId) => {
	if (useMockData) {
		return USER_ACTIVITY.find((user) => user.userId === parseInt(userId, 10));
	}
	return fetchData(`/user/${userId}/activity`);
};

export const getUserAverageSessions = async (userId) => {
	if (useMockData) {
		return USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId, 10));
	}
	return fetchData(`/user/${userId}/average-sessions`);
};

export const getUserPerformance = async (userId) => {
	if (useMockData) {
		return USER_PERFORMANCE.find((user) => user.userId === parseInt(userId, 10));
	}
	return fetchData(`/user/${userId}/performance`);
};
