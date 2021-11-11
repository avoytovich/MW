const b64DecodeUnicode = (str) => decodeURIComponent(
  Array.prototype.map.call(
    window.atob(str),
    (c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`,
  ).join(''),
);

const b64EncodeUnicode = (str) => window.btoa(
  encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(`0x${p1}`)),
);

export {
  b64DecodeUnicode,
  b64EncodeUnicode,
};
