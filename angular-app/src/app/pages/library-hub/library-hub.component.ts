import { Component, OnInit } from '@angular/core';
import { NpmExplorerService } from 'src/app/services/npm-service.service';

@Component({
  selector: 'app-library-hub',
  templateUrl: './library-hub.component.html',
  styleUrls: ['../../app.component.scss']
})
export class LibraryHubComponent implements OnInit {

  inputValue: string = "";
  value :  string = "";

  libraryInfo: any = {
    name: "",
    description: "",
    distTags: "",
    latest: "",
    homepage: "",
    license: "",
  };

  onKeyDown(event: KeyboardEvent) {

    if (event.key === 'Enter') {
      this.value = this.inputValue;
      this.inputValue ="";

      this.serviceIntance.getNpmLibraryInfo(this.value).subscribe((state: any)=>{
        this.libraryInfo = {
            name: state.name,
            description: state.description,
            distTags: state.distTags,
            latest: state.latest,
            homepage: state.homepage,
            license: state.license
      };
      })
    }

  }

  constructor(private serviceIntance: NpmExplorerService) { }

  ngOnInit(): void {

  }


}
