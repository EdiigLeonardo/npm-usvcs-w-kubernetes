import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import NpmExplorer from './Components/NpmExplorer';

describe('App component', () => {
  test('should render NpmExplorer component', () => {
    const { getByTestId } = render(<App />);
    const npmExplorerComponent = screen.getByTestId('npm-explorer');
    console.log("debug: ", npmExplorerComponent);
    expect(npmExplorerComponent).toBeInTheDocument();
  });
});