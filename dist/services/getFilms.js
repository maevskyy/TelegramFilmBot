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
const axios_1 = __importDefault(require("axios"));
const fetchFilms = (filmName) => __awaiter(void 0, void 0, void 0, function* () {
    //if we have two or more words in request -> we need to format axios request like this Harry%20Potter
    const name = (str = filmName) => {
        let word = str.trim();
        if (str.includes(' ')) {
            word = str.replace(/ /g, '%20');
        }
        return word;
    };
    let qtyPage = 1;
    let allMovies = []; //!TYPE FIX
    const response = yield axios_1.default.get(`https://api.themoviedb.org/3/search/movie?query=${name()}&include_adult=true&language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            Accept: 'application/json',
        },
    });
    if (response.data.total_pages > 1) {
        qtyPage = response.data.total_pages < 6 ? response.data.total_pages : 6;
        for (let i = 1; i <= qtyPage; i++) {
            yield axios_1.default
                .get(`https://api.themoviedb.org/3/search/movie?query=${name()}&include_adult=false&language=en-US&page=${i}`, {
                headers: {
                    Authorization: `Bearer ${process.env.API_KEY}`,
                    Accept: 'application/json',
                },
            })
                .then((res) => allMovies.push(res.data.results))
                .catch((error) => console.log(error));
        }
    }
    else {
        yield axios_1.default
            .get(`https://api.themoviedb.org/3/search/movie?query=${name()}&include_adult=false&language=en-US&page=1`, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY}`,
                Accept: 'application/json',
            },
        })
            .then((res) => allMovies.push(res.data.results))
            .catch((error) => console.log(error));
    }
    const sortedMovies = (arr) => __awaiter(void 0, void 0, void 0, function* () {
        const concatAllArr = arr.flat();
        const filterByQtyOfVote = concatAllArr.filter((film) => film.vote_count > 1);
        console.log(concatAllArr.length, ' - qty of search');
        return filterByQtyOfVote.sort((a, b) => b.popularity - a.popularity);
    });
    return sortedMovies(allMovies);
});
exports.default = fetchFilms;
