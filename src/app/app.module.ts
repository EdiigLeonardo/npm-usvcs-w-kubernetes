import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { JokeListComponent } from './components/joke-list/joke-list.component';
import { LatestJokeComponent } from './components/latest-joke/latest-joke.component';
import { NpmExplorerComponent } from './components/npm-explorer/npm-explorer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NpmStatusComponent } from './pages/npm-status/npm-status.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LibraryHubComponent } from './pages/library-hub/library-hub.component';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {path: "libraryhub", component: LibraryHubComponent},
  {path: "npmstatus", component: NpmStatusComponent},
  {path: "search", component: SearchPageComponent}
  
];


@NgModule({
  declarations: [
    AppComponent, JokeListComponent, LatestJokeComponent, NpmExplorerComponent, HomePageComponent, NpmStatusComponent, SearchPageComponent, LibraryHubComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
