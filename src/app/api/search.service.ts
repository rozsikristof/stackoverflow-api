import { Injectable } from '@angular/core';
import axios from 'axios';
import { SearchParams, SearchResults } from '../common/interfaces/search-api.interface';

const SEARCH_API = 'https://api.stackexchange.com/2.3/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  async search(data: SearchParams): Promise<SearchResults> {
    const result = await axios.get<SearchResults>(SEARCH_API, {
      params: {
        ...data,
        site: 'stackoverflow'
      }
    });

    return result.data;
  }
}
