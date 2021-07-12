import React from 'react';
import { mount } from 'enzyme';

import OrderRow from './OrderRow';

const rowData = [
  { key: 'invoiceID', label: 'InvoiceID', value: 'TEST-20-001300257' },
  { key: 'termsAndConditions', label: 'Terms & Conditions', value: '' },
];

const customerId = 'Nexway';
const creationDate = 1599813796008;

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../api', () => ({
  getInvoicePdfById: jest.fn().mockImplementation(() => {
    const mBlob = {
      data: {
        size: 1024,
        type: 'application/pdf',
      },
    };
    return Promise.resolve(mBlob);
  }),
}));

describe('<OrderRow />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<OrderRow rowData={rowData} customerId={customerId} creationDate={creationDate} />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should download invoice.pdf', (done) => {
    const link = {
      click: jest.fn().mockImplementation(() => {
        expect(link.download).toBe('InvoiceID.pdf');
        expect(link.href).toBe('https://pdf.com');
        expect(link.click).toHaveBeenCalledTimes(1);
        done();
      }),
      setAttribute: jest.fn().mockImplementation((atr, label) => (link[atr] = label)),
    };

    global.URL.createObjectURL = jest.fn(() => 'https://pdf.com');
    global.URL.revokeObjectURL = jest.fn();
    global.Blob = function (content, options) {
      return { content, options };
    };
    jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});

    jest.spyOn(document, 'createElement').mockImplementation(() => link);
    wrapper.find('.download').at(1).simulate('click');

    expect(link.click).toHaveBeenCalledTimes(0);
  });
});
