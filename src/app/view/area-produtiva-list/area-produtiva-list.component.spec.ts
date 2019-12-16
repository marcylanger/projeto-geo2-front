import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaProdutivaListComponent } from './area-produtiva-list.component';

describe('AreaProdutivaListComponent', () => {
  let component: AreaProdutivaListComponent;
  let fixture: ComponentFixture<AreaProdutivaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaProdutivaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaProdutivaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
