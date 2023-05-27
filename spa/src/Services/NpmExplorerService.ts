import axios from 'axios';
import { Service } from 'typedi';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ILibraryInfo } from '../Pages/LibraryHub';
import { ProxyInterface } from '../Interfaces/Interfaces';

@Service()
export default class NpmExplorerService {
    private count: number = 0;

    printMessage() {
        //console.log('I am alive! ' + this.count++);
    }

    getNPMRegistryState(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            axios.get("https://api.local/packageInfo").then(response => {
                const packageInfo = {
                    uuid: response.data.uuid,
                    db_name: response.data.db_name,
                    engine: response.data.engine
                  };

                resolve(JSON.stringify(packageInfo));


            }).catch(err => {
                console.log(err);
            });
        })
    }

    getNpmLibraryInfo(libraryName: string): Observable<any> {

        return new Observable<any>(observer => {
          axios.get(`https://api.local/packageInfo/${libraryName}`).then(response => {
            console.log(response.data);
            const packageInfo: any = {
              name: response.data.name,
              description: response.data.description,
              distTags: "latest: " + response.data["dist-tags"].latest + ", next: " + response.data["dist-tags"].next,
              latest: response.data._id + " " + response.data["dist-tags"].latest,
              homepage: response.data.homepage,
              license: response.data.license
            };
            observer.next(packageInfo);
            observer.complete();
          }).catch(error => {
            console.log(error);
            observer.error(error);
          });
        });
      }


      getNpmSearchText(text: string): Observable<any> {
        return new Observable<any>(observer => {
          const packageName: string[] = [];
          const packageDescription: string[] = [];
          let packageKeyWords: any[] = [];
          axios.get(`https://api.local/packageInfo/search/${text}`).then(response => {
            console.log("resposta",response.data.objects[0].package.keywords)
            response.data.objects.forEach((value: any)=>{
              packageName.push(" ",value.package.name);
              packageDescription.push(" ",value.package.description);
              packageKeyWords.push(value.package.keywords);
            });

            packageKeyWords = packageKeyWords.map((value: string[]) => {
              if (value !== undefined) {
                return value.map((element: string) => {
                  return element + " | ";
                });
              }
            });

            this.addNpmRegistry({url: `https://api.local/packageInfo/search/${text}`, res: JSON.stringify({ packageName, packageDescription, packageKeyWords })})

            observer.next({ packageName, packageDescription, packageKeyWords });
            observer.complete();
          }).catch(error => {
            console.log(error);
            observer.error(error);
          });
        });
      }

      async addNpmRegistry(request: ProxyInterface): Promise<any> {
        try {
        const response = await axios.post('https://api.local/npm', request);
        return response.data;
        } catch (error) {
        console.log(error);
        throw error;
        }
      }

      async getResultById(id: number): Promise<ProxyInterface[]> {
        try {
          const response = await axios.get(`https://api.local/npm/${id}`);
          const npmRes: ProxyInterface[] = response.data.map((value: any) => {
            return { url: value.url, res: value.res };
          });
          return npmRes;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
}
