/* eslint-disable no-magic-numbers */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/components/common/loading/loading.component';
import { SearchFormComponent } from 'src/app/components/common/search-form/search-form.component';
import { UserInfoService } from 'src/app/api/user-info.service';
import { QuestionsService } from 'src/app/api/questions.service';
import { TagsComponent } from 'src/app/components/tags/tags.component';
import { ErrorComponent } from 'src/app/components/common/error/error.component';
import { BehaviorSubject } from 'rxjs';
import { ErrorResponse } from 'src/app/common/interfaces/error-response.interface';

const IMPORTED_COMPONENTS = [
  CommonModule,
  LoadingComponent,
  SearchFormComponent,
  TagsComponent,
  ErrorComponent
];

@Component({
  selector: 'app-user-info-page',
  standalone: true,
  imports: [IMPORTED_COMPONENTS],
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoPageComponent {
  userInfo: any = {};
  userQuestions: any = {};
  userBadges: any = {};
  userQuestionOfAnswers: any = {};
  userAnswerIds = '';
  userTopTags: string[] = [];
  searchTerm = '1';
  isLoading = false;
  searchResultsError$ = new BehaviorSubject<ErrorResponse | null>(null);

  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly questionsService: QuestionsService,
    private readonly cdRef: ChangeDetectorRef
  ) {
    this.executeSearch(this.searchTerm);
  }

  async executeSearch(searchValue: string): Promise<void> {
    this.isLoading = true;

    try {
      const result = await this.userInfoService.getUserInfo(searchValue);

      const userAnswerIds = result[1].data.items.map((answer: any) => answer.answer_id).join(';');
      this.userQuestionOfAnswers = (await this.questionsService.getQuestions(userAnswerIds)).data.items;

      this.userInfo = result[0].data.items[0];
      this.userQuestions = result[2].data.items;
      this.userTopTags = result[3].data.items.map((tag: any) => tag.tag_name).slice(0, 15);
      this.userBadges = result[4].data.items;
    } catch (e: any) {
      this.searchResultsError$.next(e.response?.data as ErrorResponse);
    }

    this.isLoading = false;
    this.cdRef.markForCheck();
  }

  openQuestion(question: any): void {
    window.open(question.link, '_blank');
  }
}
