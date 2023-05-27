import * as React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import NpmExplorerService from '../Services/NpmExplorerService';
import Container from 'typedi';

export interface IAppState {
}

export interface ILibraryInfo{
  name: string;
  description: string;
  distTags: string;
  latest: string;
  homepage: string;
  license: string;
}

export default class LibraryHub extends React.Component<IAppState, ILibraryInfo> {
  serviceInstance: NpmExplorerService;
  changeInputValue: string = "";
  globalStore: any[] = [];

  constructor(props: IAppState) {
    super(props);

    this.serviceInstance = Container.get(NpmExplorerService);

    this.state = {
        name: "",
        description: "",
        distTags: "",
        latest: "",
        homepage: "",
        license:""
    }

  }

  componentDidMount(): void {
    document.title = "Library Info Hub"


  }

  componentWillUnmount(): void {

  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.changeInputValue = event.target.value;
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputValue = event.currentTarget.value;
      this.changeInputValue = inputValue;
      this.serviceInstance.getNpmLibraryInfo(this.changeInputValue).subscribe(
        packageInfo => {
          this.setState({
            name: packageInfo.name,
            description: packageInfo.description,
            distTags: packageInfo["distTags"],
            latest: packageInfo.latest,
            homepage: packageInfo.homepage,
            license: packageInfo.license
          });
        },
        error => {
          console.log(error);
        }

      );

      event.currentTarget.value="";
    }
  }

  //useEffect diferenciado

  componentDidUpdate(prevProps: any, prevState: any) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      let myStore = localStorage.getItem('libraryHistory');
      let globalStore: any[] = [];
      if (myStore !== null) {
        globalStore.push(JSON.parse(myStore));
      }
      globalStore.push(JSON.stringify(this.state))
      localStorage.setItem("libraryHistory", JSON.stringify(globalStore));
      this.serviceInstance.addNpmRegistry({url: `https://api.local/packageInfo/${this.changeInputValue}`, res: JSON.stringify(this.state)})
    }
  }

  public render() {
    //console.log(this.state.distTags);

    return (
      <div className="library-grid2">
        <div className="form-control">
          <FontAwesomeIcon icon={faSearch} />
          <input placeholder="Search" className="input-user" aria-label="input de pesquisar"
          onKeyDown={this.handleKeyDown}/>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="status">
            <div className="status-info">
                <h2 className="status-header">name</h2>
                <span className="status-info_-_details">{this.state.name}</span>
            </div>
            <div className="status-info">
                <h2 className="status-header">description</h2>
                <span className="status-info_-_details">{this.state.description}</span>
            </div>
            <div className="status-info">
                <h2 className="status-header">Dist Tags</h2>
                <span className="status-info_-_details">{this.state.distTags}</span>
            </div>
            <div className="status-info">
                <h2 className="status-header">latest version</h2>
                <span className="status-info_-_details">{this.state.latest}</span>
            </div>
            <div className="status-info">
                <h2 className="status-header"> homepage</h2>
                <span className="status-info_-_details">{this.state.homepage}</span>
            </div>
            <div className="status-info">
                <h2 className="status-header"> License for Latest Version</h2>
                <span className="status-info_-_details">{this.state.license}</span>
            </div>
        </div>
        <div className="btn_-_list">
            <Link to="/">
              <button type="button" className="btn a" id="home-page-btn-2">Home Page</button>
            </Link>
            <Link to="/search">
              <button type="button" className="btn a" id="library-search-btn-2">Npm Library Search Page</button>
            </Link>
        </div>
      </div>
    );
  }
}
