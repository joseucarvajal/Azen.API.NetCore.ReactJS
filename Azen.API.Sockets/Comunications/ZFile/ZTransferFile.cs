using Azen.API.Sockets.Settings;
using Azen.API.Sockets.Utils;
using Microsoft.Extensions.Options;
using Renci.SshNet;
using Renci.SshNet.Common;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Azen.API.Sockets.Comunications.ZFile
{
    public class ZTransferFile
    {

        private readonly ZTransferFileSettings _zTransferFileSettings;
        private readonly AzenSettings _azenSettings;
        LogHandler _logHandler;

        public ZTransferFile(IOptions<ZTransferFileSettings> zTransferFileSettings, IOptions<AzenSettings> azenSettings, LogHandler logHandler)
        {
            _zTransferFileSettings = zTransferFileSettings.Value;
            _azenSettings = azenSettings.Value;
            _logHandler = logHandler;
        }

        public void Upload(string fileToUpload)
        {
            using (var sftpClient = new SftpClient(_azenSettings.IPC, _zTransferFileSettings.Username, _zTransferFileSettings.Password))
            using (var fs = new FileStream(fileToUpload, FileMode.Open))
            {
                sftpClient.Connect();

                sftpClient.ChangeDirectory(_zTransferFileSettings.TargetPath);

                sftpClient.UploadFile(
                    fs,
                    Path.GetFileName(fileToUpload),
                    uploaded =>
                    {
                        Console.WriteLine($"Uploaded {(double)uploaded / fs.Length * 100}% of the file.");
                    });

                sftpClient.Disconnect();
            }
        }
    }
}
