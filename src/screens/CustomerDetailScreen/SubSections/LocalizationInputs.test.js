import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import LocalizationInputs from './LocalizationInputs';

jest.mock('tinymce/skins/content/default/content.min.css', () => ({
  ...jest.requireActual('tinymce/skins/content/default/content.min.css'),
  contentCss: jest.fn().mockRejectedValue({}),
}));

jest.mock('tinymce/skins/ui/oxide/content.min.css', () => ({
  ...jest.requireActual('tinymce/skins/ui/oxide/content.min.css'),
  contentUiCss: jest.fn().mockRejectedValue({}),
}));

describe('<LocalizationInputs />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<LocalizationInputs/>);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(wrapper)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
