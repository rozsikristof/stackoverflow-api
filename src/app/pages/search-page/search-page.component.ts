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
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';


const IMPORTED_COMPONENTS = [
  CommonModule,
  InputFieldComponent,
  SearchResultItemComponent,
  FormatError,
  LoadingComponent,
  ReactiveFormsModule,
  FormsModule,
  PaginationComponent
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
  searchFormGroup: FormGroup = {} as FormGroup;
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
    this.initializeForm();
    this.executeSearch();
  }

  async executeSearch(): Promise<void> {
    this.initializeData();

    this.searchTerm = this.getFormControl('searchTerm').value;

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

    await this.searchService.search(searchParams).then(result => {
    this.searchResult$.next(result.items);
    }).catch((error: AxiosError) => {
      this.searchResultsError$.next(error.response?.data as ErrorResponse);
    });

    this.isLoading = false;
  }

  pageNumberChangeEvent(isPreviousClicked: boolean): void {
    isPreviousClicked ? this.pageNumber-- : this.pageNumber++;
    this.executeSearch();
  }

  hideErrorMessage(): void {
    this.hideError = true;
  }

  private getFormControl(controlName: string): AbstractControl {
    return this.searchFormGroup.get(controlName);
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

  private initializeForm(): void {
    this.searchFormGroup = new FormGroup(
      {
        searchTerm: new FormControl(this.searchTerm)
      }
    );
  }
}
