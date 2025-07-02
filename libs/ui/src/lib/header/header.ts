import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
