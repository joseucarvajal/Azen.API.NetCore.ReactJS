﻿using Azen.API.Sockets.Settings;
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

        public ZSocket(IOptions<AzenSettings> azenSettings, ZTag ztag, LogHandler logHandler)
        {
            _azenSettings = azenSettings;
            _logHandler = logHandler;
            _ztag = ztag;

            siLogActividad = false;

            socket = null;
        }

        public void IniciarSocketCliente(int puerto)
        {
            try
            {
                // Insiste en crear el socket cliente hasta que exista servidor.		
                do
                {
                    _logHandler.Info("========== CREANDO SCKCLIENTE ip=" + _azenSettings.Value.IPC + " -- puerto=" + puerto);
                    Thread.Sleep(1000);
                } while (! CrearSckCliente(_azenSettings.Value.IPC, puerto));

                _logHandler.Info("ZAzen solicitarIpCliente asignado: " + _azenSettings.Value.IPC);
                _logHandler.Info("ZAzen iniciarSocketCliente conectado");
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
                /* Se crea el socket cliente */
                socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                socket.Connect(servidor, puerto);
            }
            catch (Exception e)
            {
                Monitorear("ERROR al CrearSckCliente servidor: " + servidor + " -- puerto: " + puerto);
                _logHandler.Info(e.ToString());
                return false;

            }

            return true;
        }

        public int TransferirSinProtocolo(string dato)
        {

            int error;

            // inicio tranferencias
            if (ZSCK_EXITO != (error = EnviarProtocolo(ZSCK_INICTRANSF)))
                return error;

            // Envia tamano del bloque
            if (ZSCK_EXITO != Escribir(dato.Length))
            {
                zsck_cadMemError = "Error al enviar tamano del bloque";
                return zsck_errnum = ZSCK_ERRESCRIBIRSOCKET;
            }

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
                socket.Send(msg);
                //Escribir("<cm>SOLOLOGIN</cm>");
            }
            catch (Exception e)
            {
                _logHandler.Info(e.ToString());
                return zsck_errnum = ZSCK_ERRESCRIBIRSOCKET;
            }

            return zsck_errnum = ZSCK_EXITO;
        }

        public int Escribir(int dato)
        {
            // inicio tranferencias
            try
            {
                int datoConvert = System.Net.IPAddress.HostToNetworkOrder(dato);

                byte[] msg = BitConverter.GetBytes(datoConvert);
                socket.Send(msg);
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

        public int RecibirProtocolo()
        {
            byte[] bytes = new byte[sizeof(Int32)];

            int operacionLeida;
            try
            {
                int bytesRec = socket.Receive(bytes);
                operacionLeida = BitConverter.ToInt32(bytes.Reverse().ToArray(), 0);
            }
            catch (Exception e)
            {
                _logHandler.Info(e.ToString());
                return zsck_errnum = ZSCK_ERRLEERSOCKET;
            }

            return operacionLeida;

        }

        public string RecibirSinProtocolo()
        {
            int tamanoBloque;
            string bloque;

            // Recibe tamano del bloque
            if (0 > (tamanoBloque = Leer()))
            {
                zsck_cadMemError = "Error al recibir tamano del bloque";
                //		Monitorear("Error ZSCK_ERRESCRIBIRSOCKET");
                EnviarProtocolo(ZSCK_ERROR);
                zsck_errnum = ZSCK_ERRESCRIBIRSOCKET;
                return null;
            }

            //recibe bloque 
            if (null == (bloque = Leer(tamanoBloque)))
            {
                zsck_cadMemError = "Error al enviar bloque de datos";
                //		Monitorear("Error ZSCK_ERRESCRIBIRSOCKET");	
                EnviarProtocolo(ZSCK_ERROR);
                zsck_errnum = ZSCK_ERRESCRIBIRSOCKET;
                return null;
            }

            return bloque;

        }

        public int Leer()
        {
            byte[] bytes = new byte[sizeof(Int32)];

            int tamano;
            try
            {
                int bytesRec = socket.Receive(bytes);
                tamano = BitConverter.ToInt32(bytes.Reverse().ToArray(), 0);
            }
            catch (Exception e)
            {
                _logHandler.Info(e.ToString());
                return -1;
            }

            return tamano;

        }

        public string Leer(int tamano)
        {
            // Array de bytes auxiliar para la lectura de la cadena.
            byte[] bytes = new byte[tamano];
            try
            {
                int bytesRec = socket.Receive(bytes);
                return Encoding.UTF8.GetString(bytes, 0, bytesRec);
            }
            catch (Exception e)
            {
                _logHandler.Info(e.ToString());
                return null;
            }
        }

        public void CerrarSocket()
        {
            this.socket.Close();
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
            string numEvtsCadena;
            int numEvts;

            IniciarSocketCliente(puertoCliente);

            try
            {
                _logHandler.Info("################### socketClienteEnviar: " + buffer.Length.ToString() + " --- " + buffer);
                TransferirSinProtocolo(buffer);

                // Si el comando es CM_LINEAMEMO, el servidor no retorna respuesta		
                if (cmd == ZCommandConst.CM_LINEAMEMO || cmd == ZCommandConst.CM_FINMEMO || cmd == ZCommandConst.CM_INICIOMEMO)
                {
                    return string.Empty;
                }

                if (RecibirProtocolo() == ZSocket.ZSCK_INICTRANSF)
                {
                    cadena = RecibirSinProtocolo();
                }

                numEvtsCadena = GetTagValue(ZTag.ZTAG_NUMEVT, cadena);

                // Si la cadena indica que hay mas eventos para recibir
                // leer ese numero de eventos
                if (numEvtsCadena != null)
                {
                    numEvts = Int32.Parse(numEvtsCadena);

                    // CErios julio 2017: Pendiete revisar que esta pasando con el ciclo, no esta 
                    // escrubiendo al cliente.
                    //for(int i=0; i<numEvts; i++)
                    //{
                    if (RecibirProtocolo() == ZSocket.ZSCK_INICTRANSF)
                    {
                        cadena = RecibirSinProtocolo();
                        result = cadena.Substring(0, cadena.Length - 1);
                    }
                    //}
                }
                else // Si la cadena solo es un evento
                {
                    // Cerios 2017: html por json
                    //out.print(JZTag.ZTAG_I_EVT + cadena.substring(0, cadena.length() - 1) + JZTag.ZTAG_F_EVT);
                    result = cadena.Substring(0, cadena.Length - 1);
                }

                CerrarSocket();
            }
            catch (Exception e)
            {
                _logHandler.Info("Error al TransferirSinProtocolo: " + e.ToString());
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
                TransferirSinProtocolo(buffer);
                if (RecibirProtocolo() == ZSocket.ZSCK_INICTRANSF)
                    cadena = RecibirSinProtocolo();
                CerrarSocket();
            }
            catch (Exception e)
            {
                _logHandler.Info("Error al TransferirSinProtocolo: " + e.ToString());
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

        public string EjecutarComando(string aplicacion, string dominio, string buffer, string tkna, string tkns, int log, int puertoSrvAplicacion, int cmd)
        {
            string result = string.Empty;
            string buffer1;

            siLogActividad = 1 == log;

            string datoTkns = ZTag.ZTAG_I_TKNS + tkns + ZTag.ZTAG_F_TKNS;
            try
            {
                switch (cmd)
                {
                    // Cmd que se da cuando se entra parametros de logeo
                    case ZCommandConst.CM_SOLOLOGIN: // Retorna tkna
                        buffer1 = ZTag.ZTAG_I_CMDEVT + "SOLOLOGIN" + ZTag.ZTAG_F_CMDEVT + buffer;
                        result = SocketClienteEnviar(buffer1);
                        break;
                    case ZCommandConst.CM_ACEPTARLOGIN:  // Retorna tkna y json con menu de aplicaciones
                        buffer1 = ZTag.ZTAG_I_CMDEVT + "LOGIN" + ZTag.ZTAG_F_CMDEVT + buffer;
                        result = SocketClienteEnviar(buffer1);
                        break;
                    case ZCommandConst.CM_APLICACION:
                        // Arma buffer para enviar con parametros de logeo
                        buffer1 = ZTag.ZTAG_I_CMDEVT + "EJECUTAR" + ZTag.ZTAG_F_CMDEVT +
                            ZTag.ZTAG_I_TKNA + tkna + ZTag.ZTAG_F_TKNA +
                            ZTag.ZTAG_I_IPSC + "0000" + ZTag.ZTAG_F_IPSC +
                            ZTag.ZTAG_I_PSC + "0000" + ZTag.ZTAG_F_PSC +
                            ZTag.ZTAG_I_IDAPLI + aplicacion + ZTag.ZTAG_F_IDAPLI +
                            ZTag.ZTAG_I_LOG + log + ZTag.ZTAG_F_LOG +
                            ZTag.ZTAG_I_CLIENTE + "web" + ZTag.ZTAG_F_CLIENTE;
                        result = SocketClienteEnviar(buffer1);
                        break;
                    case ZCommandConst.CM_DEFMENU:
                        result = EjecutarEvento(2, 0, cmd, buffer, "", aplicacion, puertoSrvAplicacion, datoTkns);
                        break;

                    case ZCommandConst.CM_EJECOPCION:            // opcion de menu desplegado
                        result = EjecutarEvento(2, 0, cmd, buffer, "", aplicacion, puertoSrvAplicacion, datoTkns);
                        break;

                    case ZCommandConst.CM_IRVENTANA_CS:
                        result = EjecutarEvento(2, 0, cmd, buffer, "", aplicacion, puertoSrvAplicacion, datoTkns);
                        break;
                    default:
                        result = EjecutarEvento(2, 0, cmd, "", buffer, aplicacion, puertoSrvAplicacion, datoTkns);
                        break;
                }
            }
            catch (Exception e)
            {
                _logHandler.Info(e.ToString());
            }

            return result;
        }

        public string EjecutarSoloOpcion(string aplicacion, string opcion, string buffer, string dominio, int log, string tkna)
        {
            buffer = ZTag.ZTAG_I_CMDEVT + "EJECUTAR" + ZTag.ZTAG_F_CMDEVT +
                ZTag.ZTAG_I_TKNA + tkna + ZTag.ZTAG_F_TKNA +
                ZTag.ZTAG_I_IPSC + "0000" + ZTag.ZTAG_F_IPSC +
                ZTag.ZTAG_I_PSC + "0000" + ZTag.ZTAG_F_PSC +
                ZTag.ZTAG_I_IDAPLI + aplicacion + ZTag.ZTAG_F_IDAPLI +
                ZTag.ZTAG_I_CLIENTE + "web" + ZTag.ZTAG_F_CLIENTE +
                ZTag.ZTAG_I_LOG + log + ZTag.ZTAG_F_LOG +
                ZTag.ZTAG_I_OPC + opcion + ZTag.ZTAG_F_OPC
;

            string cadena = SocketClienteEnviar(buffer);

            //Obtiene puerto y tkns
            string puertoSrvAplicacion = GetTagValue(ZTag.ZTAG_PSC, cadena);
            string tkns = GetTagValue(ZTag.ZTAG_TKNS, cadena);

            _logHandler.Info(puertoSrvAplicacion);
            _logHandler.Info(tkns);
            _logHandler.Info("---- CM_EJECOPCION");

            string datoTkns = ZTag.ZTAG_I_TKNS + tkns + ZTag.ZTAG_F_TKNS;
            return EjecutarEvento(2, 0, ZCommandConst.CM_EJECOPCION, "", "", aplicacion, Int32.Parse(puertoSrvAplicacion), datoTkns);
        }

        public string EjecutarEvento(int tipo, int tec, int cmd, string info, string buffer, string aplicacion, int puerto, string datoTkn)
        {
            _logHandler.Info("///////// ejecutarEvento aplicacion: " + aplicacion + ", Puerto: " + puerto.ToString());
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

        public T DeserializeXMLToObject<T>(string XmlFilename)
        {
            return _ztag.DeserializeXMLToObject<T>(XmlFilename);
        }
    }
}
