import React from "react";
import { render } from "enzyme";
import HomePage from "../Pages/HomePage";
import Enzyme from "enzyme";
import Adapter from '@dsaenko/enzyme-adapter-react-18'

Enzyme.configure({ adapter: new Adapter() });

describe("HomePage", () => {
  beforeEach(() => {
    Object.defineProperty(document, 'title', {
      value: 'Npm Explorer',
      writable: true
    });
  });

  it("sets the document title on mount", () => {
    render(<HomePage />);
    expect(document.title).toEqual("Npm Explorer");
  });
});