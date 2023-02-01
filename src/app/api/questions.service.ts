import { Injectable } from '@angular/core';
import axios from 'axios';

const QUESTIONS_API = 'https://api.stackexchange.com/2.3/questions/';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  async getQuestions(ids: string): Promise<any> {
    return (await axios.get(`${QUESTIONS_API}${ids}`, {
      params: {
        site: 'stackoverflow'
      }
    })).data;
  }
}
