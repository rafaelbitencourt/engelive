import React, { useState, useEffect } from "react";

import DetalhesPlantaMapperBotao from './DetalhesPlantaMapperBotao';

const DetalhesPlantaMapper = (props) => {
	const [map, setMap] = useState({
		areas: [],
		name: "image-map-" + Math.random()
	});

	const click = (area, index, event) => {
		if (props.onClick && !event.defaultPrevented) {
			event.preventDefault();
			props.onClick(area, index, event);
		}
	}

	const imageClick = (event) => {
		if (props.onImageClick && !event.defaultPrevented) {
			event.preventDefault();
			var bcr = event.target.getBoundingClientRect();
			var x = (event.nativeEvent.clientX - bcr.x) / props.scale;
			var y = (event.nativeEvent.clientY - bcr.y) / props.scale;
			props.onImageClick({ x, y });
		}
	}

	const imageTouch = (event) => {
		if (props.onImageClick && !event.defaultPrevented) {
			event.preventDefault();
			if (event.changedTouches.length) {
				var bcr = event.target.getBoundingClientRect();
				var x = (event.changedTouches[0].clientX - bcr.x) / props.scale;
				var y = (event.changedTouches[0].clientY - bcr.y) / props.scale;
				props.onImageClick({ x, y });
			}
		}
	}

	const renderButtons = () => {
		return map.areas.map((area, index) => {
			return (
				<DetalhesPlantaMapperBotao
					key={index}
					scaledCoords={area.coords}
					label={area.label}
					onClick={(event) => click(area, index, event)}
					scale={props.scale}
				/>
			);
		});
	}


	useEffect(() => {
		setMap(JSON.parse(JSON.stringify(props.map)));
	}, [props.map]);

	return (
		<>
			<img
				src={props.src}
				alt=""
				onClick={imageClick}
				onTouchEnd={imageTouch}
			/>
			{renderButtons()}
		</>
	);
}

DetalhesPlantaMapper.defaultProps = {
	map: {
		areas: [],
		name: "image-map-" + Math.random()
	}
};

export default DetalhesPlantaMapper;