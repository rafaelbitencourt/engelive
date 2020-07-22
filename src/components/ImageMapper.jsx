import React, { useState, useEffect } from "react";

//Reescrito de https://github.com/coldiary/react-image-mapper/blob/master/src/ImageMapper.js (14/07/2020)

const ImageMapper = (props) => {

    let absPos = { position: "absolute", top: 0, left: 0 };
    const styles = {
        container: { position: "relative" },
        canvas: { ...absPos, pointerEvents: "none", zIndex: 2 },
        img: { ...absPos, zIndex: 1, userSelect: "none" },
        map: (props.onClick && { cursor: "pointer" }) || undefined
    };

    const [map, setMap] = useState({
		areas: [],
		name: "image-map-" + Math.random()
    });
    
    var ctx = {};
    var canvas = {};
    var img = {};
    var container = {};

    const drawrect = (coords, fillColor, lineWidth, strokeColor) => {
		let [left, top, right, bot] = coords;
		ctx.fillStyle = fillColor;
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeColor;
		ctx.strokeRect(left, top, right - left, bot - top);
		ctx.fillRect(left, top, right - left, bot - top);
		ctx.fillStyle = props.fillColor;
	}

	const drawcircle = (coords, fillColor, lineWidth, strokeColor) => {
        ctx.fillStyle = fillColor;
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeColor;
		ctx.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.fillStyle = props.fillColor;
	}

	const  drawpoly = (coords, fillColor, lineWidth, strokeColor) => {
		coords = coords.reduce(
			(a, v, i, s) => (i % 2 ? a : [...a, s.slice(i, i + 2)]),
			[]
		);
		
		ctx.fillStyle = fillColor;
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeColor;
		let first = coords.unshift();
		ctx.moveTo(first[0], first[1]);
		coords.forEach(c => ctx.lineTo(c[0], c[1]));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.fillStyle = props.fillColor;
	}

	const initCanvas = () => {
		if (props.width) img.width = props.width;

		if (props.height) img.height = props.height;

		canvas.width = props.width || img.clientWidth;
		canvas.height = props.height || img.clientHeight;
		container.style.width =
			(props.width || img.clientWidth) + "px";
		container.style.height =
			(props.height || img.clientHeight) + "px";
		ctx = canvas.getContext("2d");
		ctx.fillStyle = props.fillColor;

		if (props.onLoad) props.onLoad();

		renderPrefilledAreas();
	}

	const hoverOn = (area, index, event) => {
        const shape = event.target.getAttribute("shape");

      	if (props.active) {
			switch (shape) {
                case "circle":
                    drawcircle(
                        event.target.getAttribute("coords").split(","),
                        area.fillColor,
                        area.lineWidth || props.lineWidth,
                        area.strokeColor || props.strokeColor
                    );
                    break;
                case "poly":
                    drawpoly(
                        event.target.getAttribute("coords").split(","),
                        area.fillColor,
                        area.lineWidth || props.lineWidth,
                        area.strokeColor || props.strokeColor
                    );
                    break;
                case "rect":
                    drawrect(
                        event.target.getAttribute("coords").split(","),
                        area.fillColor,
                        area.lineWidth || props.lineWidth,
                        area.strokeColor || props.strokeColor
                    );
					break;
				default:
					break;
            }
		}
		if (props.onMouseEnter) props.onMouseEnter(area, index, event);
	}

	const hoverOff = (area, index, event) => {
		if (props.active) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			renderPrefilledAreas();
		}

		if (props.onMouseLeave) props.onMouseLeave(area, index, event);
	}

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

	const scaleCoords = (coords) => {
		const { imgWidth, width } = props;
		// calculate scale based on current 'width' and the original 'imgWidth'
		const scale = width && imgWidth && imgWidth > 0 ? width / imgWidth : 1;
		return coords.map(coord => coord * scale);
	}

	const renderPrefilledAreas = () => {
		map.areas.forEach(area => {
			if (!area.preFillColor) return;
			switch (area.shape) {
                case "circle":
                    drawcircle(
                        scaleCoords(area.coords),
                        area.preFillColor,
                        area.lineWidth || props.lineWidth,
                        area.strokeColor || props.strokeColor
                    );
                    break;
                case "poly":
                    drawpoly(
                        scaleCoords(area.coords),
                        area.preFillColor,
                        area.lineWidth || props.lineWidth,
                        area.strokeColor || props.strokeColor
                    );
                    break;
                case "rect":
                    drawrect(
                        scaleCoords(area.coords),
                        area.preFillColor,
                        area.lineWidth || props.lineWidth,
                        area.strokeColor || props.strokeColor
                    );
					break;
				default:
					break;
            }
		});
	}

	const computeCenter = (area) => {
		if (!area) return [0, 0];

		const scaledCoords = scaleCoords(area.coords);

		switch (area.shape) {
			case "circle":
				return [scaledCoords[0], scaledCoords[1]];
			case "poly":
			case "rect":
			default: {
				// Calculate centroid
				const n = scaledCoords.length / 2;
				const { y, x } = scaledCoords.reduce(
					({ y, x }, val, idx) => {
						return !(idx % 2) ? { y, x: x + val / n } : { y: y + val / n, x };
					},
					{ y: 0, x: 0 }
				);
				return [x, y];
			}
		}
	}

	const renderAreas = () => {
		return map.areas.map((area, index) => {
			const scaledCoords = scaleCoords(area.coords);
			const center = computeCenter(area);
			const extendedArea = { ...area, scaledCoords, center };
			return (
				<area
					key={area._id || index}
					shape={area.shape}
					coords={scaledCoords.join(",")}
                    onMouseEnter={(event) => hoverOn(extendedArea, index, event)}
					onMouseLeave={(event) => hoverOff(extendedArea, index, event)}
					onMouseMove={(event) => mouseMove(extendedArea, index, event)}
					onClick={(event) => click(extendedArea, index, event)}
					href={area.href}
					alt=''
				/>
			);
		});
	}

	useEffect(() => {
        setMap(JSON.parse(JSON.stringify(props.map)));
    }, [props.map]);

    useEffect(() => {
        initCanvas();
    }, [map]);

	return (
        <div style={styles.container} ref={node => (container = node)}>
            <img
                style={styles.img}
                src={props.src}
                useMap={`#${map.name}`}
                alt=""
                ref={node => (img = node)}
                onLoad={initCanvas}
                onClick={imageClick}
                onMouseMove={imageMouseMove}
            />
            <canvas ref={node => (canvas = node)} style={styles.canvas} />
            <map name={map.name} style={styles.map}>
                {renderAreas()}
            </map>
        </div>
    );
}

ImageMapper.defaultProps = {
	active: false,
	fillColor: "rgba(255, 255, 255, 0.5)",
	lineWidth: 1,
	map: {
		areas: [],
		name: "image-map-" + Math.random()
	},
	strokeColor: "rgba(0, 0, 200, 0.8)"
};

export default ImageMapper;