import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpmExplorerComponent } from './npm-explorer.component';

describe('NpmExplorerComponent', () => {
  let component: NpmExplorerComponent;
  let fixture: ComponentFixture<NpmExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpmExplorerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpmExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
