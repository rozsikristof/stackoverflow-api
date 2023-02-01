import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';

const IMPORTED_COMPONENTS = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  InputFieldComponent
];

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [IMPORTED_COMPONENTS],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent {
  @Input() placeholder = '';
  @Output() searchValueEvent = new EventEmitter<string>();
  @Input() set searchTerm(value: string) {
    this._searchTerm = value;

    this.formGroup = new FormGroup(
      {
        searchTerm: new FormControl(this.searchTerm)
      }
    );
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  formGroup: FormGroup = {} as FormGroup;

  private _searchTerm = '';

  submitForm(): void {
    const value = this.formGroup.get('searchTerm').value;
    this.searchValueEvent.emit(value);
  }
}
