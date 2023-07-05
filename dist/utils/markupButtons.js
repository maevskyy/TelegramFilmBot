"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMarkup = void 0;
const telegraf_1 = require("telegraf");
exports.startMarkup = telegraf_1.Markup.keyboard([
    ['/start', 'Стоп ⛔️']
]).resize();
