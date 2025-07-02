import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer, Header } from '@divine-symbology/ui';

@Component({
  selector: 'app-root',
  imports: [Footer, Header, RouterModule],
  template: `
    <lib-header />
    <router-outlet />
    <lib-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
