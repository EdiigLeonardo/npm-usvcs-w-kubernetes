import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  eventName: string;
  handler1: string;
  handler2: string;
  btext: string;

  constructor() {
    this.eventName = "";
    this.handler1 = ".A.";
    this.handler2 = ".B.";
    this.btext = "Add Text";
  }

  ngOnInit() {
  }

  updateTextEventHandler(event: string): string {
    console.log("Got event " + event + " from latest-joke in app-component");
    this.handler1 = event;
    this.handler2 = event;
    return event;
  }
}
