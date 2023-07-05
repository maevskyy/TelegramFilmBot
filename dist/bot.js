"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const filters_1 = require("telegraf/filters");
const dotenv_1 = __importDefault(require("dotenv"));
const inlineMarkupButtons_1 = require("./utils/inlineMarkupButtons");
const markupButtons_1 = require("./utils/markupButtons");
const searchScene_1 = require("./scenes/searchScene/searchScene");
dotenv_1.default.config();
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply('Здравствуйте, очень длинный текст тут короче', markupButtons_1.startMarkup);
    ctx.reply('Что хотите искать?', inlineMarkupButtons_1.startInlineMarkup);
}));
bot.hears('Стоп ⛔️', (ctx) => {
    ctx.reply('Сначала');
});
const stage = new telegraf_1.Scenes.Stage([searchScene_1.getFilmsScene], {
    ttl: 120,
});
bot.use((0, telegraf_1.session)());
bot.use(stage.middleware());
bot.on((0, filters_1.callbackQuery)('data'), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.answerCbQuery();
    ctx.deleteMessage();
    if (ctx.callbackQuery.data == 'fetchFilms') {
        const sceneContext = ctx;
        sceneContext.scene.enter('fetchFilms');
    }
}));
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
