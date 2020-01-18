import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistExpandedComponent } from './playlist-expanded.component';

describe('PlaylistExpandedComponent', () => {
  let component: PlaylistExpandedComponent;
  let fixture: ComponentFixture<PlaylistExpandedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistExpandedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
