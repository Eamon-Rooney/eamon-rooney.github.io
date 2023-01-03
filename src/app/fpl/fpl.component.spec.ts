import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FplComponent } from './fpl.component';

describe('ArticleComponent', () => {
  let component: FplComponent;
  let fixture: ComponentFixture<FplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
