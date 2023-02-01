import { Injectable } from '@angular/core';
import axios from 'axios';

const DEFAULT_PARAM = 'stackoverflow';

const USER_INFO_API = 'https://api.stackexchange.com/2.3/users';
const USER_ANSWERS_API = `${USER_INFO_API}/:id/answers`;
const USER_QUESTIONS_API = `${USER_INFO_API}/:id/questions`;
const USER_TOP_TAGS_API = `${USER_INFO_API}/:id/top-tags`;
const USER_BADGES = `${USER_INFO_API}/:id/badges`;

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  getUserInfo(id: string): Promise<any> {
    return Promise.all([
      this.getUserData(id),
      this.getUserAnswers(id),
      this.getUserQuestions(id),
      this.getUserTopTags(id),
      this.getUserBadges(id)
    ]);
  }

  private getUserData(id: string): Promise<any> {
    return axios.get(`${USER_INFO_API}/${id}`, {
      params: {
        site: DEFAULT_PARAM
      }
    });
  }

  private getUserAnswers(id: string): Promise<any> {
    return axios.get(USER_ANSWERS_API.replace(':id', id), {
      params: {
        site: DEFAULT_PARAM
      }
    });
  }

  private getUserQuestions(id: string): Promise<any> {
    return axios.get(USER_QUESTIONS_API.replace(':id', id), {
      params: {
        site: DEFAULT_PARAM
      }
    });
  }

  private getUserTopTags(id: string): Promise<any> {
    return axios.get(USER_TOP_TAGS_API.replace(':id', id), {
      params: {
        site: DEFAULT_PARAM
      }
    });
  }

  private getUserBadges(id: string): Promise<any> {
    return axios.get(USER_BADGES.replace(':id', id), {
      params: {
        site: DEFAULT_PARAM
      }
    });
  }
}
