import { Component, OnInit } from '@angular/core';
import { faTimesRectangle as faTimes} from '@fortawesome/free-regular-svg-icons';
import { NpmExplorerService } from 'src/app/services/npm-service.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../../app.component.scss']
})

export class HomePageComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {}

}

