import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/api/search.service';
import { SearchParams, SearchResultItem } from 'src/app/common/interfaces/search-api.interface';
import { SearchResultItemComponent } from 'src/app/components/search-result-item/search-result-item.component';
import { BehaviorSubject } from 'rxjs';
import { ErrorResponse } from 'src/app/common/interfaces/error-response.interface';
import { LoadingComponent } from 'src/app/components/common/loading/loading.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { SearchFormComponent } from 'src/app/components/common/search-form/search-form.component';
import { ErrorComponent } from 'src/app/components/common/error/error.component';


const IMPORTED_COMPONENTS = [
  CommonModule,
  SearchResultItemComponent,
  LoadingComponent,
  PaginationComponent,
  SearchFormComponent,
  ErrorComponent
];

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [IMPORTED_COMPONENTS],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
  searchTerm = '';
  searchResult$ = new BehaviorSubject<SearchResultItem[] | null>(null);
  searchResultsError$ = new BehaviorSubject<ErrorResponse | null>(null);
  isLoading = false;
  pageNumber = 1;
  hideError = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchService: SearchService
  ) {
    this.searchTerm = this.activatedRoute.snapshot.queryParams['searchTerm'];
    this.pageNumber = +this.activatedRoute.snapshot.queryParams['pageNumber'] || 1;
    this.executeSearch(this.searchTerm);
  }

  async executeSearch(event: string): Promise<void> {
    this.initializeData();

    this.searchTerm = event;

    if (!this.searchTerm) {
      this.searchResult$.next(null);
      return;
    }

    await this.saveSearchTermInQueryParams();

    const searchParams: SearchParams = {
      intitle: this.searchTerm,
      page: this.pageNumber
    };

    this.isLoading = true;

    try {
      const result = await this.searchService.search(searchParams);
      this.searchResult$.next(result.items);
    } catch(e: any) {
      this.searchResultsError$.next(e.response?.data as ErrorResponse);
    }

    this.isLoading = false;
  }

  pageNumberChangeEvent(isPreviousClicked: boolean): void {
    isPreviousClicked ? this.pageNumber-- : this.pageNumber++;
    this.executeSearch(this.searchTerm);
  }

  hideErrorMessage(): void {
    this.hideError = true;
  }

  private async saveSearchTermInQueryParams(): Promise<void> {
    await this.router.navigate([], {
      queryParams: {
        searchTerm: this.searchTerm,
        pageNumber: this.pageNumber
      },
      queryParamsHandling: 'merge'
    });
  }

  private initializeData(): void {
    this.searchResult$.next([]);
    this.searchResultsError$.next(null);
  }
}
