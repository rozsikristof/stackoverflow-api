import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() set pageNumber(value: number) {
    this._pageNumber = value;
    this.isPreviousDisabled = value === 1;
    this.cdRef.markForCheck();
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  private _pageNumber = 1;

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  isPreviousDisabled = false;
}
