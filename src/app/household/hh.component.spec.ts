/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HhComponent } from './hh.component';

xdescribe('HhComponent', () => {
  let component: HhComponent;
  let fixture: ComponentFixture<HhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
