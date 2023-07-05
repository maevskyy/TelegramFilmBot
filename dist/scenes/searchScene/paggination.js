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
Object.defineProperty(exports, "__esModule", { value: true });
const getImage_1 = require("../../services/getImage");
const pagHandler = (ctx, allFilms, filmIndex) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        yield ctx.telegram.sendPhoto((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id, (0, getImage_1.getImage)(allFilms[filmIndex].poster_path), {
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
        });
    }
    catch (error) {
        yield ctx.telegram.sendPhoto((_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6n0Q3H_HR7BWc67gTgXwYHOcXBWGO8gKNtJBxnEkwxRgd-4LCdxPdPEsxHufQnFzEjQ&usqp=CAU', {
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
        });
        console.log('error with paggination');
    }
});
exports.default = pagHandler;
