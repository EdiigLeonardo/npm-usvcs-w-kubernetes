import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LibraryHubComponent } from './pages/library-hub/library-hub.component';
import { NpmStatusComponent } from './pages/npm-status/npm-status.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';


@NgModule({
  imports: [RouterModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
