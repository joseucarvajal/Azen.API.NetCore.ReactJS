using Azen.API.Sockets.Comunications;
using Azen.API.Sockets.General;
using Azen.API.Sockets.Settings;
using Azen.API.Sockets.Utils;
using Microsoft.Extensions.Options;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
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
        ZSocket _zsck;

        public SocketJob(IOptions<AzenSettings> azenSettings, ZSocketState zSocketState, LogHandler logHandler, ZSocket zsck)
        {
            _azenSettings = azenSettings.Value;
            _zSocketState = zSocketState;
            _logHandler = logHandler;
            _zsck = zsck;
        }

        public Task Execute(IJobExecutionContext context)
        {
            //TODO: se documenta hasta que se libere puerto en cliente
            //CleanInactiveSocket();

            return Task.CompletedTask;
        }

        private void CleanInactiveSocket()
        {
            _logHandler.Info("CleanInactiveSocket Init");
            IList<string> socketsClose = new List<string>();

            foreach (var openSocket in _zSocketState.OpenSockets)
            {
                if (_azenSettings.PuertoServidor.ToString() == openSocket.Key)
                {
                    continue;
                }

                var diffInSeconds = (DateTime.Now - openSocket.Value.LastEvent).TotalSeconds;

                if (diffInSeconds >= _azenSettings.MaxTimeInactiveSocket)
                {
                    //CloseAzenPort(Int32.Parse(openSocket.Key), openSocket.Value.TokenJWT);

                    openSocket.Value.socket.Shutdown(SocketShutdown.Both);
                    //openSocket.Value.socket.Disconnect(true);

                    openSocket.Value.socket.Close();
                    socketsClose.Add(openSocket.Key);

                    _logHandler.Info($"CleanInactiveSocket close port {openSocket.Key}");
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

        /*private void CloseAzenPort(int port, string tkns)
        {
            string datoTkns = ZTag.ZTAG_I_TKNS + tkns + ZTag.ZTAG_F_TKNS;

            string cadEvento = new ZEvent(2, 0, ZCommandConst.CM_TERMINAR, "", "").ArmarCadenaSocket();

            string cadenaEnviar = cadEvento + datoTkns;

            _zsck.SocketClienteEnviar(cadenaEnviar, port, ZCommandConst.CM_TERMINAR);
        }*/
    }
}
