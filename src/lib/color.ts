import * as THREE from 'three';

type ColorCache = Partial<Record<string | number, THREE.Color>>;

const cache: ColorCache = {};

const undefinedColor = new THREE.Color();

export const colorCache = function (value: string | number | undefined): THREE.Color | undefined {
    if (!value) {
        return undefinedColor;
    }

    if (cache[value] != undefined) {
        return cache[value];
    }

    const colorRepresentation = new THREE.Color(value);
    cache[value] = colorRepresentation;

    return colorRepresentation;
};
