export interface INpmStatusState {
    uuid: string;
    db_name: string;
    engine: string;
  }

  export interface ILibraryInfo{
    name: string;
    description: string;
    distTags: string;
    latest: string;
    homepage: string;
    license: string;
  }

  export interface ProxyInterface{
    url: string,
    res: string
}