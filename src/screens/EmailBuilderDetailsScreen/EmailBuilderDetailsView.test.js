import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import EmailBuilderDetailsView from './EmailBuilderDetailsView'

describe('<EmailBuilderDetailsView />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <EmailBuilderDetailsView templateData={{}} samplesData={{}} updateData={{}}/>
      </BrowserRouter>
    );
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(wrapper)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});