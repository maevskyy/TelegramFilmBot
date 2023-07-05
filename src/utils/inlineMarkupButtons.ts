import { Markup } from "telegraf"

export const startInlineMarkup = Markup.inlineKeyboard([
    Markup.button.callback('Fetch films', 'fetchFilms'),
    Markup.button.callback('Fetch cartoons', 'fetchCartoons'),
    Markup.button.callback('Fetch TV serias', 'fetchTVSerias'),
])

export const showFilmInlineMarkup = (atWhich: string,) => {
     return Markup.inlineKeyboard([
        Markup.button.callback('<', 'prev'),
        Markup.button.callback(atWhich, 'atWhich '),
        Markup.button.callback('>', 'next'),
    ])
}