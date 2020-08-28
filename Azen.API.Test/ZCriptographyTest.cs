using Azen.API.Sockets.Cryptography;
using System;
using Xunit;

namespace Azen.API.Test
{
    public class ZCriptographyTest
    {
        [Fact]
        public void Plain_text_to_cipher_and_visceversa_works_well()
        {
            var plainText = "ubas123#?&jh&";

            ZCriptographySettings zCriptographySettings = new ZCriptographySettings();
            zCriptographySettings.Key = "$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNd";
            zCriptographySettings.IV = "z%C*F-JaNdRgUkXp";

            ZCriptography zCriptography = new ZCriptography(zCriptographySettings);
            var cipherText = zCriptography.PlainTextToCipher(plainText);
            var plainTextReversed = zCriptography.CipherTextToPlain(cipherText);

            Assert.Equal(plainText, plainTextReversed);
        }
    }
}
