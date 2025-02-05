import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard.jsx";

const AppRouter = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/user/12" />} />{" "}
				{/* redirect to user 12 by default for kickstarting the project, remove once there's a homepage */}
				<Route path="/user/:id" element={<Dashboard />} />
				<Route path="*" element={<Navigate to="/user/12" />} />{" "}
				{/* redirect missing pages to dashboard by default for kickstarting the project, remove once there's a 404 */}
			</Routes>
		</HashRouter>
	);
};

export default AppRouter;
