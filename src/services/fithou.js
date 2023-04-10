import axios from 'axios';
import * as cheerio from 'cheerio';

import configs from '../configs';

export const crawlFithouService = async () => {
  const dom = await axios.get(configs.CRAWL_FITHOU_URL);

  const $ = cheerio.load(dom.data);

  const listNewsArticles = $('#LeftCol_pnlCategory div[class=article]')
    .map(function (index, element) {
      return {
        link: $(element).children('a').attr('href'),
        title: $(element).children('a').text().trim(),
      };
    })
    .get();

  return listNewsArticles;
};
