import { Scenes, session, Telegraf, MiddlewareFn, Context } from 'telegraf';
import { callbackQuery } from 'telegraf/filters';
import dotenv from 'dotenv';
import { startInlineMarkup } from './utils/inlineMarkupButtons';
import { startMarkup } from './utils/markupButtons';
import { getFilmsScene } from './scenes/searchScene/searchScene';
import { MyContextBasicSceneT } from './types';

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.start(async (ctx) => {
	await ctx.reply('Здравствуйте, очень длинный текст тут короче', startMarkup);
	ctx.reply('Что хотите искать?', startInlineMarkup);
});

bot.hears('Стоп ⛔️', (ctx) => {
	ctx.reply('Сначала');
});

const stage = new Scenes.Stage<MyContextBasicSceneT>([getFilmsScene], {
	ttl: 120,
});

bot.use(session());
bot.use(stage.middleware() as MiddlewareFn<Context>);
bot.on(callbackQuery('data'), async (ctx) => {
	ctx.answerCbQuery();
    ctx.deleteMessage()
	if (ctx.callbackQuery.data == 'fetchFilms') {
		const sceneContext = ctx as Scenes.SceneContext<Scenes.SceneSessionData>;
		sceneContext.scene.enter('fetchFilms');
	}
});
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
