import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultItem } from 'src/app/common/interfaces/search-api.interface';

@Component({
  selector: 'app-search-result-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultItemComponent {
  @Input() searchItem: SearchResultItem = {} as SearchResultItem;

  openQuestionInNewTab(): void {
    window.open(this.searchItem.link, '_blank');
  }
}
