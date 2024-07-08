import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrauntPreviewComponent } from './restraunt-preview.component';

describe('RestrauntPreviewComponent', () => {
  let component: RestrauntPreviewComponent;
  let fixture: ComponentFixture<RestrauntPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestrauntPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestrauntPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
