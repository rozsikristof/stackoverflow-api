import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from 'src/app/components/common/input-field/input-field.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/api/search.service';
import { SearchParams, SearchResultItem } from 'src/app/common/interfaces/search-api.interface';
import { SearchResultItemComponent } from 'src/app/components/search-result-item/search-result-item.component';
import { BehaviorSubject } from 'rxjs';

const importedComponents = [
  CommonModule,
  InputFieldComponent,
  SearchResultItemComponent
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
    if (!this.searchTerm) {
      return;
    }

    const searchParams: SearchParams = {
      intitle: this.searchTerm
    };

    const result = await this.searchService.search(searchParams);
    this.searchResult$.next(result.items);
  }

  private async saveSearchTermInQueryParams(): Promise<void> {
    await this.router.navigate([], {
      queryParams: {
        searchTerm: this.searchTerm
      },
      queryParamsHandling: 'merge'
    });
  }
}
