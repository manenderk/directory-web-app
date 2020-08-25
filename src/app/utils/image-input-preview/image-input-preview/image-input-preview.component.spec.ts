import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputPreviewComponent } from './image-input-preview.component';

describe('ImageInputPreviewComponent', () => {
  let component: ImageInputPreviewComponent;
  let fixture: ComponentFixture<ImageInputPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageInputPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
