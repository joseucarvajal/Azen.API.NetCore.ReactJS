using Azen.API.Sockets.Settings;
using Azen.API.Sockets.Utils;
using Azen.API.Sockets.General;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using Azen.API.Sockets.Domain.Command;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Azen.API.Sockets.Domain.Service;
using Azen.API.Sockets.Exceptions.Services;
using System.Net;

namespace Azen.API.Sockets.Comunications
{
    public class ZSocket
    {
        // Codigos de operaciones. Todo transferencia a traves del socket
        // esta identificada por un codigo de operacion
        public const int ZSCK_INICIO = 1;    // Inicio de operaciones
        public const int ZSCK_FIN = 2;   // final de operaciones
        public const int ZSCK_ENVIAR = 3;    // Envio de archivo
        public const int ZSCK_TRAER = 4; // Obtencion de archivo
        public const int ZSCK_CONTENVIAR = 5;    // Continuar envio
        public const int ZSCK_CONTTRAER = 6; // Continuar traer.
        public const int ZSCK_ACK = 7;   // Reconocimiento
        public const int ZSCK_DATO = 8;  // Transferencia de blque de dato
        public const int ZSCK_ERROR = 9; // Mensaje de error.
        public const int ZSCK_ACKINICIO = 10;
        public const int ZSCK_ACKTAMANO = 11;
        public const int ZSCK_ACKDATO = 12;
        public const int ZSCK_ACKINICTRANSF = 13;
        public const int ZSCK_INICTRANSF = 14;
        public const int ZSCK_INICTRANSFCMD = 15;
        public const int ZSCK_INICTRANSARCHIVO = 16;

        // Codigos de error

        public const int ZSCK_EXITO = 0;
        public const int ZSCK_ERROPERNOVAL = 1;
        public const int ZSCK_ERRNUMPUERTO = 2;
        public const int ZSCK_ERRSOCKET = 3;
        public const int ZSCK_ERRBIND = 4;
        public const int ZSCK_ERRLISTEN = 5;
        public const int ZSCK_ERRCONNECT = 6;
        public const int ZSCK_ERRNOMEM = 7;
        public const int ZSCK_ERRCREARLOG = 8;
        public const int ZSCK_ERRABRIRLOG = 9;
        public const int ZSCK_ERRABRIRFUENTE = 10;
        public const int ZSCK_ERRCREARDESTINO = 11;
        public const int ZSCK_ERRABRIRDESTINO = 12;
        public const int ZSCK_ERRLEYENDOFUENTE = 13;
        public const int ZSCK_ERRLEYOMENOSBYTES = 14;
        public const int ZSCK_ERRESCRIBIRBLOQUE = 15;
        public const int ZSCK_ERRLEERACK = 16;
        public const int ZSCK_ERRNOACK = 17;
        public const int ZSCK_ERRSEESPERABAACK = 18;
        public const int ZSCK_ERRLEERBLOQUE = 19;
        public const int ZSCK_ERRESCRIBIENDODESTINO = 20;
        public const int ZSCK_ERRESCRIBIOMENOSBYTES = 21;
        public const int ZSCK_ERRESCRIBIRSOCKET = 22;
        public const int ZSCK_ERRLEERSOCKET = 23;
        public const int ZSCK_ERRCREARCNX = 24;
        public const int ZSCK_ERRENVIARCNX = 25;
        public const int ZSCK_ERRLEERCNX = 26;
        public const int ZSCK_ERRINICOPER = 27;
        public const int ZSCK_FINHIJ = 28;


        private Socket socket;          // Socket cliente
        /*private DataInputStream bufferEntrada;  // stream de lectura para leer objetos
        private DataOutputStream bufferSalida;  // stream de envio para enviar objetos
        */
        private string zsck_cadMemError;


        int zsck_errnum;

        private bool siLogActividad;     // Cerios mzo 2020  para mensajes de debug	

        private readonly IOptions<AzenSettings> _azenSettings;
        LogHandler _logHandler;
        ZTag _ztag;
        ZSocketState _zSocketState;

        public ZSocket(IOptions<AzenSettings> azenSettings, ZTag ztag, LogHandler logHandler, ZSocketState zSocketState)
        {
            _azenSettings = azenSettings;
            _logHandler = logHandler;
            _ztag = ztag;
            _zSocketState = zSocketState;

            siLogActividad = false;

            socket = null;
        }

        public void IniciarSocketCliente(int puerto)
        {
            try
            {
                if(!CrearSckCliente(_azenSettings.Value.IPC, puerto))
                {
                    _logHandler.Error($"No fue posible crear socket: {_azenSettings.Value.IPC}, puerto {puerto}");
                    throw new Exception($"No fue posible crear socket: {_azenSettings.Value.IPC}, puerto {puerto}");
                }
                _logHandler.Info("ZAzen IniciarSocketCliente asignado: " + _azenSettings.Value.IPC);
            }
            catch (Exception e)
            {
                _logHandler.Info(e.ToString());
            }
        }


        /// <summary>
        /// Crea socket cliente
        /// </summary>
        /// <param name="servidor"></param>
        /// <param name="puerto"></param>
        /// <returns></returns>
        public bool CrearSckCliente(string servidor, int puerto)
        {
            try
            {
                if (_zSocketState.OpenSockets.ContainsKey(puerto.ToString()) && _azenSettings.Value.SocketOnline)
                {
                    socket = _zSocketState.OpenSockets[puerto.ToString()].socket;
                }
                else
                { 
                    /* Se crea el socket cliente */
                    socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                    socket.Connect(servidor, puerto);

                    lock (_zSocketState.OpenSockets)
                    {
                        _zSocketState.OpenSockets.Remove(puerto.ToString());

                        _zSocketState.OpenSockets.Add(puerto.ToString(), new ZSocketStateInfo
                        {
                            socket = socket
                        });
                    }
                }
            }
            catch (Exception e)
            {
                Monitorear("ERROR al CrearSckCliente servidor: " + servidor + " -- puerto: " + puerto);
                _logHandler.Info(e.ToString());
                return false;
            }

            return true;
        }

        public int Transferir(string dato)
        {
            //enviar bloque
            if (ZSCK_EXITO != Escribir(dato))
            {
                zsck_cadMemError = "Error al enviar bloque de datos";
                Monitorear("Error ZSCK_ERRESCRIBIRSOCKET");
                return zsck_errnum = ZSCK_ERRESCRIBIRSOCKET;
            }

            return zsck_errnum = ZSCK_EXITO;
        }
        public int EnviarProtocolo(int protocolo)
        {
            // inicio tranferencias
            try
            {
                int protocoloConvert = System.Net.IPAddress.HostToNetworkOrder(protocolo);

                byte[] msg  = BitConverter.GetBytes(protocoloConvert);

                int x = socket.Send(msg);
            }
            catch (Exception e)
            {
                _logHandler.Info(e.ToString());
                return zsck_errnum = ZSCK_ERRESCRIBIRSOCKET;
            }

            return zsck_errnum = ZSCK_EXITO;
        }

        public int Escribir(string dato)
        {
            try
            {
                int lenDato = Encoding.ASCII.GetBytes(dato).Length;

                dato = $"{lenDato.ToString()}|{dato}";
                byte[] msg = Encoding.ASCII.GetBytes(dato);
                socket.Send(msg);
            }
            catch (Exception e)
            {
                _logHandler.Info(e.ToString());
                return zsck_errnum = ZSCK_ERRESCRIBIRSOCKET;
            }

            return zsck_errnum = ZSCK_EXITO;
        }

        public string Recibir()
        {
            string bloque;

            //recibe bloque 
            if (null == (bloque = Leer(_azenSettings.Value.MaxlongSocketMessage)))
            {
                zsck_cadMemError = "Error al enviar bloque de datos";
                EnviarProtocolo(ZSCK_ERROR);
                zsck_errnum = ZSCK_ERRESCRIBIRSOCKET;
                return null;
            }

            return bloque;
        }

        public string Leer(int tamano)
        {
            // Array de bytes auxiliar para la lectura de la cadena.
            byte[] bytes = new byte[tamano];
            try
            {
                string result = string.Empty;
                int bytesRec = 0;
                int bytesRead = 0;
                int lenBuffer = 0;
                int lenHeader = 0;

                do
                {
                    bytesRec = socket.Receive(bytes);
                    bytesRead += bytesRec;
                    _logHandler.Info($"ZSocket Leer bytesRec: {bytesRec}");

                    if (string.IsNullOrEmpty(result))
                    {
                        result = Encoding.UTF8.GetString(bytes, 0, bytesRec);

                        int indexInitJson = result.IndexOf('|');
                        var lenBufferString = result.Substring(0, indexInitJson);

                        lenHeader = ASCIIEncoding.ASCII.GetByteCount($"{lenBufferString}|");

                        lenBuffer = Int32.Parse(lenBufferString);// + Encoding.ASCII.GetBytes(lenBufferString).Length;
                        result = result.Substring(indexInitJson+1);
                    }
                    else
                    {
                        result += Encoding.UTF8.GetString(bytes, 0, bytesRec);
                    }
                    
                    _logHandler.Info($"ZSocket Leer result: {result}");

                } while (bytesRead < lenBuffer + lenHeader);


                return result;
            }
            catch (Exception e)
            {
                _logHandler.Info(e.ToString());
                return null;
            }
        }

        public void CerrarSocket()
        {
            //this.socket.Close();
        }

        public void Monitorear(String cadena)
        {
            if (siLogActividad)
            {
                _logHandler.Info("CORE --- " + cadena);
            }
        }

        /// <summary>
        /// Envia evento web(buffer) a logica y responde a web con cada uno de los eventos generados por la logica
        /// </summary>
        /// <param name="buffer">cadena contenedora del evento que se envia a la logica</param>
        /// <param name="puertoCliente">puerto servidor</param>
        /// <param name="cmd"></param>
        public string SocketClienteEnviar(string buffer, int puertoCliente, int cmd)
        {
            string result = string.Empty;

            string cadena = null;

            IniciarSocketCliente(puertoCliente);

            try
            {
                _logHandler.Info($"ZSocket socketClienteEnviar buffer length: {buffer.Length.ToString()}, buffer: {buffer}");
                Transferir(buffer);

                // Si el comando es CM_LINEAMEMO, el servidor no retorna respuesta		
                if (cmd == ZCommandConst.CM_LINEAMEMO || cmd == ZCommandConst.CM_FINMEMO || cmd == ZCommandConst.CM_INICIOMEMO)
                {
                    return string.Empty;
                }

                result = Recibir();
            }
            catch (Exception e)
            {
                _logHandler.Info("Error al TransferirSinProtocolo: " + e.ToString());
            }
            finally
            {
                CerrarSocket();
            }

            _logHandler.Info(result);

            return result;
        }


        public string SocketClienteEnviar(string buffer)
        {
            String cadena = null;

            IniciarSocketCliente(_azenSettings.Value.PuertoServidor);

            try
            {
                Transferir(buffer);
                cadena = Recibir();
            }
            catch (Exception e)
            {
                _logHandler.Info("Error al TransferirSinProtocolo: " + e.ToString());
            }
            finally
            {
                CerrarSocket();
            }

            return cadena;
        }

        public ZColaEventos ExecuteCommand(ZCommandDTO zCommandDTO)
        {
            var result = SocketClienteEnviar(zCommandDTO.Buffer);
            return JsonConvert.DeserializeObject<ZColaEventos>(result);
        }

        public string ExecuteCommandAsString(ZCommandDTO zCommandDTO)
        {
            return SocketClienteEnviar(zCommandDTO.Buffer);
        }

        public string EjecutarSoloOpcion(string aplicacion, string opcion, string buffer, string dominio, int log, string tkna, IPAddress remoteIpAddress)
        {
            string remoteIP = remoteIpAddress.ToString();
            string localIP = LocalIPAddress().ToString();

            buffer = ZTag.ZTAG_I_CMDEVT + "EJECUTAR" + ZTag.ZTAG_F_CMDEVT +
                ZTag.ZTAG_I_TKNA + tkna + ZTag.ZTAG_F_TKNA +
                ZTag.ZTAG_I_IPCLI + remoteIP + ZTag.ZTAG_F_IPCLI +
                ZTag.ZTAG_I_IPMID + localIP + ZTag.ZTAG_I_IPMID +
                ZTag.ZTAG_I_IDAPLI + aplicacion + ZTag.ZTAG_F_IDAPLI +
                ZTag.ZTAG_I_CLIENTE + "web" + ZTag.ZTAG_F_CLIENTE +
                ZTag.ZTAG_I_LOG + log + ZTag.ZTAG_F_LOG +
                ZTag.ZTAG_I_OPC + opcion + ZTag.ZTAG_F_OPC
;

            string cadena = SocketClienteEnviar(buffer);

            //Obtiene puerto y tkns
            string puertoSrvAplicacion = GetTagValue(ZTag.ZTAG_PSC, cadena);
            string tkns = GetTagValue(ZTag.ZTAG_TKNS, cadena);

            _logHandler.Info($"ZSocket EjecutarSoloOpcion puertoSrvAplicacion: {puertoSrvAplicacion}, tkns: {tkns}");

            string datoTkns = ZTag.ZTAG_I_TKNS + tkns + ZTag.ZTAG_F_TKNS;
            return EjecutarEvento(2, 0, ZCommandConst.CM_EJECOPCION, "", "", aplicacion, Int32.Parse(puertoSrvAplicacion), datoTkns);
        }

        public string EjecutarEvento(int tipo, int tec, int cmd, string info, string buffer, string aplicacion, int puerto, string datoTkn)
        {
            _logHandler.Info("////////////////////////////////// ejecutarEvento aplicacion: " + aplicacion + ", Puerto: " + puerto.ToString() + ", cmd: " + cmd.ToString());
            string cadenaEnviar = new ZEvent(tipo, tec, cmd, info, buffer).ArmarCadenaSocket();

            // Cerios abr 2020
            cadenaEnviar = cadenaEnviar + datoTkn;

            _logHandler.Info(cadenaEnviar);

            return SocketClienteEnviar(cadenaEnviar, puerto, cmd);
        }

        public string GetTagValue(string tag, string buffer)
        {
            return _ztag.ObtValorTag($"<{tag}>", $"</{tag}>", buffer);
        }

        public ZServiceResponse EjecutarServicio(ZServiceDTO zServiceDTO)
        {
            string responseStr = EjecutarServicio(zServiceDTO.IdAplication, zServiceDTO.Opcion, zServiceDTO.Tkna, zServiceDTO.Log, zServiceDTO.ObjectBuffer, zServiceDTO.Cmd, zServiceDTO.HttpMethod.ToString(), zServiceDTO.RemoteIpAddress);

            var zcolaResponse = JsonConvert.DeserializeObject<ZColaServiceEventos>(responseStr);

            ZServiceResponse response = zcolaResponse.Eventos.ElementAt(0).Dato.Buffer;

            if(response.Errors != null)
            {
                throw new ZErrorException(response);
            }

            return response;
        }

        private string EjecutarServicio(string idApl, string opcion, string tkna, int log, object objectBuffer, int cmd, string metodo, string remoteIpAddress)
        {
            siLogActividad = log == 1;

            string xmlBuffer = string.Empty;

            if (objectBuffer != null)
            {
                if (objectBuffer is Dictionary<string, string>)
                {
                    xmlBuffer = _ztag.DictionaryToXml(objectBuffer as Dictionary<string, string>);
                }
                else
                {
                    xmlBuffer = _ztag.JsonToXml(objectBuffer.ToString());
                }
            }

            string cadenaXmlBody =
                ZTag.ZTAG_I_PARAMETROS +
                    ZTag.ZTAG_I_FMT + "xml" + ZTag.ZTAG_F_FMT +
                    ZTag.ZTAG_I_OPER + metodo + ZTag.ZTAG_F_OPER +
                    xmlBuffer +
                ZTag.ZTAG_F_PARAMETROS;

            string localIP = LocalIPAddress().ToString();

            // Ejecuta aplicacion
            _logHandler.Info("ZSocket EjecutarServicio CM_APLICACION " + idApl + ", Opc:" + opcion + ", remoteIP: " + remoteIpAddress + ", localIP: " + localIP);

            string buffer = string.Empty;

            switch (cmd)
            {
                // Cmd que se da cuando se entra parametros de logeo
                case ZCommandConst.CM_EJECSERVICIO:
                    // Arma buffer para enviar con parametros de logeo
                    buffer =
                    ZTag.ZTAG_I_CMDEVT + "EJECUTAR" + ZTag.ZTAG_F_CMDEVT +
                    ZTag.ZTAG_I_TKNA + tkna + ZTag.ZTAG_F_TKNA +
                    ZTag.ZTAG_I_CLIENTE + "web" + ZTag.ZTAG_F_CLIENTE +
                    ZTag.ZTAG_I_IPCLI + remoteIpAddress + ZTag.ZTAG_F_IPCLI +
                    ZTag.ZTAG_I_IPMID + localIP + ZTag.ZTAG_I_IPMID +
                    ZTag.ZTAG_I_IDAPLI + idApl + ZTag.ZTAG_F_IDAPLI +
                    ZTag.ZTAG_I_LOG + log + ZTag.ZTAG_F_LOG +
                    ZTag.ZTAG_I_OPC + opcion + ZTag.ZTAG_F_OPC +
                    ZTag.ZTAG_I_PARAMETROS + "si" + ZTag.ZTAG_F_PARAMETROS; // Indica que es servicio
                    break;
            }

            string cadena = SocketClienteEnviar(buffer);

            //Obtiene puerto donde se ejecuta la aplciacion
            int puertoSrvAplicacion = Int32.Parse(GetTagValue(ZTag.ZTAG_PSC, cadena));
            string tkns = GetTagValue(ZTag.ZTAG_TKNS, cadena);
            _logHandler.Info($"ZSocket puertoSrvAplicacion: {puertoSrvAplicacion}, tkns: {tkns}");

            string datoTkns = ZTag.ZTAG_I_TKNS + tkns + ZTag.ZTAG_F_TKNS;

            string cadEvento = new ZEvent(2, 0, ZCommandConst.CM_EJECSERVICIO, "", "").ArmarCadenaSocket();

            string cadenaEnviar = cadEvento + datoTkns + cadenaXmlBody;

            return SocketClienteEnviar(cadenaEnviar, puertoSrvAplicacion, ZCommandConst.CM_EJECSERVICIO);
        }       
        private IPAddress LocalIPAddress()
        {
            if (!System.Net.NetworkInformation.NetworkInterface.GetIsNetworkAvailable())
            {
                return null;
            }
            IPHostEntry host = Dns.GetHostEntry(Dns.GetHostName());
            return host
               .AddressList
               .FirstOrDefault(ip => ip.AddressFamily == AddressFamily.InterNetwork);
        }

        public T DeserializeXMLToObject<T>(string XmlFilename)
        {
            return _ztag.DeserializeXMLToObject<T>(XmlFilename);
        }
    }
}
