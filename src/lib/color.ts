import * as THREE from 'three';

type ColorCache = Record<string | number, THREE.Color>;

const cache: ColorCache = {};

const undefinedColor = new THREE.Color();

export const colorCache = function (value: string | number | undefined): THREE.Color {
	if (!value) {
		return undefinedColor;
	}

	if (cache[value]) {
		return cache[value];
	}

	const colorRepresentation = new THREE.Color(value);
	cache[value] = colorRepresentation;

	return colorRepresentation;
};
