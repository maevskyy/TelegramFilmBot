"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = void 0;
const getImage = (url) => {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const posterSize = 'original';
    return `${baseUrl}${posterSize}${url}`;
};
exports.getImage = getImage;
