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
exports.getFilmsScene = void 0;
const telegraf_1 = require("telegraf");
const filters_1 = require("telegraf/filters");
const getFilms_1 = __importDefault(require("../../services/getFilms"));
const paggination_1 = __importDefault(require("./paggination"));
// leave it here const { enter, leave } = Scenes.Stage;
exports.getFilmsScene = new telegraf_1.Scenes.BaseScene('fetchFilms');
exports.getFilmsScene.enter((ctx) => ctx.reply('Введите название'));
exports.getFilmsScene.on((0, filters_1.message)('text'), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const filmName = ctx.message.text;
    let allFilms = yield (0, getFilms_1.default)(filmName).then((res) => res.slice(0, 10));
    if (allFilms.length == 0) {
        yield ctx.reply('Нету такого фильма');
        yield ctx.scene.leave();
        return ctx.scene.enter('fetchFilms');
    }
    ctx.session.__scenes.allFilms = allFilms;
    return (0, paggination_1.default)(ctx, allFilms, 0);
}));
exports.getFilmsScene.on((0, filters_1.callbackQuery)('data'), ctx => {
    ctx.answerCbQuery();
    let filmIndex = ctx.session.__scenes.currentFilm || 0;
    let allFilms = ctx.session.__scenes.allFilms;
    const prevOrNext = ctx.callbackQuery.data;
    if (prevOrNext == 'next') {
        if (filmIndex + 1 == allFilms.length) {
            return;
        }
        ctx.deleteMessage();
        filmIndex++;
        ctx.session.__scenes.currentFilm = filmIndex;
        return (0, paggination_1.default)(ctx, allFilms, filmIndex);
    }
    if (prevOrNext == 'prev') {
        if (filmIndex == 0) {
            return;
        }
        ctx.deleteMessage();
        filmIndex--;
        ctx.session.__scenes.currentFilm = filmIndex;
        return (0, paggination_1.default)(ctx, allFilms, filmIndex);
    }
});
