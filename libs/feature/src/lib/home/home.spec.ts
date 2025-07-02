import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from '@divine-symbology/data-access';
import { of } from 'rxjs';
import { Home } from './home';

describe(Home.name, () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        {
          provide: AppService,
          useValue: { getSymbols: () => of([]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
