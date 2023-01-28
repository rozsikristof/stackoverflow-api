import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent {
  @Input() placeholder = '';
  @Output() userEventResult = new EventEmitter<string>();
  @Input() set initValue(value: string) {
    this.inputValue = value;
  }

  inputValue = '';

  userEvent(): void {
    this.userEventResult.emit(this.inputValue);
  }
}
