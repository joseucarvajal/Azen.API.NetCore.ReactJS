using Azen.API.Sockets.Settings;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace Azen.API.Sockets.Comunications.ZFile
{
    public class ZTransferFileSettings
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public int Port{ get; set; }
        public string AuthMethod { get; set; }        
        public string TargetPath { get; set; }
    }
}
