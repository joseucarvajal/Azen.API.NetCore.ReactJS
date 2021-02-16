﻿using Azen.API.Sockets.Cryptography;
using System;
using System.Collections.Generic;
using System.Text;

namespace Azen.API.Sockets.Settings
{
    public class AzenSettings
    {
        public string IPC { get; set; }
        public int PuertoServidor { get; set; }
        public bool SocketOnline { get; set; }
        public int MaxlongSocketMessage { get; set; }
        public double MaxTimeInactiveSocket { get; set; }
        
    }
}
