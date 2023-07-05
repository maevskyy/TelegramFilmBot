export const getImage = (url: string) => {
	const baseUrl = 'https://image.tmdb.org/t/p/';
	const posterSize = 'original';
	return `${baseUrl}${posterSize}${url}`;
};
