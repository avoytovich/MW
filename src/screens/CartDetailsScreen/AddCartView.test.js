import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';

import AddCartView from './AddCartView';

const initialValues = {
  source: [],
  store: '',
  externalContext: '',
  salesFlags: '',
  buyerDetails: [],
  discountApply: false,
  prefillWith: {},
  storeHostname: '',
  product: '',
  locale: '',
  country: '',
  emailAddress: '',
  salutation: [],
  firstName: '',
  lastName: '',
  phone: '',
  companyName: '',
  zip: '',
  city: '',
  streetAddress: '',
  label: '',
  rebate: '',
  currency: '',
  applicableUntil: new Date(),
};

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => '82223530-f443-4c15-a901-b4a88f994ac7'),
}));

describe('<AddCartView />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(<AddCartView initialValues={initialValues} />);
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

  it('check existing checkbox - ACQUISITION', () => {
    render(<AddCartView initialValues={initialValues}/>);
    fireEvent.click(screen.getByRole('checkbox', {name: /ACQUISITION/i}));
    expect(screen.getByRole('checkbox', {name: /ACQUISITION/i})).toBeChecked();
  });

});
