import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SymbolDto } from '@divine-symbology/util';

@Component({
  selector: 'lib-symbol',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './symbol.html',
  styleUrl: './symbol.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Symbol implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  favorite = false;

  get symbol(): SymbolDto {
    return this.data.symbol;
  }

  ngOnInit(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]') as string[];

    this.favorite = favorites.includes(`${this.symbol.category}:${this.symbol.name}`);
  }

  toggleFavorite(): void {
    this.favorite = !this.favorite;

    const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]') as string[];
    const key = `${this.symbol.category}:${this.symbol.name}`;

    if (this.favorite && !favorites.includes(key)) {
      favorites.push(key);
    }

    if (!this.favorite) {
      const index = favorites.indexOf(key);

      if (index > -1) {
        favorites.splice(index, 1);
      }
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
