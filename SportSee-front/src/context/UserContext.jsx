import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
	const [userId, setUserId] = useState(null);

	return <UserContext.Provider value={{ userId, setUserId }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired
};
