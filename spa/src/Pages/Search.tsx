import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import NpmExplorerService from '../Services/NpmExplorerService';
import Container from 'typedi';

export interface IAppProps {
}

interface IAppState {
  name: string[];
  keywords: string[];
  description: string[];
}

export default class App extends React.Component<IAppProps, IAppState> {
  serviceInstance: NpmExplorerService;
  changeInputValue: string = "";
  //globalStore: any[] = [];

  componentDidMount(): void {
    document.title = "Npm Library Search"
  }
  constructor(props: IAppProps) {
    super(props);
    this.serviceInstance = Container.get(NpmExplorerService);

    this.state = {
      name: [],
      description: [],
      keywords: []
    }
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputValue = event.currentTarget.value;
      this.changeInputValue = inputValue;
      this.serviceInstance.getNpmSearchText(this.changeInputValue).subscribe(
        packageInfo => {
          this.setState({
            name: packageInfo.packageName,
            description: packageInfo.packageDescription,
            keywords: packageInfo.packageKeyWords
          });
        },
        error => {
          console.log(error);
        }

      );

      event.currentTarget.value="";
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      let myStore = localStorage.getItem('searchHistory');
      let globalStore: any[] = [];

      if (myStore !== null) {
        globalStore.push(JSON.parse(myStore));
      }

      globalStore.push(this.state);
      localStorage.setItem("searchHistory", JSON.stringify(globalStore));

      //http://api.local/packageInfo/search/${text}
      this.serviceInstance.addNpmRegistry({url: `http://api.local/packageInfo/search/${this.changeInputValue}`, res: JSON.stringify(this.state)})
    }
  }

  public render() {
    //console.log(this.state)

    let { name, description, keywords } = this.state;

    name = name.length >=15 ? name.splice(0,10, " "): [];
    description = description.length >=20 ? description.splice(0,10, " "): [];

    //keywords = keywords.length >=30 ? keywords.splice(0, 4, " "): [];

    //localStorage.setItem("searchHistory", JSON.stringify(this.state));
    return (
      <div className="library-grid">
           <div className="form-control">
            <FontAwesomeIcon icon={faSearch} />
            <input placeholder="Search" className="input-user" aria-label="input de pesquisar"
            onKeyDown={this.handleKeyDown}/>
            <FontAwesomeIcon icon={faTimes} />
          </div>
            <div className="status">
                <div className="status-info">
                    <h2 className="status-header">Package_name</h2>
                    <span className="status-info_-_details">{name}</span>
                </div>
                <div className="status-info">
                    <h2 className="status-header">Package_description</h2>
                    <span className="status-info_-_details">{description}</span>
                </div>
                <div className="status-info">
                  <h2 className="status-header">Package Keywords</h2>
                  <ul>
                  {keywords.map((value, index) => {
                    return <li className="status-info_-_details" key={index}> {value} </li>;
                  })}
                  </ul>
                </div>
            </div>
            <div className="btn_-_list">
                <Link to="/">
                  <button type="button" className="btn a" id="home-page-btn-2">Home Page</button>
                </Link>
                <Link to="/npmstatus">
                  <button type="button" className="btn a" id="npm-resgistry-btn">
                    Npm Registry Status Monitor
                  </button>
              </Link>
            </div>
      </div>
    );
  }
}
