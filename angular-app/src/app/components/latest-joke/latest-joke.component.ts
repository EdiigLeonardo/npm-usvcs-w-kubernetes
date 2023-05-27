import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JokeService } from 'src/app/services';

@Component({
    selector: 'latest-joke',
    templateUrl: './latest-joke.component.html',
    styleUrls: ['./latest-joke.component.scss']
})
export class LatestJokeComponent implements OnInit {
    @Input() buttonText: string;
    @Output() updateTextEvent = new EventEmitter<string>();
    latestJoke: string;
    text: string;

    constructor(private jokeService: JokeService) {
        this.latestJoke = "Latest Chuck Norris Joke";
        this.text = "";
        this.buttonText = "";

        this.jokeService.getPublishJoke().subscribe({
            next: (value: string) => {
                this.latestJoke = value;
            }
        });
    }

    ngOnInit() { }

    addTextClick() {
        console.log("Called addTextClick");
        this.updateTextEvent.emit("Clicked on Add text");
        this.latestJoke = this.latestJoke + " " + this.text;
    }

}
