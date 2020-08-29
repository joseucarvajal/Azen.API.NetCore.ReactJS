import * as CryptoJS from "crypto-js";

const k = CryptoJS.enc.Utf8.parse("$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNd");
const iv = CryptoJS.enc.Utf8.parse("z%C*F-JaNdRgUkXp");

export const getCipherText = (plainText: string) => {
  if (!plainText) {
    return plainText;
  }

  const textEncrypted = CryptoJS.AES.encrypt(plainText, k, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv,
  });

  return textEncrypted.toString();
};

export const getPlainText = (cipherText: string) => {
  if (!getPlainText) {
    return getPlainText;
  }
  const plainText = CryptoJS.AES.decrypt(cipherText, k, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv,
  });

  return plainText.toString(CryptoJS.enc.Utf8);
};
