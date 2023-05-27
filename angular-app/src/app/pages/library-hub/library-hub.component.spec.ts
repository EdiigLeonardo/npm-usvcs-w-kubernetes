import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NpmExplorerService } from 'src/app/services/npm-service.service';
import { LibraryHubComponent } from './library-hub.component';

describe('LibraryHubComponent', () => {
  let component: LibraryHubComponent;
  let fixture: ComponentFixture<LibraryHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryHubComponent ],
      imports: [ HttpClientTestingModule, FormsModule],
      providers: [ NpmExplorerService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
