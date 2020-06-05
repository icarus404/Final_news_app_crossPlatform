import {articles_url, _api_key, country_code} from '../config/rest_config';

export async function getArticles(category = 'general') {
  try {
    //fetch statement for news fetch
    let articles = await fetch(
      `${articles_url}?country=${country_code}&category=${category}`,
      {
        headers: {
          'X-API-KEY': _api_key,
        },
      },
    );

    let result = await articles.json(); //fetching json data in result variable
    articles = null; //clearing articles variable from fetch statement

    return result.articles; //returning just articles from json data
  } catch (error) {
    throw error;
  }
}
