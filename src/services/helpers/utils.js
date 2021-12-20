import { toast } from 'react-toastify';
import localization from '../../localization';

const b64DecodeUnicode = (str) => {
  try {
    return decodeURIComponent(
      Array.prototype.map.call(
        window.atob(str),
        (c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`,
      ).join(''),
    );
  } catch (e) {
    return str;
  }
};

const b64EncodeUnicode = (str) => window.btoa(
  encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(`0x${p1}`)),
);

const copyText = (value) => {
  navigator.clipboard.writeText(value)
    .then(() => toast(localization.t('general.itemHasBeenCopied')));
};

const copyUrl = (value) => {
  navigator.clipboard.writeText(`${window.location.href}/${value}`)
    .then(() => toast(localization.t('general.itemURLHasBeenCopied')));
};

export {
  b64DecodeUnicode,
  b64EncodeUnicode,
  copyText,
  copyUrl,
};
