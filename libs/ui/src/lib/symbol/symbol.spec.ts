import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Symbol } from './symbol';

describe(Symbol.name, () => {
  let component: Symbol;
  let fixture: ComponentFixture<Symbol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Symbol],
    }).compileComponents();

    fixture = TestBed.createComponent(Symbol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
