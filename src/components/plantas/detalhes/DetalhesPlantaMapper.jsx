import React, { useState, useEffect } from "react";

import DetalhesPlantaMapperBotao from './DetalhesPlantaMapperBotao';

const DetalhesPlantaMapper = (props) => {
	// const click = (detalhe, event) => {
	// 	if (props.onClick && !event.defaultPrevented) {
	// 		event.preventDefault();
	// 		props.onClick(detalhe);
	// 	}
	// }

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
						// onClick={(event) => click(detalhe, event)}
						onClick={() => props.onClick(detalhe)}
						scale={props.scale}
					/>
				)
			}
		</>
	);
}

export default DetalhesPlantaMapper;