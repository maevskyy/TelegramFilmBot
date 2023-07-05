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
const getFilms_1 = __importDefault(require("../services/getFilms"));
const getImage_1 = require("../services/getImage");
// leave it here const { enter, leave } = Scenes.Stage;
exports.getFilmsScene = new telegraf_1.Scenes.BaseScene("fetchFilms");
exports.getFilmsScene.enter(ctx => ctx.reply('Введите название'));
exports.getFilmsScene.on((0, filters_1.message)('text'), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const filmName = ctx.message.text;
    let allFilms = yield (0, getFilms_1.default)(filmName).then(res => res.slice(0, 10));
    //@ts-ignore
    //!TYPE FIX
    ctx.session.allFilms = allFilms;
    try {
        yield ctx.telegram.sendPhoto((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id, (0, getImage_1.getImage)(allFilms[0].poster_path), {
            caption: `Title: ${allFilms[0].original_title}\n\nOverview: ${allFilms[0].overview}\n\nRelease Date: ${allFilms[0].release_date}\n\nVote Average: ${allFilms[0].vote_average}`,
            reply_markup: {
                inline_keyboard: [[
                        { text: '<', callback_data: 'prev' },
                        { text: `${0 + 1}/${allFilms.length}`, callback_data: 'count' },
                        { text: '>', callback_data: 'next' },
                    ]]
            }
        });
    }
    catch (error) {
        //https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6n0Q3H_HR7BWc67gTgXwYHOcXBWGO8gKNtJBxnEkwxRgd-4LCdxPdPEsxHufQnFzEjQ&usqp=CAU
        yield ctx.telegram.sendPhoto((_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6n0Q3H_HR7BWc67gTgXwYHOcXBWGO8gKNtJBxnEkwxRgd-4LCdxPdPEsxHufQnFzEjQ&usqp=CAU', {
            caption: `Title: ${allFilms[0].original_title}\n\nOverview: ${allFilms[0].overview}\n\nRelease Date: ${allFilms[0].release_date}\n\nVote Average: ${allFilms[0].vote_average}`,
            reply_markup: {
                inline_keyboard: [[
                        { text: '<', callback_data: 'prev' },
                        { text: `${0 + 1}/${allFilms.length}`, callback_data: 'count' },
                        { text: '>', callback_data: 'next' },
                    ]]
            }
        });
        console.log('error in searchScene');
        // ctx.scene.leave()
    }
}));
