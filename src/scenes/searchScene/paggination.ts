import { FilmT } from '../../types'
import { getImage } from '../../services/getImage';


//! FIX TYPE
const pagHandler = async (ctx: any, allFilms: FilmT[], filmIndex:number) => {
    try {
		await ctx.telegram.sendPhoto(
			ctx.chat?.id as number,
			getImage(allFilms[filmIndex].poster_path),
			{
				caption: `Title: ${allFilms[filmIndex].original_title}\n\nOverview: ${allFilms[filmIndex].overview}\n\nRelease Date: ${allFilms[filmIndex].release_date}\n\nVote Average: ${allFilms[filmIndex].vote_average}`,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '<',
								callback_data: 'prev',
							},
							{
								text: `${filmIndex + 1}/${allFilms.length}`,
								callback_data: 'count',
							},
							{
								text: '>',
								callback_data: 'next',
							},
						],
					],
				},
			}
		);
	} catch (error) {
		await ctx.telegram.sendPhoto(
			ctx.chat?.id as number,
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6n0Q3H_HR7BWc67gTgXwYHOcXBWGO8gKNtJBxnEkwxRgd-4LCdxPdPEsxHufQnFzEjQ&usqp=CAU',
			{
				caption: `Title: ${allFilms[filmIndex].original_title}\n\nOverview: ${allFilms[filmIndex].overview}\n\nRelease Date: ${allFilms[filmIndex].release_date}\n\nVote Average: ${allFilms[filmIndex].vote_average}`,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: '<',
								callback_data: 'prev',
							},
							{
								text: `${filmIndex + 1}/${allFilms.length}`,
								callback_data: 'count',
							},
							{
								text: '>',
								callback_data: 'next',
							},
						],
					],
				},
			}
		);
		console.log('error with paggination');
	}
}

export default pagHandler