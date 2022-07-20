import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import AutoFulfillmentDetailsView from './AutoFulfillmentDetailsView';

describe('<AutoFulfillmentDetailsView />', () => {
  const detailsData = {
    customer: {
      copyValue: "12345",
      path: "/customermanagement/customerslist/12345",
      value: "AVAST Software s.r.o",
    },
    id: {
      copyValue: "12345",
      value: "12345",
    },
    name: {
      value: "avast",
    },
    url: {
      value: "https://stage.api.avast.com",
    },
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <AutoFulfillmentDetailsView detailsData={detailsData} />
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
