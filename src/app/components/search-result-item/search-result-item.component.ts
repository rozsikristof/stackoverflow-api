import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultItem } from 'src/app/common/interfaces/search-api.interface';
import { TagsComponent } from '../tags/tags.component';

const importedComponents = [
  CommonModule,
  TagsComponent
];

@Component({
  selector: 'app-search-result-item',
  standalone: true,
  imports: [importedComponents],
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
