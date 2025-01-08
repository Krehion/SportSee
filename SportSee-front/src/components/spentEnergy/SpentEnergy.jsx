import PropTypes from "prop-types";

const SpentEnergy = ({ icon, number, unit, name }) => {
	return (
		<div className="spent-energy">
			<img src={icon} alt={name} className="spent-energy__icon" />
			<div className="spent-energy__info">
				<p className="spent-energy__number">
					{number} <span>{unit}</span>
				</p>
				<p className="spent-energy__name">{name}</p>
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
