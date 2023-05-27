// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { waitForAsync, TestBed, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { JokeService } from 'src/app/services';
// import { LatestJokeComponent } from './latest-joke.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// const serviceInjectedStub = {
//     get<Joke>(url:string){
//         console.log("serviceInjectedStub called");
//     }
// }

// describe('Component: Button', () => {
//     let fixture: ComponentFixture<LatestJokeComponent>;
//     let component: LatestJokeComponent;

//     beforeEach(
//         //waitForAsync(
//         () => {
//             TestBed.configureTestingModule({
//                 imports: [],
//                 declarations: [LatestJokeComponent],
//                 providers: [JokeService, { provide: HttpClient, useValue: serviceInjectedStub }]
//             }).compileComponents().then(() => {
//                 fixture = TestBed.createComponent(LatestJokeComponent);
//                 component = fixture.componentInstance;
//             });
//             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//         }
//         //)
//     );

//     it('should call addTextClick when clicked',
//         //fakeAsync(
//         () => {
//             spyOn(component, 'addTextClick');
//             let button = fixture.debugElement.nativeElement.querySelector('button');
//             button.click();
//             //tick(5000);
//             expect(component.addTextClick).toHaveBeenCalled();
//         }
//         //)
//     );
// });

