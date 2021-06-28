import React, { useState, useEffect } from "react";

import DetalhesPlantaMapperBotao from './DetalhesPlantaMapperBotao';
//Reescrito de https://github.com/coldiary/react-image-mapper/blob/master/src/ImageMapper.js (14/07/2020)

const DetalhesPlantaMapper = (props) => {
	let absPos = { position: "absolute", top: 0, left: 0 };
	const styles = {
		container: { position: "relative" },
		img: { ...absPos, zIndex: 1, userSelect: "none" }
	};

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
			props.onImageClick(event);
		}
	}

	const mouseMove = (area, index, event) => {
		if (props.onMouseMove) {
			props.onMouseMove(area, index, event);
		}
	}

	const imageMouseMove = (area, index, event) => {
		if (props.onImageMouseMove) {
			props.onImageMouseMove(area, index, event);
		}
	}

	const renderButtons = () => {
		return map.areas.map((area, index) => {
			return (
				<DetalhesPlantaMapperBotao
					key={area._id || index}
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
		<div style={styles.container}>
			<img
				style={styles.img}
				src={props.src}
				alt=""
				onClick={imageClick}
				onMouseMove={imageMouseMove}
			/>
			{renderButtons()}
		</div>
	);
}

DetalhesPlantaMapper.defaultProps = {
	map: {
		areas: [],
		name: "image-map-" + Math.random()
	}
};

export default DetalhesPlantaMapper;