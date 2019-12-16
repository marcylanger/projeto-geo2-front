import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaProdutivaDetailComponent } from './area-produtiva-detail.component';

describe('AreaProdutivaDetailComponent', () => {
  let component: AreaProdutivaDetailComponent;
  let fixture: ComponentFixture<AreaProdutivaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaProdutivaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaProdutivaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
