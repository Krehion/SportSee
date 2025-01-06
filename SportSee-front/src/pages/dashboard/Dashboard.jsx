import { useParams } from "react-router-dom";

const Dashboard = () => {
	const { id } = useParams();

	return (
		<div>
			<h1>Dashboard for User {id}</h1>
		</div>
	);
};

export default Dashboard;
