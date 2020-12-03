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
            var sftpClient = GetSftpClient();

            sftpClient.Connect();

            using (var fs = new FileStream(fileToUpload, FileMode.Open))
            {
                sftpClient.ChangeDirectory(_zTransferFileSettings.TargetPath);

                sftpClient.UploadFile(
                    fs,
                    Path.GetFileName(fileToUpload),
                    uploaded =>
                    {
                        Console.WriteLine($"Uploaded {(double)uploaded / fs.Length * 100}% of the file.");
                    });
            }
            sftpClient.Disconnect();
        }

        private SftpClient GetSftpClient()
        {
            if (_zTransferFileSettings.AuthMethod == "basic")
            {
                return new SftpClient(_azenSettings.IPC, _zTransferFileSettings.Username, _zTransferFileSettings.Password);
            }
            else
            {
                KeyboardInteractiveAuthenticationMethod keybAuth = new KeyboardInteractiveAuthenticationMethod(_zTransferFileSettings.Username);
                keybAuth.AuthenticationPrompt += new EventHandler<AuthenticationPromptEventArgs>(HandleKeyEvent);

                ConnectionInfo conInfo = new ConnectionInfo(_azenSettings.IPC, _zTransferFileSettings.Port, _zTransferFileSettings.Username, keybAuth);

                return new SftpClient(conInfo);
            }
        }

        private void HandleKeyEvent(object sender, AuthenticationPromptEventArgs e)
        {
            foreach (AuthenticationPrompt prompt in e.Prompts)
            {
                if (prompt.Request.IndexOf("Password:", StringComparison.InvariantCultureIgnoreCase) != -1)
                {
                    prompt.Response = _zTransferFileSettings.Password;
                }
            }
        }
    }
}
