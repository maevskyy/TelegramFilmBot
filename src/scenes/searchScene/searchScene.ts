import { Scenes } from 'telegraf';
import { callbackQuery, message } from 'telegraf/filters';
import getFilms from '../../services/getFilms';
import { FilmT, MyContextBasicSceneT } from '../../types';
import pagHandler from './paggination';

// leave it here const { enter, leave } = Scenes.Stage;

export const getFilmsScene = new Scenes.BaseScene<MyContextBasicSceneT>('fetchFilms');
getFilmsScene.enter((ctx) => ctx.reply('Введите название'));
getFilmsScene.on(message('text'), async (ctx) => {
	const filmName = ctx.message.text;
	let allFilms: FilmT[] = await getFilms(filmName).then((res) => res.slice(0, 10));
	if (allFilms.length == 0) {
		
		await ctx.reply('Нету такого фильма')
		await ctx.scene.leave()
		return ctx.scene.enter('fetchFilms');
	}
	ctx.session.__scenes.allFilms = allFilms;
	return pagHandler(ctx, allFilms, 0)
})
getFilmsScene.on(callbackQuery('data'), ctx => {
	ctx.answerCbQuery()
	let filmIndex = ctx.session.__scenes.currentFilm || 0
	let allFilms = ctx.session.__scenes.allFilms
	const prevOrNext = ctx.callbackQuery.data
	if (prevOrNext == 'next') {
		if (filmIndex + 1 == allFilms.length) {			
			return
		}
		ctx.deleteMessage()
		filmIndex++
		ctx.session.__scenes.currentFilm = filmIndex;
		return pagHandler(ctx, allFilms, filmIndex)
	}
	if (prevOrNext == 'prev') {
		if (filmIndex == 0) {
			return
		}
		ctx.deleteMessage()
		filmIndex--
		ctx.session.__scenes.currentFilm = filmIndex;
		return pagHandler(ctx, allFilms, filmIndex)
	}	
})
