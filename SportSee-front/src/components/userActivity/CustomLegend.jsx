import PropTypes from "prop-types";

/**
 * Render a tooltip for Chart Activity
 *
 * @category Components
 * @component
 * @returns { React.Component } A React component
 */
function CustomLegend({ payload }) {
	return (
		<div
			style={{
				position: "relative",
				height: "auto",
				right: 0,
				top: 0,
				marginBottom: "30px",
				display: "flex",
				justifyContent: "right",
				alignItems: "center"
			}}>
			{payload.map((entry, index) => (
				<div
					key={`item-${index}`}
					style={{
						display: "flex",
						alignItems: "center",
						marginLeft: "30px"
					}}>
					<div
						style={{
							width: "8px",
							height: "8px",
							backgroundColor: entry.color,
							marginRight: "10px",
							borderRadius: "50%"
						}}></div>
					<span className="activity-chart--legend">{entry.value}</span>
				</div>
			))}
		</div>
	);
}

CustomLegend.propTypes = {
	payload: PropTypes.arrayOf(
		PropTypes.shape({
			color: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired
		})
	).isRequired
};

export default CustomLegend;
