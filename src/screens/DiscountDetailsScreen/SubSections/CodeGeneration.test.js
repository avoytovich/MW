import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import CodeGeneration from './CodeGeneration';

const discount = {
  id: "85ff67be-614b-4387-9866-f6177d71597e",
  maxUsages: 5,
}

jest.mock('react-redux', () => ({
  useDispatch: jest.fn().mockImplementation(() => (() => {})),
  useSelector: jest.fn(),
}));

describe('<CodeGeneration />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(
      <CodeGeneration
        discount={discount}
        usedDiscounts={2}
        prevSaveSingleUseCode={true}
      />);
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
