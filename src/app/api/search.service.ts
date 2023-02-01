import { Injectable } from '@angular/core';
import axios from 'axios';
import { SearchParams, SearchResults } from '../common/interfaces/search-api.interface';

const SEARCH_API = 'https://api.stackexchange.com/2.3/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  async search(params: SearchParams): Promise<SearchResults> {
    return (await axios.get(SEARCH_API, {
      params: {
        ...params,
        site: 'stackoverflow'
      }
    })).data;
  }
}
