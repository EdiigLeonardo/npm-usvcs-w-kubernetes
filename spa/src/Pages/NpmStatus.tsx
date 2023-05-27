import * as React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import NpmExplorerService from '../Services/NpmExplorerService';
import Container from 'typedi';
import { interval, Subscription } from 'rxjs';

export interface INpmStatusProps {}

export interface INpmStatusState {
  uuid: string;
  db_name: string;
  engine: string;
}

export default class NpmStatus extends React.Component<INpmStatusProps, INpmStatusState> {
  subscriptions: Subscription[] = [];
  serviceInstance: NpmExplorerService;
  mounted: boolean = false;
  rendered: number = 0;
  globalStore: any[] = [];

  constructor(props: INpmStatusProps) {
    super(props);

    this.state = {
      uuid: '',
      db_name: '',
      engine: '',
    };

    this.serviceInstance = Container.get(NpmExplorerService);

  }

  componentDidMount(): void {
    document.title = 'Npm Status Monitor';


    let s: Subscription = interval(5000).subscribe(() => {
      this.serviceInstance.getNPMRegistryState().then((state: any) => {
        let rs: INpmStatusState = JSON.parse(state);
        this.setState({ uuid: rs.uuid, db_name: rs.db_name, engine: rs.engine });

      });
    });
    this.subscriptions.push(s);
  }

  componentWillUnmount(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    let stateStore: any[] = [];
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      stateStore.push(this.state);
      localStorage.setItem("NpmStatusHistory", JSON.stringify(stateStore));
      this.serviceInstance.addNpmRegistry({url: `https://localhost:3000/packageInfo/`, res: JSON.stringify(this.state)})
    }
  }

  public render() {

    if(this.rendered === 0){
      this.serviceInstance.getNPMRegistryState().then((state: any) => {
        let rs: INpmStatusState = JSON.parse(state);
        this.setState({ uuid: rs.uuid, db_name: rs.db_name, engine: rs.engine });
      });

      this.rendered ++;
    }
    //localStorage.setItem("NpmStatusHistory", JSON.stringify(this.state));

    return (
      <div className="library-grid3">
        <div className=""></div>
      <div className="status">
        <div className="status-info">
            <h2 className="status-header">uuid</h2>
            <span className="status-info_-_details">{this.state.uuid}</span>
        </div>
        <div className="status-info">
            <h2 className="status-header">db_name</h2>
            <span className="status-info_-_details">{this.state.db_name}</span>
        </div>
        <div className="status-info">
            <h2 className="status-header">engine</h2>
            <span className="status-info_-_details">{this.state.engine}</span>
        </div>
        </div>
        <div className="btn_-_list">
          <Link to="/">
            <button type="button" className="btn a" id="home-page-btn-2">Home Page</button>
          </Link>
          <Link to="/libraryhub">
            <button type="button" className="btn a" id="library-info-btn-2">Library Info Hub</button>
          </Link>
        </div>
      </div>
    );
  }
}
