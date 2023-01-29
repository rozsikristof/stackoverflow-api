/* eslint-disable camelcase */
import { Injectable } from '@angular/core';
import axios from 'axios';
import * as he from 'he';
import { SearchParams, SearchResults } from '../common/interfaces/search-api.interface';
import * as dataJson from '../api/mock.json';

const SEARCH_API = 'https://api.stackexchange.com/2.3/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  async search(data: SearchParams): Promise<SearchResults> {
    let encodedResult;

    const result = dataJson;

    /* const result = await axios.get<SearchResults>(SEARCH_API, {
      params: {
        ...data,
        site: 'stackoverflow'
      }
    }); */

    const decodedResult = he.decode(JSON.stringify(result.data));

    try {
      encodedResult = JSON.parse(decodedResult);
      encodedResult = {
        ...encodedResult,
        parse_error: false
      };
    } catch(e: any) {
      encodedResult = {
        ...result.data,
        parse_error: true
      };
    }

    return encodedResult;
  }
}
