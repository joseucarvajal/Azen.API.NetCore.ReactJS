using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.Settings;
using Azen.API.Sockets.Utils;
using Microsoft.Extensions.Options;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Azen.API.Sockets.Jobs
{
    [DisallowConcurrentExecution]
    public class SocketJob : IJob
    {
        private readonly AzenSettings _azenSettings;
        ZSocketState _zSocketState;
        LogHandler _logHandler;

        public SocketJob(IOptions<AzenSettings> azenSettings, ZSocketState zSocketState, LogHandler logHandler)
        {
            _azenSettings = azenSettings.Value;
            _zSocketState = zSocketState;
            _logHandler = logHandler;
        }

        public Task Execute(IJobExecutionContext context)
        {
            CleanInactiveSocket();

            return Task.CompletedTask;
        }

        private void CleanInactiveSocket()
        {
            _logHandler.Info("CleanInactiveSocket Init");
            IList<string> socketsClose = new List<string>();

            foreach (var openSokcet in _zSocketState.OpenSockets)
            {
                if (_azenSettings.PuertoServidor.ToString() == openSokcet.Key)
                {
                    continue;
                }

                var diffInSeconds = (DateTime.Now - openSokcet.Value.LastEvent).TotalSeconds;

                if (diffInSeconds >= _azenSettings.MaxTimeInactiveSocket)
                {
                    openSokcet.Value.socket.Close();
                    socketsClose.Add(openSokcet.Key);
                    _logHandler.Info($"CleanInactiveSocket close port {openSokcet.Key}");
                }
            }

            if (socketsClose.Count == 0)
            {
                return;
            }

            lock (_zSocketState.OpenSockets)
            {
                foreach (var port in socketsClose)
                {
                    _zSocketState.OpenSockets.Remove(port);
                }
            }
        }
    }
}
