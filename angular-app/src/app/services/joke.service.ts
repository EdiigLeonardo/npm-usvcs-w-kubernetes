import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, Observable, Subject } from 'rxjs';
import { Joke } from '../models';
@Injectable({
  providedIn: 'root'
})
export class JokeService {
  private API_BASE_URL = 'http://api.chucknorris.io';
  interval5Secs: Observable<number>;
  publishJoke: Subject<string>;

  constructor(private http: HttpClient) {
    this.publishJoke = new Subject<string>();
    this.interval5Secs = interval(5000);

    this.interval5Secs.subscribe({
      next: (intervalNumber: number) => {
        this.getJokes().subscribe({
          next: (joke: string) => {
            this.publishJoke.next(joke);
            window.localStorage.setItem("lastJoke", joke);
          }
        });
      }
    });
  }

  getPublishJoke() {
    return this.publishJoke;
  }

  getJokes(): Observable<string> {
    return this.http
      .get<Joke>(`${this.API_BASE_URL}/jokes/random`).pipe(map(joke => joke.value));
  }

}
