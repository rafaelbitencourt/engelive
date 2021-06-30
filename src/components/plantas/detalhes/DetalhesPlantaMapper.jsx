import React from "react";

import DetalhesPlantaMapperBotao from './DetalhesPlantaMapperBotao';

const DetalhesPlantaMapper = (props) => {
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

	return (
		<>
			<img
				src={props.src}
				alt=""
				onClick={imageClick}
				onTouchEnd={imageTouch}
			/>
			{
				props.map.map((detalhe, index) =>
					<DetalhesPlantaMapperBotao
						key={index}
						scaledCoords={detalhe.coords}
						label={detalhe.label}
						onClick={() => props.onClick(detalhe)}
						scale={props.scale}
					/>
				)
			}
		</>
	);
}

export default DetalhesPlantaMapper;