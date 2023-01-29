import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from 'src/app/components/common/input-field/input-field.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/api/search.service';
import { SearchParams, SearchResultItem } from 'src/app/common/interfaces/search-api.interface';
import { SearchResultItemComponent } from 'src/app/components/search-result-item/search-result-item.component';
import { BehaviorSubject } from 'rxjs';
import { ErrorResponse } from 'src/app/common/interfaces/error-response.interface';
import { AxiosError } from 'axios';
import { FormatError } from 'src/app/common/pipes/format-error';
import { LoadingComponent } from 'src/app/components/common/loading/loading.component';

const importedComponents = [
  CommonModule,
  InputFieldComponent,
  SearchResultItemComponent,
  FormatError,
  LoadingComponent
];

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [importedComponents],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
  searchTerm = '';
  searchResult$ = new BehaviorSubject<SearchResultItem[] | null>(null);
  searchResultsError$ = new BehaviorSubject<ErrorResponse | null>(null);
  searchHasParsingError$ = new BehaviorSubject<boolean>(false);
  isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly searchService: SearchService
  ) {
    this.searchTerm = this.activatedRoute.snapshot.queryParams['searchTerm'];
    this.executeSearch();
  }

  async receiveInputValue(inputValue: string): Promise<void> {
    this.searchTerm = inputValue;

    await this.saveSearchTermInQueryParams();
    await this.executeSearch();
  }

  private async executeSearch(): Promise<void> {
    this.initializeData();

    if (!this.searchTerm) {
      return;
    }

    const searchParams: SearchParams = {
      intitle: this.searchTerm,
      page: 1
    };

    this.isLoading = true;

    await this.searchService.search(searchParams).then(result => {

      if (result.items?.length) {
        this.searchHasParsingError$.next(result.parse_error);
      }

      this.searchResult$.next(result.items);
    }).catch((error: AxiosError) => {
      this.searchResultsError$.next(error.response?.data as ErrorResponse);
    });

    this.isLoading = false;
  }

  private async saveSearchTermInQueryParams(): Promise<void> {
    await this.router.navigate([], {
      queryParams: {
        searchTerm: this.searchTerm
      },
      queryParamsHandling: 'merge'
    });
  }

  private initializeData(): void {
    this.searchResult$.next([]);
    this.searchResultsError$.next(null);
    this.searchHasParsingError$.next(false);
  }
}
