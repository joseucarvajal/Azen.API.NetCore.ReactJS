using Azen.API.Sockets.Cryptography;
using System;
using Xunit;

namespace Azen.API.Test
{
    public class ZCryptographyTest
    {
        [Fact]
        public void Plain_text_to_cipher_and_visceversa_works_well()
        {
            var plainText = "ubas123#?&jh&";

            ZCryptographySettings zCriptographySettings = new ZCryptographySettings();
            zCriptographySettings.Key = "$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNd";
            zCriptographySettings.IV = "z%C*F-JaNdRgUkXp";

            ZCryptography zCriptography = new ZCryptography();
            var cipherText = zCriptography.GetCipherText(plainText);
            var plainTextReversed = zCriptography.GetPlainText(cipherText);

            Assert.Equal(plainText, plainTextReversed);
        }
    }
}
