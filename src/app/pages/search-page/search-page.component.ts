import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from 'src/app/components/input-field/input-field.component';
import { ActivatedRoute, Router } from '@angular/router';

const importedComponents = [
  InputFieldComponent
];

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    ...importedComponents
  ],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
  searchTerm = '';

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.searchTerm = this.activatedRoute.snapshot.queryParams['searchTerm'];
  }

  async receiveInputValue(inputValue: string): Promise<void> {
    await this.router.navigate([], {
      queryParams: {
        searchTerm: inputValue
      },
      queryParamsHandling: 'merge'
    });

    this.executeSearch(inputValue);
  }

  private executeSearch(searchTerm: string): void {
    console.log(searchTerm);
  }
}
