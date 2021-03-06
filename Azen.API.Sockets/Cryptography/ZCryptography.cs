﻿using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Azen.API.Sockets.Cryptography
{
    public class ZCryptography
    {
        private ZCryptographySettings _zCriptographySettings;

        public ZCryptography(IOptions<ZCryptographySettings> zCriptographySettings)
        {
            _zCriptographySettings = zCriptographySettings.Value;
        }

        public string GetCipherText(string plainText)
        {
            if (string.IsNullOrEmpty(plainText))
            {
                return string.Empty;
            }

            byte[] cipherTextBytes;

            using (var rijAlg = new RijndaelManaged())
            {
                InitializeAesAlgorithm(rijAlg);

                var encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV);

                using (var msEncrypt = new MemoryStream())
                {
                    using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                        {
                            swEncrypt.Write(plainText);
                        }
                        cipherTextBytes = msEncrypt.ToArray();
                    }
                }

                return Convert.ToBase64String(cipherTextBytes);
            }
        }

        public string GetPlainText(string cipherText)
        {
            if (string.IsNullOrEmpty(cipherText))
            {
                return string.Empty;
            }

            using (var rijAlg = new RijndaelManaged())
            {
                InitializeAesAlgorithm(rijAlg);

                var decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);

                using (var msDecrypt = new MemoryStream(Convert.FromBase64String(cipherText)))
                {
                    using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (var srDecrypt = new StreamReader(csDecrypt))
                        {
                            return srDecrypt.ReadToEnd();
                        }
                    }
                }
            }
        }

        private void InitializeAesAlgorithm(RijndaelManaged rijAlg)
        {
            rijAlg.Mode = CipherMode.CBC;
            rijAlg.Padding = PaddingMode.PKCS7;
            rijAlg.KeySize = 256;
            rijAlg.BlockSize = 128;            

            rijAlg.Key = Encoding.UTF8.GetBytes(_zCriptographySettings.Key);

            //IV must have the size of blocksize
            rijAlg.IV = Encoding.UTF8.GetBytes(_zCriptographySettings.IV);
        }
    }
}