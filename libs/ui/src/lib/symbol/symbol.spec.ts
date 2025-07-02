import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Symbol } from './symbol';

describe(Symbol.name, () => {
  let component: Symbol;
  let fixture: ComponentFixture<Symbol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Symbol],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { symbol: { category: '', name: '', image: '', description: '' } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Symbol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
