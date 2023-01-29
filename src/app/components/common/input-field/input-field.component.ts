import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { OnInit } from '@angular/core';

const IMPORTED_COMPONENTS = [
  CommonModule,
  FormsModule,
  NgxTrimDirectiveModule,
  ReactiveFormsModule
];

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [IMPORTED_COMPONENTS],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent implements OnInit {
  @Input() placeholder = '';
  @Input() group: FormGroup = {} as FormGroup;
  @Input() controlName = '';

  formControl: AbstractControl = {} as AbstractControl;

  ngOnInit(): void {
    if (this.group && this.controlName) {
      this.formControl = this.group?.get(this.controlName);
    }
  }
}
