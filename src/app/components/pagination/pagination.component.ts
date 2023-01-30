import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';


@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Output() pageNumberChangeEvent = new EventEmitter<boolean>();
  @Input() set pageNumber(value: number) {
    this._pageNumber = value;
    this.isPreviousDisabled = value === 1;
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  private _pageNumber = 1;

  isPreviousDisabled = false;

  changePageNumber(isPreviousClicked: boolean): void {
    if (isPreviousClicked) {
      if (this.pageNumber > 1) {
        this.pageNumberChangeEvent.emit(isPreviousClicked);
      }
    } else {
      this.pageNumberChangeEvent.emit(isPreviousClicked);
    }
  }
}
