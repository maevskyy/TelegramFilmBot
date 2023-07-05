import axios from 'axios';
import { FilmT } from '../types';

const fetchFilms = async (filmName: string) => {
	//if we have two or more words in request -> we need to format axios request like this Harry%20Potter
	const name = (str = filmName) => {
		let word = str.trim();
		if (str.includes(' ')) {
			word = str.replace(/ /g, '%20');
		}
		return word;
	};

	let qtyPage: number = 1;
	let allMovies: any = []; //!TYPE FIX

	const response = await axios.get(
		`https://api.themoviedb.org/3/search/movie?query=${name()}&include_adult=true&language=en-US&page=1`,
		{
			headers: {
				Authorization: `Bearer ${process.env.API_KEY}`,
				Accept: 'application/json',
			},
		}
	);

	if (response.data.total_pages > 1) {
		qtyPage = response.data.total_pages < 6 ? response.data.total_pages : 6;
		for (let i = 1; i <= qtyPage; i++) {
			await axios
				.get(
					`https://api.themoviedb.org/3/search/movie?query=${name()}&include_adult=false&language=en-US&page=${i}`,
					{
						headers: {
							Authorization: `Bearer ${process.env.API_KEY}`,
							Accept: 'application/json',
						},
					}
				)
				.then((res) => allMovies.push(res.data.results))
				.catch((error) => console.log(error));
		}
	} else {
		await axios
			.get(
				`https://api.themoviedb.org/3/search/movie?query=${name()}&include_adult=false&language=en-US&page=1`,
				{
					headers: {
						Authorization: `Bearer ${process.env.API_KEY}`,
						Accept: 'application/json',
					},
				}
			)
			.then((res) => allMovies.push(res.data.results))
			.catch((error) => console.log(error));
	}

	const sortedMovies = async (arr: FilmT[][]) => {
		const concatAllArr = arr.flat();
		const filterByQtyOfVote = concatAllArr.filter((film) => film.vote_count > 1);
		console.log(concatAllArr.length, ' - qty of search');
		return filterByQtyOfVote.sort((a: FilmT, b: FilmT) => b.popularity - a.popularity);
	};
	return sortedMovies(allMovies);
};

export default fetchFilms;
