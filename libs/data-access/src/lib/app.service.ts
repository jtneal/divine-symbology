import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SymbolDto } from '@divine-symbology/util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http = inject(HttpClient);

  getSymbols(): Observable<SymbolDto[]> {
    return this.http.get<SymbolDto[]>('/api/symbols.json');
  }
}
