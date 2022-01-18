import express from "express";
import { readFile } from 'fs/promises';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/user-favorites', async (req, res) => {
    const paramsArr = req.query.tags.split(',')

    const fetchParamsArr = await paramsArr.map(request => request =`https://newsapi.org/v2/everything?q=${request}`)
    const favoritedArticles = await fetchArticlesByParams(fetchParamsArr);
    res.send(favoritedArticles);

        // const json = await JSON.parse(await readFile(new URL('../../data-json/cnn-news.json', import.meta.url)));
        // res.send(json);

});


async function fetchArticlesByParams(paramsArr) {
    const allArticles = {
        status: 'ok',
        totalResults: 0,
        articles: []
    };
            const requests = paramsArr.map((param) => fetch(`${param}&apiKey=${process.env.API_KEY}`))
            const responseData = await Promise.all(requests);
            const jsonResponse = responseData.map(article => article.json());
            const jsonData = await Promise.all(jsonResponse);
            await jsonData.forEach(response => {

                // if (response.status == 'ok') {
                    allArticles.totalResults += response.totalResults;
                    // allArticles.articles.concat(response.articles);
                    allArticles.articles = [...allArticles.articles, ...response.articles]
                // } else {
                //     allArticles.error = "There was an error with your search"
                // }

            });
            return allArticles;

}

router.get('/top-headlines', async (req, res) => {
    const json = await JSON.parse(await readFile(new URL('../../data-json/top-headlines.json', import.meta.url)));
    res.send(json);
})


router.get('/fox-news', async (req, res) => {
    const json = JSON.parse(await readFile(new URL('../../data-json/fox.json', import.meta.url)));
    res.send(json);
})

export default router;
