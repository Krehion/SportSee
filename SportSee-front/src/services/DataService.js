// Mocked data
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from "../datas/mockData";

const useMockData = false; // Toggle this to switch between API and mock data

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
		return USER_MAIN_DATA.find((user) => user.id === parseInt(userId, 10));
	}
	const response = await fetchData(`/user/${userId}`);
	return response.data;
};

export const getUserActivity = async (userId) => {
	if (useMockData) {
		const user = USER_ACTIVITY.find((user) => user.userId === parseInt(userId, 10));
		return user ? { sessions: user.sessions } : null;
	}
	try {
		const response = await fetchData(`/user/${userId}/activity`);
		return { sessions: response.data.sessions }; // Normalized to match mocked data structure
	} catch (error) {
		console.error(`Error fetching user activity for userId ${userId}:`, error);
		throw error;
	}
};

export const getUserAverageSessions = async (userId) => {
	if (useMockData) {
		return USER_AVERAGE_SESSIONS.find((user) => user.userId === parseInt(userId, 10));
	}

	try {
		const response = await fetchData(`/user/${userId}/average-sessions`);
		return { sessions: response.data.sessions }; // Normalized to match mocked data structure
	} catch (error) {
		console.error(`Error fetching user average sessions for userId ${userId}:`, error);
		throw error;
	}
};

export const getUserPerformance = async (userId) => {
	if (useMockData) {
		return USER_PERFORMANCE.find((user) => user.userId === parseInt(userId, 10));
	}
	const response = await fetchData(`/user/${userId}/performance`);

	// Normalize the structure so that it matches the mock data
	return {
		userId: response.data.userId,
		kind: response.data.kind,
		data: response.data.data
	};
};
