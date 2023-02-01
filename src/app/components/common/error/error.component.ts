import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatError } from 'src/app/common/pipes/format-error';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, FormatError],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
  @Input() errorMessage = '';
  @Input() errorId = '';
}
