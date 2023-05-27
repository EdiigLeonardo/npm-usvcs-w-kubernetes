import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LatestJokeComponent } from './components/latest-joke/latest-joke.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NpmExplorerComponent } from './components/npm-explorer/npm-explorer.component';
import { LibraryHubComponent } from './pages/library-hub/library-hub.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NpmStatusComponent } from './pages/npm-status/npm-status.component';
import { NpmExplorerService } from './services/npm-service.service';

describe('AppComponent', () => {
  let npmService: NpmExplorerService;

  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NpmExplorerComponent, LibraryHubComponent, HomePageComponent, SearchPageComponent, NpmStatusComponent],
      providers: [NpmExplorerService],
      imports: [
        RouterTestingModule, HttpClientModule, FormsModule
      ]
    }).compileComponents();

    npmService = TestBed.inject(NpmExplorerService);
  });

  it('NpmExplorer should be created', () => {
    expect(npmService).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
