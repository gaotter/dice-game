import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadruleComponent } from './uploadrule.component';

describe('UploadruleComponent', () => {
  let component: UploadruleComponent;
  let fixture: ComponentFixture<UploadruleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadruleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
