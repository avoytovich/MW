import bankTransfer from '../../../assets/bankTransfer.png';
import cheque from '../../../assets/cheque.png';
import creditCard from '../../../assets/creditCard.png';
import directebanking from '../../../assets/directebanking.png';
import mistercash from '../../../assets/mistercash.png';
import bacs from '../../../assets/bacs.png';
import boleto from '../../../assets/boleto.png';
import giropay from '../../../assets/giropay.png';
import payPal from '../../../assets/payPal.png';
import sepa from '../../../assets/sepa.png';
import sofort from '../../../assets/sofort.png';
import trustly from '../../../assets/trustly.png';

const paymentImages = [
  { id: 'bank_transfer', src: bankTransfer },
  { id: 'cheque', src: cheque },
  { id: 'credit_card', src: creditCard },
  { id: 'directebanking', src: directebanking },
  { id: 'mistercash', src: mistercash },
  { id: 'bacs', src: bacs },
  { id: 'boleto', src: boleto },
  { id: 'giropay', src: giropay },
  { id: 'payPal', src: payPal },
  { id: 'sepa', src: sepa },
  { id: 'sofort', src: sofort },
  { id: 'trustly', src: trustly },
];

const getPaymentImages = (value) => {
  for (let i = 0; i < paymentImages.length; i += 1) {
    if (paymentImages[i].id === value) {
      return paymentImages[i].src;
    }
  }
  return null;
};

export default getPaymentImages;
