import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, interval } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NpmExplorerService {
  interval5Secs: Observable<number>;
  publishPackageInfo: Subject<string>;

  constructor(private http: HttpClient) {
    this.publishPackageInfo = new Subject<string>();
    this.interval5Secs = interval(1000);

    this.interval5Secs.subscribe({
      next: (intervalNumber: number) => {
        this.getNPMRegistryState().subscribe({
          next: (packageInfo: string) => {

            this.publishPackageInfo.next(packageInfo);

          }
        });
      }
    });
  }

  getNPMRegistryState(): Observable<any> {
    return this.http.get<any>('http://api.local/packageInfo').pipe(
      map(response => {
        const packageInfo = {
          uuid: response.uuid,
          db_name: response.db_name,
          engine: response.engine
        };

        const valueOfStorage: any = { url: `http://api.local/packageInfo`, res: JSON.stringify(response) };
        //this.storeDataInLocalStorage(valueOfStorage.url, valueOfStorage.res, "NpmStatus");

        return JSON.stringify(packageInfo);
      }),
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  getNpmRegistryStateInstantaneous(): Observable<any>{
    return  this.http.get<any>('http://api.local/packageInfo').pipe(
      map(response => {
        const packageInfo = {
          uuid: response.uuid,
          db_name: response.db_name,
          engine: response.engine
        };

        const valueOfStorage: any = { url: `http://api.local/packageInfo`, res: JSON.stringify(response) };
        this.storeDataInLocalStorage(valueOfStorage.url, valueOfStorage.res, "NpmStatus");
        this.addNpmRegistry({ url: valueOfStorage.url, res: valueOfStorage.res });

        return JSON.stringify(packageInfo);
      }),
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  getNpmLibraryInfo(libraryName: string): Observable<any> {
    return this.http.get<any>(`http://api.local/packageInfo/${libraryName}`).pipe(
      map(response => {
        if(libraryName === "" || libraryName === " "){
          return {res: ""};
        }

        const packageInfo: any = {
          name: response.name,
          description: response.description,
          distTags: "latest: " + response["dist-tags"].latest,
          latest: response._id + " " + response["dist-tags"].latest,
          homepage: response.homepage,
          license: response.license
        };

        const valueOfStorage: any = { url: `http://api.local/packageInfo/${libraryName}`, res: JSON.stringify(response) };

        this.storeDataInLocalStorage(valueOfStorage.url, valueOfStorage.res, "LibraryInfo")

        this.addNpmRegistry({ url: valueOfStorage.url, res: valueOfStorage.res });

        return packageInfo;
      }),
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  getNpmSearchText(text: string): Observable<any> {
    return this.http.get<any>(`http://api.local/packageInfo/search/${text}`).pipe(
      map(response => {

        const valueOfStorage: any = { url: `http://api.local/packageInfo/search/${text}`, res: JSON.stringify(response)};

        this.storeDataInLocalStorage(valueOfStorage.url, valueOfStorage.res, "SearchKeyword")
        this.addNpmRegistry({ url: valueOfStorage.url, res: valueOfStorage.res });

        return {response};
      }),
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  async addNpmRegistry(request: any): Promise<any> {
    try {
      const response = await this.http.post('http://api.local/npm', request).toPromise();
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getResultById(id: number): Promise<any[]> {
    try {
      const response: any = await this.http.get(`http://api.local/npm/${id}`).toPromise();
      const npmRes: any[] = response.map((value: any) => {
        return { url: value.url, res: value.res };
      });
      return npmRes;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  storeDataInLocalStorage(url: string, response: any, key: string) {
    let store: any = window.localStorage.getItem(key);
    let aux: any[] = []
    if(store !== null){
      store = JSON.parse(store);
      store.forEach((element: any) => {
        aux.push(element);
      });
    }
    aux.unshift({url: url,res: response})
    window.localStorage.setItem(key, JSON.stringify(aux));
  }
}
