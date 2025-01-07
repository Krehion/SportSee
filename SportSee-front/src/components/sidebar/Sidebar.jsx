import "../../style/layout/_sidebar.scss";

import IconYoga from "../../assets/icon-yoga.svg";
import IconSwim from "../../assets/icon-swim.svg";
import IconBike from "../../assets/icon-bike.svg";
import IconWeight from "../../assets/icon-weight.svg";

function Sidebar() {
	const activitiesList = [
		{
			id: "1",
			alt: "yoga",
			image: IconYoga
		},
		{
			id: "2",
			alt: "swimming",
			image: IconSwim
		},
		{
			id: "3",
			alt: "biking",
			image: IconBike
		},
		{
			id: "4 ",
			alt: "bodybuilding",
			image: IconWeight
		}
	];

	return (
		<aside className="sidebar">
			<div className="sidebar--icon-container">
				{activitiesList.map((data) => {
					return <img key={data.id} src={data.image} alt={data.alt} />;
				})}
			</div>
			<p className="sidebar--rights">Copyright, SportSee 2020</p>
		</aside>
	);
}

export default Sidebar;
