import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRestrauntComponent } from './book-restraunt.component';

describe('BookRestrauntComponent', () => {
  let component: BookRestrauntComponent;
  let fixture: ComponentFixture<BookRestrauntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookRestrauntComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookRestrauntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
