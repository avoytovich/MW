import React from 'react';
import { mount } from 'enzyme';
import CardComponent from './CardComponent';

let cardData = {
  cardText: 'test_text',
  imageSrc: 'test_src',
  updateKey: 1,
};

describe('ProductDetails <CardComponent/>', () => {
  let wrapper;
  let cardSection;

  beforeEach(() => {
    wrapper = mount(
      <CardComponent
        handleChange={(newText) => {
          cardData = { ...cardData, cardText: newText };
        }}
        cardText={cardData.cardText}
        imageSrc={cardData.imageSrc}
        updateKey={cardData.updateKey}
        handleDeleteCard={jest.fn()}
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
    const newValue = 'new-text';
    wrapper.find('input[name="cardText"]').simulate('change', {
      target: { name: 'cardText', value: newValue },
    });
    expect(cardData.cardText).toEqual(newValue);
  });
});
