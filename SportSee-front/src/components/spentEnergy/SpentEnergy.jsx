import "../../style/components/_spent-energy.scss";
import PropTypes from "prop-types";

const SpentEnergy = ({ icon, number, unit, name }) => {
	return (
		<div className="spent-energy">
			<img src={icon} alt={name} className="spent-energy--icon" />
			<div className="spent-energy--info">
				<p className="spent-energy--number">
					{number} <span>{unit}</span>
				</p>
				<p className="spent-energy--name">{name}</p>
			</div>
		</div>
	);
};

SpentEnergy.propTypes = {
	icon: PropTypes.string.isRequired, // Path to the icon
	number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	unit: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

export default SpentEnergy;
