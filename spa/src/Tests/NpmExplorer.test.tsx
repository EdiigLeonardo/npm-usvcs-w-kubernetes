import React from 'react';
import { shallow, mount } from 'enzyme';
import NpmExplorer from '../Components/NpmExplorer';
import NpmStatus from '../Pages/NpmStatus';
import HomePage from '../Pages/HomePage';
import LibraryHub from '../Pages/LibraryHub';
import Search from '../Pages/Search';
import { MemoryRouter } from 'react-router';
import Enzyme from 'enzyme';
import Adapter from '@dsaenko/enzyme-adapter-react-18';
import "reflect-metadata";
import { Route } from 'react-router-dom';

type PathMap = { [key: string]: React.ComponentType };

let pathMap: PathMap = {
'/': HomePage,
'/libraryhub': LibraryHub,
'/npmstatus': NpmStatus,
'/search': Search
};

pathMap['/npmStatus'] = NpmStatus;

Enzyme.configure({ adapter: new Adapter() })

describe('routes using array of routers', () => {
    it('should return the correct component for given route', () => {
        expect(pathMap['/']).toBe(HomePage);
        expect(pathMap['/libraryhub']).toBe(LibraryHub);
        expect(pathMap['/npmstatus']).toBe(NpmStatus);
        expect(pathMap['/search']).toBe(Search);
    });

    beforeAll(() => {
        describe('routes using array of routers', () => {
            expect(pathMap['/npmStatus']).toBe(NpmStatus);
    });
});
});