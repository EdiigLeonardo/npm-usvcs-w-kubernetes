import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NpmStatusComponent } from './npm-status.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NpmExplorerService } from '../../services/npm-service.service';


describe('NpmStatusComponent', () => {
  let component: NpmStatusComponent;
  let fixture: ComponentFixture<NpmStatusComponent>;
  let service: NpmExplorerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpmStatusComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ NpmExplorerService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpmStatusComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(NpmExplorerService);
    //spyOn(service, 'getNpmStatus').and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

