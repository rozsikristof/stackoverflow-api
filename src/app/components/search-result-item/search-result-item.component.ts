import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultItem } from 'src/app/common/interfaces/search-api.interface';
import { TagsComponent } from '../tags/tags.component';
import * as he from 'he';

const IMPORTED_COMPONENTS = [
  CommonModule,
  TagsComponent
];

const DATE_CORRECTION = 1000;
const MIN_THOUSAND = 1000;
@Component({
  selector: 'app-search-result-item',
  standalone: true,
  imports: [IMPORTED_COMPONENTS],
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultItemComponent {
  private _searchItem = {} as SearchResultItem;

  @Input() set searchItem(value: SearchResultItem) {
    this._searchItem = {
      ...value,
      owner: {
        ...value.owner,
        display_name: he.decode(value.owner.display_name)
      },
      creation_date: new Date(value.creation_date * DATE_CORRECTION).toUTCString()
    };
  }

  get searchItem(): SearchResultItem {
    return this._searchItem;
  }

  getParsedViewCount(viewCount: number): string {
    if (viewCount > MIN_THOUSAND) {
      return `${ Math.floor(viewCount / MIN_THOUSAND) }k`;
    }

    return `${ viewCount }`;
  }

  openQuestionInNewTab(): void {
    window.open(this.searchItem.link, '_blank');
  }

  openUserProfileInNewTab(): void {
    window.open(this.searchItem.owner.link, '_blank');
  }
}
