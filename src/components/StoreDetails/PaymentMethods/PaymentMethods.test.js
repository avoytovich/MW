import React from 'react';
import { mount } from 'enzyme';
import PaymentMethods from './PaymentMethods';

const images = {
  boleto: '/4b064ce5aac4b5c843ca23b27a9ab1dd.png',
  mistercash: '/3f828206019714f353efc3b89d745bc3.png',
  bacs: '/2193f68f2ee41db8c8c3dca25f02f137.png',
};
let storeData = {
  designs: {
    paymentComponent: {
      rankedPaymentTabsByCountriesList: [
        { rankedPaymentTabs: ['boleto', 'mistercash'] },
      ],
    },
  },
};
describe('StoreDetails <PaymentMethods/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <PaymentMethods
        currentStoreData={storeData}
        setCurrentStoreData={(newData) => {
          storeData = newData;
          wrapper.setProps({ currentStoreData: storeData });
        }}
        storeData={storeData}
        selectOptions={{paymentMethods:[]}}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    expect(wrapper.find({ src: images.boleto }).exists).toBeTruthy();
    expect(wrapper.find({ src: images.mistercash }).exists).toBeTruthy();
  });

  it('on hover edit icon should appear', () => {
    wrapper.simulate('mouseover');
    expect(wrapper.find({ 'data-test': 'editIcon' }).exists).toBeTruthy();
  });

  it('on delete all input should be empty', async () => {
    wrapper.simulate('mouseover');
    wrapper.find({ 'data-test': 'editIcon' }).first().simulate('click');
    const deleteIcon = wrapper.find({ 'data-test': 'deleteIcon' }).first();
    expect(deleteIcon.exists).toBeTruthy();
    deleteIcon.simulate('click');
    expect(
      wrapper.find('input[name="paymentMethods"]').instance().value,
    ).toEqual('');
  });

  it('image of added payment should appear', async () => {
    wrapper.find({ 'data-test': 'editIcon' }).first().simulate('click');
    const newValue = [
      ...storeData.designs.paymentComponent.rankedPaymentTabsByCountriesList[0]
        .rankedPaymentTabs,
      'bacs',
    ];
    wrapper.find('input[name="paymentMethods"]').simulate('change', {
      target: {
        name:
          'designs.paymentComponent.rankedPaymentTabsByCountriesList[0].rankedPaymentTabs',
        value: newValue,
      },
    });
    wrapper.setProps({ currentStoreData: storeData });
    expect(wrapper.find({ src: images.bacs }).exists).toBeTruthy();
  });
});
