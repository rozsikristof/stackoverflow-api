import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent {
  @Input() tags: string[] = [];
}
