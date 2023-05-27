import React, { Component} from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import {Container} from 'typedi'
import NpmExplorerService from '../Services/NpmExplorerService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

type Props = {}

type State = {}

export default class HomePage extends Component<Props, State> {
  state = {}
  serviceInstance: NpmExplorerService;

  constructor(props: Props) {
    super(props);
      this.serviceInstance = Container.get(NpmExplorerService);
    }
  

  componentDidMount(): void {
    document.title = "Npm Explorer"
  }
  
  render() {
    return (
        <div id="landing-page" className="home-page" data-testid="home-page">
            <div className="form-control">
              <FontAwesomeIcon icon={faSearch} data-testid="search-icon" />
              <Link to="/search">
                <input placeholder="Search" className="input-user" aria-label="input de pesquisar"/>
              </Link>
              <FontAwesomeIcon icon={faTimes} data-testid="close-icon"/>
            </div>
            <div className="btn_-_list">
              <Link to="/npmstatus">
                  <button type="button" className="btn a" id="npm-resgistry-btn">
                    Npm Registry Status Monitor
                  </button>
              </Link>
              <Link to="/libraryhub">
                <button type="button" className="btn a" id="library-info-btn">Library Info Hub</button>
              </Link>
              <Link to="/search">
                <button type="button" className="btn a" id="library-search-btn">Npm Library Search</button>
              </Link>
            </div>
        </div>
    )
  }
}