import PropTypes from "prop-types";

/**
 * Render a tooltip for Chart Activity
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
function CustomToolTip({ active, payload }) {
	if (active && payload && payload.length) {
		return (
			<div className="activity-chart--tooltip">
				<p>{payload[0].value + " kg"}</p>
				<p>{payload[1].value + " Kcal"}</p>
			</div>
		);
	}
	return null;
}

CustomToolTip.propTypes = {
	/**
	 * Whether or not the tooltip is active
	 */
	active: PropTypes.bool,
	/**
	 * The payload of the tooltip
	 */
	payload: PropTypes.arrayOf(PropTypes.object)
};

export default CustomToolTip;
