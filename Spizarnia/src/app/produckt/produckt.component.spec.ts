import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducktComponent } from './produckt.component';

describe('ProducktComponent', () => {
  let component: ProducktComponent;
  let fixture: ComponentFixture<ProducktComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducktComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
