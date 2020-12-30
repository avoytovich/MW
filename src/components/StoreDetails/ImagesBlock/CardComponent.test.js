import React from 'react';
import { mount } from 'enzyme';
import CardComponent from './CardComponent';

let cardData = {
  cardText: 'Logo',
  imageSrc: 'Logo_src',
  updateKey: '1',
  updated: {},
};
describe('StoreDetails <CardComponent/>', () => {
  let wrapper;
  let cardSection;

  beforeEach(() => {
    wrapper = mount(
      <CardComponent
        cardText={cardData.cardText}
        imageSrc={cardData.imageSrc}
        updateKey={cardData.updateKey}
        handleDeleteCard={jest.fn()}
        storeData={{}}
        handleUpdateText={(updateKey, newText) => {
          cardData = { ...cardData, cardText: newText };
        }}
        updated={cardData.updated}
        handleChange={(newText) => {
          cardData = { ...cardData, cardText: newText };
        }}
      />,
    );
    cardSection = wrapper.find({ 'data-test': 'cardSection' }).first();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('input should be populated with cardData.cardText', () => {
    expect(wrapper.find('input[name="cardText"]').instance().value).toEqual(
      cardData.cardText,
    );
    expect(cardSection.find({ src: cardData.imageSrc }).exists).toBeTruthy();
  });

  it('on hover edit icon should appear', () => {
    cardSection.simulate('mouseover');
    expect(cardSection.find({ 'data-test': 'editIcon' }).exists).toBeTruthy();
  });

  it('should change cardData when some update is made', async () => {
    wrapper.find({ 'data-test': 'editIcon' }).first().simulate('click');
    const newValue = 'Favicon';
    wrapper.find('input[name="cardText"]').simulate('change', {
      target: { name: 'cardText', value: newValue },
    });
    expect(cardData.cardText).toEqual(newValue);
  });
});
