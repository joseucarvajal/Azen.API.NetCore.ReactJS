using System;
using System.Collections.Generic;
using System.Text;

namespace Azen.API.Sockets.General
{
    public class ZEvent
    {
        public int tipo;        /* tipo del evento */
        public int tec;     /* codigo tecla cuando evento tecla */
        public int cmd;     /* codigo comando cuando evento comando */
        public string info;     /* info para mensajes entre objetos */
        public string buffer;       /* buffer para comunicacion entre objetos */

        // Cerios sep 2019: opcion para lanzar una sola funcionalidad
        public string opcion;       /* para lanzar una sola funcionalidad */

        public const int NADA = 0;
        public const int TECLA = 1;
        public const int COMANDO = 2;
        public const int MENSAJE = 3;
        public const int RATON = 4;

        public ZEvent(int tipo, int tec, int cmd, string info, string buffer, string opcion)
        {
            this.tipo = tipo;
            this.tec = tec;
            this.cmd = cmd;
            this.info = info;
            this.buffer = buffer;
            this.opcion = opcion;
        }


        public ZEvent(int tipo, int tec, int cmd, string info, string buffer)
        {
            this.tipo = tipo;
            this.tec = tec;
            this.cmd = cmd;
            this.info = info;
            this.buffer = buffer;
            this.opcion = null;
        }

        public ZEvent(int tipo, int tec, int cmd, string buffer)
        {
            this.tipo = tipo;
            this.tec = tec;
            this.cmd = cmd;
            this.info = null;
            this.buffer = buffer;
            this.opcion = null;
        }

        public string ArmarCadenaSocket()
        {
            return (ZTag.ZTAG_I_TIPOEVT + tipo + ZTag.ZTAG_F_TIPOEVT +
                    ZTag.ZTAG_I_TECEVT + tec + ZTag.ZTAG_F_TECEVT +
                  ZTag.ZTAG_I_CMDEVT + cmd + ZTag.ZTAG_F_CMDEVT +
                  ZTag.ZTAG_I_INFOEVT + info + ZTag.ZTAG_F_INFOEVT +
                  ZTag.ZTAG_I_BUFFEREVT + buffer + ZTag.ZTAG_F_BUFFEREVT +
                  ZTag.ZTAG_I_OPC + opcion + ZTag.ZTAG_F_OPC
              );
        }
    }
}
