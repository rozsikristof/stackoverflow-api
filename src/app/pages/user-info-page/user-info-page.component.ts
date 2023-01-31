import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/components/common/loading/loading.component';

const IMPORTED_COMPONENTS = [
  CommonModule,
  LoadingComponent
];

@Component({
  selector: 'app-user-info-page',
  standalone: true,
  imports: [IMPORTED_COMPONENTS],
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoPageComponent {

}
