import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaProdutivaFormComponent } from './area-produtiva-form.component';

describe('AreaProdutivaFormComponent', () => {
  let component: AreaProdutivaFormComponent;
  let fixture: ComponentFixture<AreaProdutivaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaProdutivaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaProdutivaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
