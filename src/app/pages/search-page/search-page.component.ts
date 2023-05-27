import { Component, OnInit } from '@angular/core';
import { NpmExplorerService } from 'src/app/services/npm-service.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['../../app.component.scss']
})
export class SearchPageComponent implements OnInit {
  inputValue: string = "";
  value :  string = "";

  libraryInfo: any = {
    packageName: [],
    packageDescription: [],
    packageKeyWords: []
  };



  constructor(private serviceInstance: NpmExplorerService) { }

  ngOnInit(): void {

  }


  onKeyDown(event: KeyboardEvent) {

    if (event.key === 'Enter') {
      this.value = this.inputValue;
      this.inputValue ="";

      this.serviceInstance.getNpmSearchText(this.value).subscribe((state: any)=>{
        const packageName: any[] = []
        const packageDescription: any[] = []
        let packageKeyWords: any[] = []

        state.response.objects.forEach((value: any, index: number)=>{
          if(index<=5){
            packageName.push(value.package.name, " ");
            packageDescription.push(value.package.description, " ");
            packageKeyWords.push(value.package.keywords, " ");
          }
        })

        this.libraryInfo = {
          packageName: packageName,
          packageDescription: packageDescription,
          packageKeyWords: packageKeyWords
        };

        /* const valueOfStorage: any = { url: `http://localhost:3000/packageInfo/search/${this.value}`, res: JSON.stringify(this.libraryInfo) };
        this.serviceInstance.storeDataInLocalStorage(valueOfStorage.url, valueOfStorage.res, "SearchKeyWord");
        this.serviceInstance.addNpmRegistry({ url: valueOfStorage.url, res: valueOfStorage.res }); */
      })
    }

  }

}
