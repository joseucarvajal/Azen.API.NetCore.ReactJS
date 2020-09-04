using Azen.API.Sockets.Cryptography;
using Microsoft.Extensions.Options;
using System;
using Xunit;

namespace Azen.API.Test
{
    public class ZCryptographyTest
    {
        [Fact]
        public void Plain_text_to_cipher_and_visceversa_works_well()
        {
            var plainText = "azen";

            ZCryptographySettings zCriptographySettings = new ZCryptographySettings();
            zCriptographySettings.Key = "$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNd";
            zCriptographySettings.IV = "z%C*F-JaNdRgUkXp";

            /*
            zCriptographySettings.Key = "$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNd";
            zCriptographySettings.IV = "z%C*F-JaNdRgUkXp";
            */
            IOptions<ZCryptographySettings> settingsOptions = Options.Create(zCriptographySettings);

            ZCryptography zCriptography = new ZCryptography(settingsOptions);
            var cipherText = zCriptography.GetCipherText(plainText);
            var plainTextReversed = zCriptography.GetPlainText(cipherText);

            Assert.Equal(plainText, plainTextReversed);
        }
    }
}
