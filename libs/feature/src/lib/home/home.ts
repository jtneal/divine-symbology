import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppService } from '@divine-symbology/data-access';
import { Main } from '@divine-symbology/ui';

@Component({
  selector: 'lib-home',
  imports: [CommonModule, Main],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly service = inject(AppService);

  symbols$ = this.service.getSymbols();
}
