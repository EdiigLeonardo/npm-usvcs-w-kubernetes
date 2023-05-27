import React, { Component } from 'react'
import NpmExplorerService from '../Services/NpmExplorerService';
import { interval, Subscription } from "rxjs";
import Container from 'typedi';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NpmStatus from '../Pages/NpmStatus';
import HomePage from '../Pages/HomePage';
import LibraryHub from '../Pages/LibraryHub';
import Search from '../Pages/Search';

type Props = {}

type State = {}

export default class NpmExplorer extends React.Component<Props, State> {
  state = {}
  serviceInstance: NpmExplorerService;
  subscriptions: Subscription[] = [];

  constructor(props: Props) {
    super(props);
    //this.state = { color: this.props.color, text: this.props.text, textbox: "", listJokes: [] };
    this.serviceInstance = Container.get(NpmExplorerService);
    }


  render() {
    return (
      <div className='grid' data-testid="npm-explorer">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/libraryhub" element={<LibraryHub />} />
            <Route path="/npmstatus" element={<NpmStatus/>} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Router>
      </div>
    )
  }

}