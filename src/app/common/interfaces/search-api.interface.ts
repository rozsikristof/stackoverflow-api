export interface SearchParams {
  intitle: string;
  page?: number;
  pagesize?: number;
  fromdate?: Date;
  todate?: Date;
  order?: 'asc' | 'desc',
  min?: Date,
  max?: Date,
  sort?: 'activity' | 'votes' | 'creation' | 'relevance';
}

export interface SearchResultItem {
  tags: string[],
  owner: {
    account_id: number;
    reputation: number;
    user_id: number;
    user_type: string;
    accept_rate: number;
    profile_image: string;
    display_name: string;
    link: string;
  },
  is_answered: boolean;
  view_count: number;
  accepted_answer_id: number;
  answer_count: number;
  score: number;
  last_activity_date: Date;
  creation_date: any;
  question_id: number;
  content_license: string;
  link: string;
  title: string;
}

export interface SearchResults {
  items: SearchResultItem[],
  has_more: boolean;
  quota_max: number;
  quota_remaning: number;
}
