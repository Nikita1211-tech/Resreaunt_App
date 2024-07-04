import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrauntListComponent } from './restraunt-list.component';

describe('RestrauntListComponent', () => {
  let component: RestrauntListComponent;
  let fixture: ComponentFixture<RestrauntListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestrauntListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestrauntListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
