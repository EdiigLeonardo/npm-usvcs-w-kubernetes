import { Component, OnInit } from '@angular/core';
import { JokeService } from 'src/app/services';


@Component({
  selector: 'joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent implements OnInit {
  jokes: string[];

  constructor(private jokeService: JokeService) {
    this.jokes = [];


    this.jokeService.getPublishJoke().subscribe({
      next: (value: string) => {
        this.jokes.push(value);
      }
    });
  }

  ngOnInit() { }
}
