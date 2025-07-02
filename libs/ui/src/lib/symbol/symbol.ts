import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SymbolDto } from '@divine-symbology/util';

@Component({
  selector: 'lib-symbol',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './symbol.html',
  styleUrl: './symbol.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Symbol {
  data = inject(MAT_DIALOG_DATA);

  get symbol(): SymbolDto {
    return this.data.symbol;
  }
}
