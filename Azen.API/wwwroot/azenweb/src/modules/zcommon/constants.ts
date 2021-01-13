export namespace Constants {
        
    export const AZEN_USER_SESSION_KEY = "azenSessionUsername";

    export enum FormatoDatoEventoEnum {
        XML = "xml",
        JSON = "json"
    }

    export enum TipoRecurso {
        Basico,
        Zoom,
        Movimento,
        Multi
    }

    export enum TipoBoton {
        Comando,
        Linea
    }

    export const CAMPO_RADIO: number = 2;
    export const CAMPO_CHECKBOX: number = 1;
    export const CAMPO_TEXTO: number = 0;

    export enum SessionStorageKeyEnum {
        AZEN_PUERTO = "azenAplPto"
    }

    export enum TipoEventoEnum {
        EVT_NADA,
        EVT_TECLA,
        EVT_COMANDO,
        EVT_MENSAJE,
        EVT_RATON
    }

    export enum TipoAJAXIndicadorEnum {
        NIGUNO,
        MODAL,
        NO_MODAL
    }

    export enum ComandoEnum {
        CM_NADA,	//0
        CM_SI,	//1	
        CM_NO,	//2
        CM_CANCELAR,	//3
        CM_VENTANA,	//4
        CM_MAXIMIZAR,	//5
        CM_MOVERVENTANA,	//6
        CM_DIMENVENTANA,	//7
        CM_MENU,	//8
        CM_AYUDA,	//0
        CM_SALIR,	//10
        CM_CERRAR,	//11
        CM_CERRARTODO,	//12
        CM_EJECUTAR,	//13
        CM_GRABAR,	//14
        CM_GRABARCOMO,	//15
        CM_ABRIR,	//16
        CM_IMPRIMIR,	//17
        CM_PARARIMPRESION,	//18
        CM_VISUALIZAR,	//19
        CM_BORRAR,	//20
        CM_COPIAR,	//21
        CM_CORTAR,	//22
        CM_PEGAR,	//23
        CM_SGTEVENTANA,	//24	/* siguiente ventana */
        CM_IRVENTANA,	//25	/* ir a ventana #... */
        CM_ENTRAR,	//26	/* enter */
        CM_ANTCMP,	//27	/* anterior campo */
        CM_SGTECMP,	//28	/* siguiente campo */
        CM_PRIMCMP,	//29	/* primer campo */
        CM_ULTCMP,	//30	/* ï¿½ltimo campo */
        CM_SGTESECC,	//31	/* siguiente secciï¿½n */
        CM_ARRIBA,	//32
        CM_ABAJO,	//33
        CM_DERECHA,	//34
        CM_IZQUIERDA,	//35
        CM_PRIMERO,	//36
        CM_ULTIMO,	//37
        CM_INTRACMP,	//38	/* intracampo */
        CM_ARRIVAR,	//39
        CM_SGTEREG,	//40
        CM_ANTREG,	//41
        CM_PRIMREG,	//42
        CM_ULTREG,	//43
        CM_ADICIONAR,	//44
        CM_MODIFICAR,	//45
        CM_SGTEPAG,	//46
        CM_ANTPAG,	//47
        CM_PRIMPAG,	//48
        CM_ULTPAG,	//49
        CM_ACEPTAR,	//50
        CM_PRENDERMODO,	//51
        CM_APAGARMODO,	//52
        CM_BUSCAR,	//53
        CM_POSCURSOR,	//54
        CM_ACTUALIZAR,	//55
        CM_BOTONES,	//56
        CM_SELECCIONAR,	//57
        CM_VISMULTI,	//58
        CM_ZOOM,	//59
        CM_ES,	//60
        CM_CONSULTAR,	//61
        CM_DETALLAR,	//62
        CM_DEJAR,	//63
        CM_LIMPIAR,	//64
        CM_LIMPIARINDIC,	//65
        CM_MODIFICADO,	//66
        CM_PONDOMINIO,	//67
        CM_PREADICIONAR,	//68
        CM_POSADICIONAR,	//69
        CM_PREMODIFICAR,	//70
        CM_POSMODIFICAR,	//71
        CM_PREBORRAR,	//72
        CM_POSBORRAR,	//73
        CM_DEJARREG,	//74
        CM_ARRIVARREG,	//75
        CM_DEJARCMP,	//76
        CM_ARRIVARCMP,	//77
        CM_VALREQUERIDO,	//78
        CM_PONADATO,	//79
        CM_OBTDEDATO,	//80
        CM_ARRIVARPAG,	//81
        CM_DEJARPAG,	//82
        CM_ARRIVARRPT,	//83
        CM_DEJARRPT,	//84
        CM_PONREQUERIDO,	//85
        CM_SALTAR,	//86
        CM_EDITAR,	//87
        CM_INSERTAR,	//88
        CM_ELIMINAR,	//89
        CM_EDITARAYUDA,	//90
        CM_REPORTAR,	//91
        CM_ANULAR,	//92
        CM_REFRESCAR,	//93
        CM_RETOCAR,	//94
        CM_RECALCRENGLON,	//95
        CM_PRENDERCONTROL, //96
        CM_APAGARCONTROL,	//97
        CM_BUSCARSGTE,	//98
        CM_CONTINUAR,	//99      
        CM_REINTENTAR,	//100
        CM_POSPONER,	//101
        CM_ARRIVARGRP,	//102
        CM_DEJARGRP,	//103
        CM_ENTRADOULTCMP,	//104
        CM_RTNMARMTRJ,	//105
        CM_RTNMARBVRT,	//106
        CM_RTNMARBHRZ,	//107
        CM_DEJARENC,	//108
        CM_AJUSTAR,	//109
        CM_ARRIVARZORD,	//110
        CM_ESCTX,	//111
        CM_ERRORBORRAR,	//112
        CM_ERRORADICIONAR, //113
        CM_ERRORMODIFICAR, //114
        CM_DEJARCMPERROR, //115	se envia cuando se estï¿½ dejando
        // el campo y har error al
        // validar la juntura no debil.
        // Protocolo de retorno del info:
        //  0 : retorna 0 (suspende acciï¿½n).
        //  1 : despliega mensaje estï¿½ndar y
        //	retorna 0.
        //  2 : retorna 1 (aceptar acciï¿½n).
        //
        // CERios Abr/1/2000
        CM_ARRIVARENC,	//116 // Se envia antes de reportar el encabezado del  grupo
        CM_ARRIVARPIE,	//117 // Se envia antes de reportar el pie del  grupo

        // CErios Sep 2005
        CM_EJECOPCION,	//118 // Ejecuctar opcion habilitado para cliente servidor

        CM_SINCCAMPO,	//119 // Sincronizar campo entre UI y Logica
        CM_PXCREAR,	//120
        CM_PXDESTRUIR,	//121
        CM_PXARRIVAR,	//122
        CM_PXVISUALIZARRPT, //123	
        CM_VISUALIZARLINEA,	//124 // Linea de reporte
        CM_PXCREARVISOR,	//125 // Crea px para visualizacion
        CM_PXCREARZOOM,	//126
        CM_PXSINCFILA,	//127	// Inicion de sincronizacion de fila de un zoom
        CM_LIMPIARMULTI,	//128	// Limpiar multirregistro
        CM_CLROTAR,	//129	// rota la coleccion
        CM_IRVENTANA_CS,	//130	// Ir a una ventana	
        CM_CAMBIOCMP,	//131	// Se envia al momento en que deja un campo y este ha sido modificado
        CM_PXCREARMENSAJE, //132	// Ventana de mensajes
        CM_REFRESCARVISOR, //133	// Refrescar visor
        CM_CAMBIOCMPIND,	//134	// Se envia al momento en que cambia un campo indicador
        CM_VISORLINEAACTUAL, //135	// Indica linea actual
        CM_OCULTARVENTANA, //136	// Ocultar ventana
        CM_PXCREAROCULTO, //137	// Crear px oculto
        CM_SINCMODOCAMPO, //138	// Sincroniza modo de los campos
        CM_IRALINEA,	//139	// Cambio de linea
        CM_SINCBOTON,	//140	// Sincroniza el estado del boton
        CM_PXCREARFRM,	//141
        CM_PRENDERHTML,	//142
        CM_DEFMENU,	//143
        CM_INICIOTRANSACCION,   //144	// Indica inicio de una transaccion compuesta por varios eventos
        CM_FINTRANSACCION, //145	// Finaliza transaccion
        CM_EXISTESERVIDOR,	//146 // Indica que existe un servidor socket
        CM_DBCONEXION,	//147	// Conecta BD
        CM_DBDESCONEXION,	//148 // Desconecta BD
        CM_DBSQL,	//149	// Sentencia sql
        CM_CARGARMENU,	//150	// Indica que sea cargado el menu

        CM_INICIOTRANSACCIONRPT,	//151 // Indica inicio de una transaccion de reporte compuesta por varios eventos
        CM_FINTRANSACCIONRPT, //152	// Finaliza transaccion de reporte
        // Tiene mayor prioridad que CM_INICIOTRANSACCION
        CM_PXDESTRUIRWEB, //153 // Indica que se ha destruido mal una ventana (desde el icono superior derecho)

        CM_EJECSRVAPL,	//154	// Ejecucion de aplicacion como servidor 
        CM_SINCPAR,	//155	// Sincroniza linea de parametros de activacion
        CM_ARRIVARYMODIFCMP, //156	// Arribar y poner en modificado un campo

        CM_INICIOCICLO,	//157 //Inicio y final de ciclo del zimp  CErios sep 2006
        CM_FINALCICLO,	//158
        CM_LOG,	//159

        // Comandos de edicion en multi
        CM_INSERTARLINEA,	//160
        CM_ELIMINARLINEA,	//161
        CM_GRABARLINEA,	//162
        CM_ADICIONARLINEA,	//163
        //////////////////
        // Comandos memo
        CM_INICIOMEMO,	//164
        CM_FINMEMO,	//165
        CM_LINEAMEMO,	//166

        CM_REGESTADO,	//167	// CERios Nov 2006
        CM_SINCCOM,	//168
        CM_PONERMODAL,	//169
        CM_QUITARMODAL,	//170
        CM_INICTRANSARCHIVO, //171	// Junio 2007
        CM_FINTRANSARCHIVO, //172
        CM_EXPORTAR,	//173
        CM_DESCARGAR,	//174	// Cerios feb 2009
        CM_CORREO,	//175	// Cerios feb 2009
        CM_URL,	//176   cerIOS ABR 2009

        //CM_NUMCODIGOS, // 177

        CM_PXCREARMOV,
        CM_IRACMP = 179,

        CM_CAMBIOCMPASTERISCO = 183,

        CM_TERMINAR = 184,
        CM_EJECSOLOOPCION = 185,
        CM_TKNA = 186,
        CM_TKNS = 187,
        CM_PUERTO = 188,
        CM_EJECSOLOOPCION_TKNA = 189,

        CM_SALTAR_IRALINEA = 198,
        CM_SALTAR_IRALINEA_IRACMP = 199,
        CM_SALTAR_IRACMP = 200,
        CM_SALTAR_DETALLAR = 204,
        CM_PROCESARMULTIEVENTOS = 205,

        CM_APLICACION = -1,
        CM_LOGIN = -2,
        CM_ACEPTARLOGIN = -3,
    }

    export enum ClaseIndicadorEnum {
        ZCMP_NOINDICADOR,
        ZCMP_CHEQUEO,
        ZCMP_RADIO
    }

    export enum ModoCampoEnum {
        ZCMP_APAGADO = -1,
        /* modos b sicos para el campo - zcmp.modo */
        ZCMP_MSOLOVISUAL = 0, //parseInt("0x01", 16), /* sólo es visualizable */
        ZCMP_MFIJO = 1, //parseInt("0x02", 16),	/* nunca se puede mover */
        ZCMP_MCOLUMNARIO = 2, //parseInt("0x04", 16), /* ubicación etiqueta columnaria */
        ZCMP_MNOARRIVABLE = 3, //parseInt("0x08", 16),	/* no se arriva en navegación */
        ZCMP_MDETALLABLE = 4, //parseInt("0x10", 16), /* pone ícono "detallable" */
        ZCMP_MNOLIMPIABLE = 5, //parseInt("0x20", 16), /* inhibe al zcmp_Limpiar() */
        ZCMP_CLAVE = 6, //parseInt("0x40", 16),	/* para clave de acceso */
        ZCMP_DESCRJUNTURA = 7, //parseInt("0x80", 16),	/* es un campo descripción de una juntura */
        // CERios Nov 11 de 2005. Para tener en cuenta en modo C/S
        ZCMP_ESLLAVEPRIMARIA = 8, //parseInt("0x100", 16),	/* es un campo que pertenece a la llave primaria  */

        // CERios Ago 2006. Identificacion de lista estatica
        ZCMP_LISTAESTATICA = 9, //parseInt("0x200", 16) = Math.pow(2, 9) = 512

        ZCMP_MCARGARARCHIVO = 10, //parseInt("0x400", 16) = Math.pow(2, 10) = 1024

        /* es lista estatica. No se indica en tipos de indicador porque  
        con ellos se hace uso del campo lonv, y se  requiere 
        en el caso de listas estaticas */
    }

    export enum ControlCampoEnum {
        ZCMP_APAGADO = -1,
        /* Control para la edición de campo */
        ZCMP_EDINIT = 0,   /* Borra contenido al editar*/
        ZCMP_UPCASE = 1,  /* Edición en mayúscula */
        ZCMP_INS = 2,  /* Edición modo inserción */
        ZCMP_EDIT = 3,    /* Edición mormal */
        ZCMP_EDIZQ = 4,  /* Edición poniendo cursor al inicio */
        ZCMP_VISUAL = 5, /* Solo visual */
        ZCMP_INTRACMP = 6, /* */
    }    

    export enum TipoCampoEnum {
        TIPO_ALFABETICO = 65,
        TIPO_BYTE = 66,
        TIPO_ENTERO = 69,
        TIPO_LARGO = 76,
        TIPO_FECHA = 70,
        TIPO_DINERO = 36,
        TIPO_REAL = 82,
        TIPO_HORA = 72,
        TIPO_DOBLE = 68,
    }

    export const mesNroMes = new Map<string, number>([
        ["Ene.", 0],
        ["Feb.", 1],
        ["Mar.", 2],
        ["Abr.", 3],
        ["May.", 4],
        ["Jun.", 5],
        ["Jul.", 6],
        ["Ago.", 7],
        ["Sept.", 8],
        ["Oct.", 9],
        ["Nov.", 10],
        ["Dic.", 11],        
    ]);

}