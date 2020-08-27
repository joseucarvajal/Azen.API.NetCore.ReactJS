using System;
using System.Collections.Generic;
using System.Text;

namespace Azen.API.Sockets.General
{
    public static class ZCommandConst
    {
		public const int CM_APLICACION = -1;
		public const int CM_SOLOLOGIN = -2;
		public const int CM_ACEPTARLOGIN = -3;   // pide ventana de logeo
		public const int CM_EXITO = -100;
		public const int CM_ERROR = -200;        // dato: "<codMsj>... </codMsj>  <msj> .... </msj> "   

		public const int CM_NADA = 0;
		public const int CM_SI = 1;
		public const int CM_NO = 2;
		public const int CM_CANCELAR = 3;
		public const int CM_VENTANA = 4;
		public const int CM_MAXIMIZAR = 5;
		public const int CM_MOVERVENTANA = 6;
		public const int CM_DIMENVENTANA = 7;
		public const int CM_MENU = 8;
		public const int CM_AYUDA = 9;
		public const int CM_SALIR = 10;
		public const int CM_CERRAR = 11;
		public const int CM_CERRARTODO = 12;
		public const int CM_EJECUTAR = 13;
		public const int CM_GRABAR = 14;
		public const int CM_GRABARCOMO = 15;
		public const int CM_ABRIR = 16;
		public const int CM_IMPRIMIR = 17;
		public const int CM_PARARIMPRESION = 18;
		public const int CM_VISUALIZAR = 19;
		public const int CM_BORRAR = 20;
		public const int CM_COPIAR = 21;
		public const int CM_CORTAR = 22;
		public const int CM_PEGAR = 23;
		public const int CM_SGTEVENTANA = 24;            /* siguiente ventana */
		public const int CM_IRVENTANA = 25;          /* ir a ventana #... */
		public const int CM_ENTRAR = 26;         /* enter */
		public const int CM_ANTCMP = 27;         /* anterior campo */
		public const int CM_SGTECMP = 28;            /* siguiente campo */
		public const int CM_PRIMCMP = 29;            /* primer campo */
		public const int CM_ULTCMP = 30;         /* ultimo campo */
		public const int CM_SGTESECC = 31;           /* siguiente seccion */
		public const int CM_ARRIBA = 32;
		public const int CM_ABAJO = 33;
		public const int CM_DERECHA = 34;
		public const int CM_IZQUIERDA = 35;
		public const int CM_PRIMERO = 36;
		public const int CM_ULTIMO = 37;
		public const int CM_INTRACMP = 38;           /* intracampo */
		public const int CM_ARRIVAR = 39;
		public const int CM_SGTEREG = 40;
		public const int CM_ANTREG = 41;
		public const int CM_PRIMREG = 42;
		public const int CM_ULTREG = 43;
		public const int CM_ADICIONAR = 44;
		public const int CM_MODIFICAR = 45;
		public const int CM_SGTEPAG = 46;
		public const int CM_ANTPAG = 47;
		public const int CM_PRIMPAG = 48;
		public const int CM_ULTPAG = 49;
		public const int CM_ACEPTAR = 50;
		public const int CM_PRENDERMODO = 51;
		public const int CM_APAGARMODO = 52;
		public const int CM_BUSCAR = 53;
		public const int CM_POSCURSOR = 54;
		public const int CM_ACTUALIZAR = 55;
		public const int CM_BOTONES = 56;
		public const int CM_SELECCIONAR = 57;
		public const int CM_VISMULTI = 58;
		public const int CM_ZOOM = 59;
		public const int CM_ES = 60;
		public const int CM_CONSULTAR = 61;
		public const int CM_DETALLAR = 62;
		public const int CM_DEJAR = 63;
		public const int CM_LIMPIAR = 64;
		public const int CM_LIMPIARINDIC = 65;
		public const int CM_MODIFICADO = 66;
		public const int CM_PONDOMINIO = 67;
		public const int CM_PREADICIONAR = 68;
		public const int CM_POSADICIONAR = 69;
		public const int CM_PREMODIFICAR = 70;
		public const int CM_POSMODIFICAR = 71;
		public const int CM_PREBORRAR = 72;
		public const int CM_POSBORRAR = 73;
		public const int CM_DEJARREG = 74;
		public const int CM_ARRIVARREG = 75;
		public const int CM_DEJARCMP = 76;
		public const int CM_ARRIVARCMP = 77;
		public const int CM_VALREQUERIDO = 78;
		public const int CM_PONADATO = 79;
		public const int CM_OBTDEDATO = 80;
		public const int CM_ARRIVARPAG = 81;
		public const int CM_DEJARPAG = 82;
		public const int CM_ARRIVARRPT = 83;
		public const int CM_DEJARRPT = 84;
		public const int CM_PONREQUERIDO = 85;
		public const int CM_SALTAR = 86;
		public const int CM_EDITAR = 87;
		public const int CM_INSERTAR = 88;
		public const int CM_ELIMINAR = 89;
		public const int CM_EDITARAYUDA = 90;
		public const int CM_REPORTAR = 91;
		public const int CM_ANULAR = 92;
		public const int CM_REFRESCAR = 93;
		public const int CM_RETOCAR = 94;
		public const int CM_RECALCRENGLON = 95;
		public const int CM_PRENDERCONTROL = 96;
		public const int CM_APAGARCONTROL = 97;
		public const int CM_BUSCARSGTE = 98;
		public const int CM_CONTINUAR = 99;
		public const int CM_REINTENTAR = 100;
		public const int CM_POSPONER = 101;
		public const int CM_ARRIVARGRP = 102;
		public const int CM_DEJARGRP = 103;
		public const int CM_ENTRADOULTCMP = 104;
		public const int CM_RTNMARMTRJ = 105;
		public const int CM_RTNMARBVRT = 106;
		public const int CM_RTNMARBHRZ = 107;
		public const int CM_DEJARENC = 108;
		public const int CM_AJUSTAR = 109;
		public const int CM_ARRIVARZORD = 110;
		public const int CM_ESCTX = 111;
		public const int CM_ERRORBORRAR = 112;
		public const int CM_ERRORADICIONAR = 113;
		public const int CM_ERRORMODIFICAR = 114;
		public const int CM_DEJARCMPERROR = 115;
		public const int CM_ARRIVARENC = 116;        // Se envia antes de reportar el encabezado del  grupo
		public const int CM_ARRIVARPIE = 117;        // Se envia antes de reportar el pie del  grupo
		public const int CM_EJECOPCION = 118;
		public const int CM_SINCCAMPO = 119;
		public const int CM_PXCREAR = 120;
		public const int CM_PXDESTRUIR = 121;
		public const int CM_PXARRIVAR = 122;
		public const int CM_PXVISUALIZARRPT = 123;
		public const int CM_VISUALIZARLINEA = 124;
		public const int CM_PXCREARVISOR = 125;
		public const int CM_PXCREARZOOM = 126;
		public const int CM_PXSINCFILA = 127;        // Inicion de sincronizacion de fila de un zoom		
		public const int CM_LIMPIARMULTI = 128;
		public const int CM_CLROTAR = 129;
		public const int CM_IRVENTANA_CS = 130;      // Ir a una ventana	
		public const int CM_CAMBIOCMP = 131;     // Indica que el valor de un campo ha sido modificado
		public const int CM_PXCREARMENSAJE = 132;        // Ventana de mensajes
		public const int CM_REFRESCARVISOR = 133;        // Refrescar visor
		public const int CM_CAMBIOCMPIND = 134;      // Se envia al momento en que cambia un campo indicador
		public const int CM_VISORLINEAACTUAL = 135;      // Indica linea actual
		public const int CM_OCULTARVENTANA = 136;        // Ocultar ventana
		public const int CM_PXCREAROCULTO = 137;     // Crear px oculto
		public const int CM_SINCMODOCAMPO = 138;     // Sincroniza modo de los campos
		public const int CM_IRALINEA = 139;      // Cambio de linea
		public const int CM_SINCBOTON = 140;     // Sincroniza el estado del boton
		public const int CM_PXCREARFRM = 141;
		public const int CM_PRENDERHTML = 142;
		public const int CM_DEFMENU = 143;
		public const int CM_INICIOTRANSACCION = 144;     // Indica inicio de una transaccion compuesta por varios eventos
		public const int CM_FINTRANSACCION = 145;        // Finaliza transaccion
		public const int CM_EXISTESERVIDOR = 146;        // Indica que existe un servidor socket
		public const int CM_DBCONEXION = 147;        // Indica que existe un servidor socket
		public const int CM_DBDESCONEXION = 148;     // Indica que existe un servidor socket
		public const int CM_DBSQL = 149;     // Indica que existe un servidor socket
		public const int CM_CARGARMENU = 150;        // Indica que sea cargado el menu

		public const int CM_INICIOTRANSACCIONRPT = 151;      // Indica inicio de una transaccion de reporte compuesta por varios eventos
		public const int CM_FINTRANSACCIONRPT = 152;     // Finaliza transaccion de reporte
																// Tiene mayor prioridad que CM_INICIOTRANSACCION
		public const int CM_PXDESTRUIRWEB = 153;         // Indica que se ha destruido mal una ventana (desde el icono superior derecho)
		public const int CM_EJECSRVAPL = 154;        // Ejecucion de aplicacion como servidor 

		public const int CM_SINCPAR = 155;       // Sincroniza linea de parametros de activacion
		public const int CM_ARRIVARYMODIFCMP = 156;      // Arribar y poner en modificado un campo

		public const int CM_INICIOCICLO = 157;       //Inicio y final de ciclo del zimp  CErios sep 2006
		public const int CM_FINALCICLO = 158;
		public const int CM_LOG = 159;

		// Comandos de edicion en multi
		public const int CM_INSERTARLINEA = 160;
		public const int CM_ELIMINARLINEA = 161;
		public const int CM_GRABARLINEA = 162;
		public const int CM_ADICIONARLINEA = 163;
		//////////////////////////////////////////////////////////
		// Comandos memo
		public const int CM_INICIOMEMO = 164;
		public const int CM_FINMEMO = 165;
		public const int CM_LINEAMEMO = 166;

		public const int CM_REGESTADO = 167;
		public const int CM_SINCCOM = 168;
		public const int CM_PONERMODAL = 169;
		public const int CM_QUITARMODAL = 170;
		public const int CM_INICTRANSARCHIVO = 171;
		public const int CM_FINTRANSARCHIVO = 172;

		public const int CM_EXPORTAR = 173;
		public const int CM_DESCARGAR = 174; // Cerios feb 2009
		public const int CM_CORREO = 175;    // Cerios feb 2009
		public const int CM_URL = 176; //   cerIOS ABR 2009
		public const int CM_PXCREARMOV = 177;  // Cerios Feb 2018: Para crear zmfts.
		public const int CM_SINCLINESTADO = 178; //	Cerios Feb 2018
		public const int CM_IRACMP = 179; //   Cerios Mzo 2018
		public const int CM_CARGARARCHIVO = 180; //   Cerios jun 2018
		public const int CM_DEJARPIE = 181; //   Cerios sep 2018
		public const int CM_DEJARDETALLES = 182; //   Cerios sep 2018
		public const int CM_CAMBIOCMPASTERISCO = 183; // Ceriosp oct 2018
		public const int CM_TERMINAR = 184; // Cerios feb 2020 - Salir sin preguntar.
		public const int CM_EJECSOLOOPCION = 185; // Cerios mar 2020 - Ejecuta solo opcion
		public const int CM_TKNA = 186; // cerios abr 2020 token autorizacion
		public const int CM_TKNS = 187; //  token sesion 
		public const int CM_PUERTO = 188; //  Puerto 


		//cerios jun 2020 
		public const int CM_EJECSERVICIO = 189; //  ejecutar servicio 
		public const int CM_POST = 190; //  para actualizar datos	o procesar 
		public const int CM_GET = 191; //  para consultar o listar  
		public const int CM_PUT = 192; //  para modificar	 
		public const int CM_DEL = 193; //  para eliminar 
		public const int CM_RESSERVICIO = 194;   // Respuesta servicio 

		public const int CM_NUMCODIGOS = 195;

		public static readonly string[] CMNombres =
		   {
			"Nada", // 0
			"Si",
			"No",
			"Cancelar",
			"Ventana",
			"Maximizar",
			"MoverVenatana",
			"DimenVentana",
			"Menu",
			"Ayuda",
			"Salir",
			"Cerrar",
			"CerrarTodo",
			"Ejecutar",
			"Grabar",
			"GrabarComo",
			"Abrir",
			"Imprimir",
			"PararImpresion",
			"Visualizar",
			"Borrar",
			"Copiar",
			"Cortar",
			"Pegar",
			"SgteVentana",
			"IrVentana",
			"Entrar",
			"AntCmp",
			"SgteCmp",
			"PrimCmp",
			"UltCmp",
			"SgteSecc",
			"Arriba",
			"Abajo",
			"Derecha",
			"Izquierda",
			"Primero",
			"Ultimo",
			"IntraCmp",
			"Arrivar",
			"SiguienteRegistro",
			"AnteriorRegistro",
			"PrimReg",
			"UltReg",
			"Adicionar",
			"Modificar",
			"SiguientePagina",
			"AnteriorPagina",
			"PrimPag",
			"UltPag",
			"Aceptar",
			"PrenderModo",
			"ApagarModo",
			"Buscar",
			"PosCursor",
			"Actualizar",
			"Botones",
			"Seleccionar",
			"VisMulti",
			"Zoom",
			"Es",
			"Consultar",
			"Detallar",
			"Dejar",
			"Limpiar",
			"LimpiarIndic",
			"Modificado",
			"PonDominio",
			"PreAdicionar",
			"PosAdicionar",
			"PreModificar",
			"PosModificar",
			"PreBorrar",
			"PosBorrar",
			"DejarReg",
			"ArrivarReg",
			"DejarCmp",
			"ArrivarCmp",
			"ValRequerido",
			"PonADato",
			"ObtDeDato",
			"ArrivarPag",
			"DejarPag",
			"ArrivarRpt",
			"DejarRpt",
			"PonRequerido",
			"Saltar",
			"Editar",
			"Insertar",
			"Eliminar",
			"EditarAyuda",
			"Reportar",
			"Anular",
			"Refrescar",
			"Retocar",
			"RecalcRenglon",
			"PrenderControl",
			"ApagarContrlo",
			"BuscarSiguiente",
			"Continuar",
			"Reintentar",
			"Posponer",
			"ArrivarGrp",
			"DejarGrp",
			"EntraDeUltCmp",
			"RtnMarMtrj",
			"RtnMarBvrt",
			"RtnMarBhrz",
			"DejarEnc",
			"Ajustar",
			"ArrivarZord",
			"EsCtx",
			"ErrorBorrar",
			"ErrorAdicionar",
			"ErrorModificar",
			"DejarCmpError",
			"ArrivarEnc",
			"ArrivarPie",
			"EjeOpcion",
			"SincCampo",
			"PxCrear",
			"PxDestruir",
			"PxArrivar",
			"PxVisualizarRpt",
			"PxVisualizarLinea",
			"PxCrearVisor",
			"PxCrearZoom",	
			"PxSincFila",		
			"LimpiarMulti",
			"ClRotar",
			"IrVentana",	
			"CambioCmp",
			"PxCrearMensaje",
			"RefrescarVisor",
			"CambioCmpInd",
			"VisorLineaActual",
			"OcultarVentana",
			"PxCrearOculto",
			"SincModoCampo",
			"IrALinea",
			"SincBoton",
			"PXCrearForma",
			"PrenderHtml",
			"DefMenu",
			"InicioTransaccion",
			"FinTransaccion",
			"ExisteServidor",
 			"Conexion",
 			"Desconexion",
  			"Sql",
 			"CargarMenu",
 			"InicioTranRPT",
 			"FinTranRPT",
			"PxDestruirWeb",
			"EjecSrvAplicacion",
 			"SincParAct",
 			"ArribarYModificarCmp",
 			"InicioCiclo",
 			"FinCiclo",
 			"LOG",
 			"InsertarLinea",
 			"EliminarLinea",
 			"GrabarLinea",
 			"AdicionarLinea",
			"IniMemo",
			"FinMemo",
 			"LineaMemo",
 			"RegEstado",
 			"SincComunicacion",
 			"PonerModal",
 			"QuitarModal",
 			"InicTransArchivo",
 			"FinTransArchivo",
			"Exportar",	
			"Descargar",
			"Correo",
			"URL",
			"PXCrearMovimiento",
			"SincLinEstado",
			"IrACampo",
			"CargarArchivo",
			"Dejar pie",
			"Dejar detalles",
			"Cambio cmp asterisco",
			"Terminar", 
			"Ejecutar solo opcion",
			"token autorizacion",
			"token sesion",	
			"Puerto",
			"Ejecutar servicio",
			"Post",
			"Get",
			"Put",
			"Del",	
			"Respuesta servicio",
 			"NumCodigos"
		  };
    }
}
