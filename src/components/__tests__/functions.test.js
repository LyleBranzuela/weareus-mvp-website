import React from "react";
import { MemoryRouter } from "react-router-dom";
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import ScrollToTop from "../general-components/ScrollToTop";

Enzyme.configure({ adapter: new Adapter() });
document.body.scrollTo = jest.fn();  
describe('ScrollToTop', () => {
  let wrapper;
  let history;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop>
          <p>Hi</p>
        </ScrollToTop>
      </MemoryRouter>
    );
    history = wrapper.instance().history;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Calls document.scrollTo when route changes', () => {
    expect(document.body.scrollTo).not.toHaveBeenCalled();
    history.push('/home');
    expect(document.body.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('ScrollToTop renders children', () => {
    const component = wrapper.find(ScrollToTop);
    expect(component.children().length).toEqual(1);
    expect(component.contains(<p>Hi</p>)).toEqual(true);
  });
});