import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Joke } from "../models";
import { JokeService } from "./joke.service";

let httpClientSpy: jasmine.SpyObj<HttpClient>;

describe('JokeService', () => {
    let service: JokeService;
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new JokeService(httpClientSpy);
    });

    it('should return expected joke (HttpClient called once)', (done: DoneFn) => {
        const expectedJoke: Joke = { icon_url: "", id: "", url: "", value: "xyz", categories: [], created_at: new Date() };

        httpClientSpy.get.and.returnValue(of(expectedJoke));

        service.getJokes().subscribe({
            next: result => {
                expect(result)
                    .toEqual("xyz");
                done();
            },
            error: done.fail
        });
        expect(httpClientSpy.get.calls.count())
            .withContext('one call')
            .toBe(1);
    });


});

