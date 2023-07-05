"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showFilmInlineMarkup = exports.startInlineMarkup = void 0;
const telegraf_1 = require("telegraf");
exports.startInlineMarkup = telegraf_1.Markup.inlineKeyboard([
    telegraf_1.Markup.button.callback('Fetch films', 'fetchFilms'),
    telegraf_1.Markup.button.callback('Fetch cartoons', 'fetchCartoons'),
    telegraf_1.Markup.button.callback('Fetch TV serias', 'fetchTVSerias'),
]);
const showFilmInlineMarkup = (atWhich) => {
    return telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('<', 'prev'),
        telegraf_1.Markup.button.callback(atWhich, 'atWhich '),
        telegraf_1.Markup.button.callback('>', 'next'),
    ]);
};
exports.showFilmInlineMarkup = showFilmInlineMarkup;
