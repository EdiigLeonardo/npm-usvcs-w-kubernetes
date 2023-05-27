import { Component, OnInit } from '@angular/core';
import { NpmExplorerService } from "../../services/npm-service.service"

@Component({
  selector: 'app-npm-status',
  templateUrl: './npm-status.component.html',
  styleUrls: ['../../app.component.scss']
})
export class NpmStatusComponent implements OnInit {
  stateOfNpm: any = {
    uuid: "",
    db_name: "",
    engine: ""
  };

  constructor(private serviceInstance: NpmExplorerService) {}

  ngOnInit() {
    if(this.stateOfNpm.uuid === ""){
      this.serviceInstance.getNpmRegistryStateInstantaneous().subscribe((state: any) => {
        this.stateOfNpm = JSON.parse(state);

        //const valueOfStorage: any = { url: `http://localhost:3000/packageInfo`, res: JSON.stringify(this.stateOfNpm) };
        //this.serviceInstance.storeDataInLocalStorage(valueOfStorage.url, valueOfStorage.res, "NpmStatus");

      });
    }
    this.serviceInstance.getNPMRegistryState().subscribe((state: any) => {
      this.stateOfNpm = JSON.parse(state);

      //const valueOfStorage: any = { url: `http://localhost:3000/packageInfo`, res: JSON.stringify(this.stateOfNpm) };
      //this.serviceInstance.storeDataInLocalStorage(valueOfStorage.url, valueOfStorage.res, "NpmStatus");

    });

    setInterval(() => {
      this.serviceInstance.getNPMRegistryState().subscribe((state: any) => {
        this.stateOfNpm = JSON.parse(state);

        const valueOfStorage: any = { url: `http://localhost:3000/packageInfo`, res: JSON.stringify(this.stateOfNpm) };
        this.serviceInstance.storeDataInLocalStorage(valueOfStorage.url, valueOfStorage.res, "NpmStatus");

      });
    }, 10000);

  }
}
