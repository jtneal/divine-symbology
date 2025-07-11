import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SymbolDto } from '@divine-symbology/util';
import { Symbol } from '../symbol/symbol';

@Component({
  selector: 'lib-main',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main implements OnInit {
  dialog = inject(MatDialog);
  symbols = input.required<SymbolDto[]>();
  categories = new FormControl('');
  search = new FormControl('');
  categoryList = [] as string[];
  displayed = [] as SymbolDto[];
  shuffled = [] as SymbolDto[];
  favorites = [] as string[];
  showFavorites = false;

  get showViewMore(): boolean {
    return this.displayed.length < this.shuffled.length;
  }

  ngOnInit(): void {
    const symbols = this.symbols();
    const savedCategories = localStorage.getItem('selectedCategories');
    const savedSearch = localStorage.getItem('searchTerm');
    const savedFavorites = localStorage.getItem('showFavorites');

    this.setCategories(symbols);

    if (savedCategories) {
      this.categories.setValue(JSON.parse(savedCategories));
    }

    if (savedSearch) {
      this.search.setValue(savedSearch);
    }

    if (savedFavorites === 'true') {
      this.toggleFavorites();
    } else {
      this.shuffle(symbols);
    }

    const handler = () => {
      localStorage.setItem('selectedCategories', JSON.stringify(this.categories.value ?? []));
      localStorage.setItem('searchTerm', this.search.value ?? '');
      this.shuffle(symbols);
    };

    this.categories.valueChanges.subscribe(handler);
    this.search.valueChanges.subscribe(handler);
  }

  setCategories(symbols: SymbolDto[]): void {
    this.categoryList = [...new Set(symbols.map((symbol) => symbol.category))];
  }

  reset(): void {
    this.categories.setValue('');
    this.search.setValue('');

    if (this.showFavorites) {
      this.toggleFavorites();
    }
  }

  shuffle(symbols: SymbolDto[]): void {
    let filtered = symbols;

    if (this.categories.value?.length) {
      filtered = filtered.filter((symbol) => this.categories.value?.includes(symbol.category));
    }

    if (this.search.value?.length) {
      const search = this.search.value.toLowerCase();

      filtered = filtered.filter(
        (symbol) => symbol.name.toLowerCase().includes(search) || symbol.description.toLowerCase().includes(search),
      );
    }

    if (this.showFavorites) {
      filtered = filtered.filter((symbol) => this.favorites.includes(`${symbol.category}:${symbol.name}`));
    }

    for (let current = filtered.length - 1; current > 0; current--) {
      const random = Math.floor(Math.random() * current);
      const temp = filtered[current];

      filtered[current] = filtered[random];
      filtered[random] = temp;
    }

    this.shuffled = filtered;
    this.displayed = filtered.slice(0, 25);
  }

  toggleFavorites(): void {
    this.showFavorites = !this.showFavorites;
    localStorage.setItem('showFavorites', String(this.showFavorites));
    this.favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]') as string[];
    this.shuffle(this.symbols());
  }

  random(): void {
    const symbols = this.symbols();
    const randomIndex = Math.floor(Math.random() * symbols.length);
    const randomSymbol = symbols[randomIndex];
    this.openSymbol(randomSymbol);
  }

  openSymbol(symbol: SymbolDto): void {
    this.dialog.open(Symbol, { data: { symbol } });
  }

  viewMore(): void {
    this.displayed = this.shuffled.slice(0, this.displayed.length + 25);
  }
}
