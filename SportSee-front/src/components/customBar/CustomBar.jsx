import PropTypes from "prop-types";

const CustomBar = ({ x, y, width, height, fill }) => {
	const borderRadius = 10;
	const reducedHeight = Math.max(height - borderRadius / 2, 0); // Prevent negative heights

	return (
		<svg>
			{/* Main rectangle without border radius */}
			<rect
				x={x + width * 0.25} // Adjusted to reduce the width
				y={y + borderRadius / 2} // Start below the rounded rectangle
				width={borderRadius}
				height={reducedHeight} // Reduced height
				fill={fill}
			/>
			{/* Top rectangle with border radius */}
			<rect
				x={x + width * 0.25}
				y={y}
				width={borderRadius}
				height={borderRadius} // Height equal to the border radius
				fill={fill}
				rx={borderRadius} // Round top corners
				ry={borderRadius}
			/>
		</svg>
	);
};

CustomBar.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	fill: PropTypes.string.isRequired
};

export default CustomBar;
