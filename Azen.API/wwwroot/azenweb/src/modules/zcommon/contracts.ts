import { Constants } from "./constants";
import { ResultadoAction } from "../zutils/models";
import { ZIconoBoton } from "./index";
import { ZMenuItemContainer } from "../zmenu/containers/ZMenuItemContainer";
import { ZColaEventosClienteState } from "./state";

//#region =============================================== UTILS ===============================================
export interface CfgObj {
  azenBackEndURL: string;
  urlCargarArchivo: string;
}
//#endregion

//#region =============================================== UTILS ===============================================

export class IdEntityBase {
  id: number;
}

export interface IEntityNormalizeObj {
  byId: any;
  allIds: Array<number>;
}

export class EntityNormalizedObj<TEntity> {
  constructor() {
    this.byId = {};
    this.allIds = [];
  }

  byId: EntityMap<TEntity>;
  allIds: Array<number>;
}

export class EntityMap<TEntity> {
  [id: number]: TEntity;
}

//#endregion

//#region =============================================== DOMAIN ===============================================
export interface ZCommandDTO {
  tkna: string;
  tkns: string;
  idAp: string;
  port: number;
  buffer: string;
  log: number;
  cmd: Constants.ComandoEnum;
  opcion: string;
}

export interface IZBuffer {
  fto: string;
  dato:
    | string
    | IZMenu
    | IZPantex
    | IZAplList
    | CM.ISincCampo
    | CM.IPrenderControl
    | CM.ISincBoton
    | CM.ILimpiarMulti
    | CM.ILanzarAplRpta
    | CM.SetTkna
    | CM.SetTkns;
}

export interface IZDatoEvento {
  tipo: Constants.TipoEventoEnum;
  tec: number; //tecla
  cmd: Constants.ComandoEnum;
  inf: string;
  buffer: IZBuffer;
}

export interface IZEvento {
  evento: number;
  dato: IZDatoEvento;
}

export interface IZColaEventos {
  numEventos: number;
  eventos: Array<IZEvento>;
}

export interface IZEnviarComandoParamsOptional {
  [prop: string]: any;
}

export interface IZEnviarComandoParams {
  cmd: Constants.ComandoEnum;
  buffer: string;
  tipoAJAXIndicador: Constants.TipoAJAXIndicadorEnum;
  optionalParams?: IZEnviarComandoParamsOptional;
}

export interface IZMenu {
  menu: Array<IZMenuItem>;
}

export interface IZMenuItem {
  nom: string;
  desc: string;
  ctx: string;
  desh: number;
  menu: Array<IZMenuItem>;
}

export interface IZPantex {
  numPx: number;
  zFormaTablaList: Array<IZFormaTabla>;
}

export interface IZRegion {
  zFormaTabla: IZFormaTabla;
}

export interface IZFormaTabla {
  //zft
  ven: IZVentana;

  linEst: Array<IZComandoForma>;
  btns: Array<IZComandoForma>;

  cmps: Array<IZCampo>;
}

/**
 * ZEitem
 */
export interface IZComandoForma {
  etq: string;
  tec: number;
  cmd: Constants.ComandoEnum;
  desh: number; //1:deshabilitado, 0:habilitado
}

export interface IZVentanaBase {
  numPx: number;
  descr: string;
  nomTbl: string;
  nomRcrZoom: string;
  numLinsDatos: number; //Si es multi > 1

  factorDivision: number;
}

export interface IZVentana extends IZVentanaBase {
  nfils: number;
  ncols: number;
  fil: number;
  col: number;
  modo: number;
  cmdsBtn: number;
  cmdsLE: number;
  numLinsEnc: number;

  ctx: number;
  nfilsrx: number;
  ncolsrx: number;
}

export interface IZCampoBase {
  nomCmp: string;
  etq: string;
  claseInd: Constants.ClaseIndicadorEnum;
  lon: number;
  lonv: number;
  control: number;
  modo: number; //Constants.ModoCampo namespace
  posbit: number;

  tipo: number; //Para campos fecha
}

export interface IZCampo extends IZCampoBase {
  lonv: number;
  noEnTabla: number;
  numDec: number;
  cmps?: Array<IZCampo>;
}

export interface IZAplList {
  apls: Array<IZApl>;
}

export interface IZApl {
  apl: string;
  descr: string;

  //Funcionalidades atómicas
  opc?: string;
  descrOpc: string;
  activo?: number;
}

//#region =============================================== Own state ===============================================
export interface IZPantexState extends IdEntityBase {
  id: number; //px
  zFormaTablaStateListIds: Array<number>;

  //Propiedades del state
  zFormaTablaListState: Array<IZFormaTablaState>;
  tipoCmdPantex: Constants.ComandoEnum;

  esModal: boolean;

  cmdCerrar: IZComandoFormaState;
}

export class ZPantexState implements IZPantexState {
  constructor(numPx: number, tipoCmdPantex: Constants.ComandoEnum) {
    this.id = numPx;
    this.tipoCmdPantex = tipoCmdPantex;
    this.zFormaTablaStateListIds = new Array<number>();
    this.cmdCerrar = undefined;
  }

  id: number; //px
  zFormaTablaStateListIds: Array<number>;
  zFormaTablaListState: Array<IZFormaTablaState>;
  tipoCmdPantex: Constants.ComandoEnum;
  esModal: boolean;

  cmdCerrar: IZComandoFormaState;
}

export interface IZFormaTablaState extends IdEntityBase {
  //zft
  id: number;
  idZVentana: number;
  zCampoStateListIds: Array<number>;
  linEstListIds: Array<number>;
  btnsListIds: Array<number>;

  venState: IZVentanaState;
  cmpsState: Array<IZCampoState>;
  linEstState: Array<IZComandoFormaState>;
  btnsState: Array<IZComandoFormaState>;

  rg: number; //región

  //Para zfts que son multi:
  filasCamposList: Array<IZFilaCamposState>;
  numCampos: number;
  indexFilaMultiSeleccionada: number;
  numFilasVisiblesMulti: number;

  camposFijosList: Array<IZCampoState>; //Lista de campos fijos

  numPx: number;
  esRegionActiva: boolean; //si el CM_SALTAR se ubica en el zft actual = true, sino = false
}

export class ZFormaTablaState implements IZFormaTablaState {
  //zft

  constructor(id: number, numPx: number, rg: number, numCampos: number) {
    this.id = id;
    this.numPx = numPx;
    this.rg = rg;
    this.zCampoStateListIds = new Array<number>();
    this.linEstListIds = new Array<number>();
    this.btnsListIds = new Array<number>();

    this.numCampos = numCampos;
  }

  id: number;
  idZVentana: number;

  //Propiedades IZFormaTablaState
  zCampoStateListIds: Array<number>;
  linEstListIds: Array<number>;
  btnsListIds: Array<number>;
  numFilasVisiblesMulti: number;

  //GUI calculated properties
  venState: IZVentanaState;
  cmpsState: Array<IZCampoState>;
  linEstState: Array<IZComandoFormaState>;
  btnsState: Array<IZComandoFormaState>;

  rg: number; //región

  //Para zfts que son multi:
  filasCamposList: Array<IZFilaCamposState>;
  numCampos: number;
  indexFilaMultiSeleccionada: number;

  camposFijosList: Array<IZCampoState>;

  numPx: number;
  esRegionActiva: boolean; //si el CM_SALTAR se ubica en el zft actual = true, sino = false
}

export interface IZFilaCamposState {
  cmpsState: Array<IZCampoState>;
}

export class ZFilaCamposState implements IZFilaCamposState {
  constructor() {
    this.cmpsState = new Array<IZCampoState>();
  }

  cmpsState: Array<IZCampoState>;
}

export interface IZCampoState extends IdEntityBase, IZCampoBase {
  id: number;
  px: number;
  rg: number; //región
  idZft: number; //id zft en el estado
  fi: number; //fila
  value: any;
  readOnly: boolean;
  esCampoGrafico: boolean;
  haCambiado: boolean;
  checked: boolean;

  esDetallable: boolean;

  //Para valores de campos radio/chequeo: Contiene los valores de los que están en On
  posBitsOn: Array<number>;
  posBitsOff: Array<number>;

  //Para campos dentro de un campo gráfico
  parentId?: number;
  cmpsState: Array<IZCampoState>;

  //Propiedades para sincronizar valores
  bitPrenderControl: number;
  bitApagarControl: number;
  bitPrenderModo: number;
  bitApagarModo: number;

  autoFocus: boolean; //El campo tiene el foco

  esFijo: boolean; //El campo es fijo (Descripción)

  esArchivo: boolean;

  noArrivable: boolean;
}

export class ZCampoState implements IZCampoState {
  constructor(
    zcampo: IZCampo,
    id: number,
    px: number,
    rg: number,
    idZft: number,
    fila: number
  ) {
    this.id = id;
    this.px = px;
    this.rg = rg;
    this.idZft = idZft;

    this.fi = fila;
    this.haCambiado = false;

    this.nomCmp = zcampo.nomCmp;
    this.etq = zcampo.etq;
    this.claseInd = zcampo.claseInd;
    this.lon = zcampo.lon;
    this.lonv = zcampo.lonv;
    this.posbit = zcampo.posbit;

    this.control = zcampo.control;
    this.modo = zcampo.modo;
    this.readOnly =
      ContractsServices.esCampoControlLectura(zcampo.control) ||
      ContractsServices.esCampoModoLectura(zcampo.modo);

    this.esDetallable = ContractsServices.Binario.estaPrendidoBit(
      zcampo.modo,
      Constants.ModoCampoEnum.ZCMP_MDETALLABLE
    );

    this.value = "";
    this.checked = false;
    this.tipo = zcampo.tipo;

    this.esCampoGrafico = zcampo.cmps != undefined && zcampo.cmps.length > 1;

    this.autoFocus = false;

    this.esFijo = ContractsServices.Binario.estaPrendidoBit(
      zcampo.modo,
      Constants.ModoCampoEnum.ZCMP_MFIJO
    );

    if (rg == 1) {
      this.esArchivo = ContractsServices.Binario.estaPrendidoBit(
        zcampo.modo,
        Constants.ModoCampoEnum.ZCMP_MCARGARARCHIVO
      );
    } else {
      this.esArchivo = false;
    }

    this.noArrivable = ContractsServices.Binario.estaPrendidoBit(
      zcampo.modo,
      Constants.ModoCampoEnum.ZCMP_MNOARRIVABLE
    );
  }

  //Propiedades para manejo de estado
  id: number;
  px: number;
  rg: number;
  idZft: number; //id zft en el estado
  fi: number;
  value: string;
  readOnly: boolean;
  esCampoGrafico: boolean;
  haCambiado: boolean;
  parentId?: number; //Para campos dentro de un campo gráfico
  cmpsState: Array<IZCampoState>;
  tipo: number;

  //Para valores de campos radio/chequeo: Contiene los valores de los que están en On
  posBitsOn: Array<number>;
  posBitsOff: Array<number>;

  checked: boolean;
  esDetallable: boolean;

  //Propiedades IZCampo
  nomCmp: string;
  etq: string;
  claseInd: Constants.ClaseIndicadorEnum;
  lon: number;
  lonv: number;
  posbit: number;
  control: number;
  modo: number;

  //Propiedades para sincronizar valores
  bitPrenderControl: number;
  bitApagarControl: number;
  bitPrenderModo: number;
  bitApagarModo: number;

  autoFocus: boolean;
  esFijo: boolean; //El campo es fijo (Descripción)

  esArchivo: boolean;

  noArrivable: boolean;
}

export interface IZComandoFormaState extends IZComandoForma {
  id: number;
  px: number;
  rg: number;

  idZft: number;
}

export class ZComandoFormaState implements IZComandoFormaState {
  constructor(
    zComandoForma: IZComandoForma,
    id: number,
    px: number,
    rg: number,
    idZft: number
  ) {
    this.id = id;
    this.px = px;
    this.rg = rg;
    this.idZft = idZft;

    if (!zComandoForma) {
      return;
    }

    this.etq = zComandoForma.etq;
    this.tec = zComandoForma.tec;
    this.cmd = zComandoForma.cmd;
    this.desh = zComandoForma.desh;
  }

  id: number;
  px: number;
  rg: number;
  idZft: number;

  //Propiedades de IZComandoFormaState
  etq: string;
  tec: number;
  cmd: Constants.ComandoEnum;
  desh: number; //1:deshabilitado, 0:habilitado
}

export interface IZVentanaState extends IZVentanaBase {
  id: number; //px
}

export class ZVentanaState implements IZVentanaState {
  constructor(zVentana: IZVentana, id: number) {
    this.id = id;

    this.numPx = zVentana.numPx;
    this.descr = zVentana.descr;
    this.nomTbl = zVentana.nomTbl;
    this.nomRcrZoom = zVentana.nomRcrZoom;
    this.numLinsDatos = zVentana.numLinsDatos;

    this.factorDivision = zVentana.factorDivision;
  }

  id: number;

  //Propiedades IZVentanaBase
  numPx: number;
  descr: string;
  nomTbl: string;
  nomRcrZoom: string;
  numLinsDatos: number; //Si es multi > 1

  factorDivision: number;
}

//#endregion

//#region =============================================== Comandos ===============================================
/**
 * Namespace de comandos,
 * see: zcommon.Constants.ComandoEnum
 */
export namespace CM {
  export interface IZComandoDefinicion {
    icono: string;
    hotKey: string, //https://github.com/reecelucas/react-use-hotkeys
                    //https://www.npmjs.com/package/shim-keyboard-event-key
    hotKeyTitle: string,
  }

  export const hashInfoComandos = new Map<
    Constants.ComandoEnum,
    IZComandoDefinicion
  >([
    [
      Constants.ComandoEnum.CM_AYUDA,
      {
        icono: "glyphicon glyphicon-info-sign",
        hotKey: '',
        hotKeyTitle: '',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_ADICIONAR,
      {
        icono: "glyphicon glyphicon-plus",
        hotKey: 'Shift Control a',
        hotKeyTitle: 'Shift Control a',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_MODIFICAR,
      {
        icono: "glyphicon glyphicon-pencil",
        hotKey: 'Shift Control m',
        hotKeyTitle: 'Shift Control m',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_CONSULTAR,
      {
        icono: "glyphicon glyphicon-book",
        hotKey: 'Shift Control c',
        hotKeyTitle: 'Shift Control c',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_CERRAR,
      {
        icono: "glyphicon glyphicon-remove",
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_PRIMERO,
      {
        icono: "glyphicon glyphicon-fast-backward",
        //hotKey: 'shift+down',
        hotKeyTitle: 'shift ↓',
        hotKey: 'Shift+ArrowDown',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_ANTREG,
      {
        icono: "glyphicon glyphicon-step-backward",
        hotKey: 'Shift+ArrowLeft',
        hotKeyTitle: 'shift ←',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_SGTEREG,
      {
        icono: "glyphicon glyphicon-step-forward",
        hotKey: 'Shift+ArrowRight',
        hotKeyTitle: 'shift →',
    
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_ULTIMO,
      {
        icono: "glyphicon glyphicon-fast-forward",
        hotKey: 'Shift+ArrowUp',
        hotKeyTitle: 'shift ↑',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_RETOCAR,
      {
        icono: "glyphicon glyphicon-refresh",
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_VISUALIZAR,
      {
        icono: "glyphicon glyphicon-circle-arrow-down",
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_GRABAR,
      {
        icono: "glyphicon glyphicon-floppy-save",
        //hotKey: 'Shift Control g',
        //hotKeyTitle: 'Shift Control g',
        //hotKey: 'Shift Control g',
        hotKeyTitle: '',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_BUSCAR,
      {
        icono: "glyphicon glyphicon-search",
        hotKey: 'Shift Control b',
        hotKeyTitle: 'Shift Control b',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_DETALLAR,
      {
        icono: "glyphicon glyphicon-open",
        hotKey: 'Shift Control d',
        hotKeyTitle: 'Shift Control d',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_SELECCIONAR,
      {
        icono: "glyphicon glyphicon-list",
        hotKey: 'Shift Control s',
        hotKeyTitle: 'Shift Control s',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_BORRAR,
      {
        icono: "glyphicon glyphicon-trash",
        hotKey: 'Shift Control r',
        hotKeyTitle: 'Shift Control r',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_ANTPAG,
      {
        icono: "glyphicon glyphicon-step-backward",
        hotKey: 'Shift Control ArrowLeft',
        hotKeyTitle: 'Shift Control ←',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_SGTEPAG,
      {
        icono: "glyphicon glyphicon-step-forward",
        hotKey: 'Shift Control ArrowRight',
        hotKeyTitle: 'Shift Control →',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_ADICIONARLINEA,
      {
        icono: "glyphicon glyphicon-plus-sign",
        hotKey: 'Shift Control n',
        hotKeyTitle: 'Shift Control n',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_INSERTARLINEA,
      {
        icono: "glyphicon glyphicon-indent-left",
        hotKey: 'Shift Control i',
        hotKeyTitle: 'Shift Control i',
      } as IZComandoDefinicion,
    ],

    [
      Constants.ComandoEnum.CM_ELIMINARLINEA,
      {
        icono: "glyphicon glyphicon-minus-sign",
        hotKey: 'Shift Control e',
        hotKeyTitle: 'Shift Control e',
      } as IZComandoDefinicion,
    ],
  ]);

  /**
   * parámetros comunes para los eventos:
   * CM_SINCCAMPO
   * CM_PRENDERMODO
   * CM_PRENDERCONTROL
   * CM_SINCBOTON
   */
  export interface ISincBase {
    /**
     * Identificador de la ventana (px)
     */
    px: number;

    /**
     * Nombre del campo (nomCmp)
     * campo: string
     * boton: number (comando)
     */
    nc: any;

    /**
     * Fila
     */
    fi: number;

    /**
     * Region
     */
    rg: number;
  }

  export interface ILanzarAplRpta {
    psc: number;
  }

  export interface ISincBaseValor extends ISincBase {
    /**
     * Valor del campo.
     * Para los campos radio:
     *  <vc> </vc>:apagado
     *  <vc>*</vc>:prendido
     * Para los campos check:
     *  <vc> </vc>:apagado
     *  <vc>X</vc>:prendido
     *
     */
    vc: string;

    /**
     * Posición del bit, cuando es radio o chequeo.
     * Para los campos radio: el número (pb) indica el campo radio, pues todos los campos radio
     *      tienen el mismo nomCmp.
     * Para los campos check, el número (pb) indica el bit que identifica el check, que se prende o apaga.
     *
     */
    pb: number;
  }

  /**
   * Responde a zcommon.Constants.ComandoEnum.CM_SINCCAMPO - 119
   * Sincroniza el dato del campo entre lógica y presentación
   * Responder: zcmpResponder
   * Estado: por implementar
   */
  export interface ISincCampo extends ISincBase {
    /**
     * Valor del campo.
     * Para los campos radio:
     *  <vc> </vc>:apagado
     *  <vc>*</vc>:prendido
     * Para los campos check:
     *  <vc> </vc>:apagado
     *  <vc>X</vc>:prendido
     *
     */
    vc: string;

    /**
     * Posición del bit, cuando es radio o chequeo.
     * Para los campos radio: el número (pb) indica el campo radio, pues todos los campos radio
     *      tienen el mismo nomCmp.
     * Para los campos check, el número (pb) indica el bit que identifica el check, que se prende o apaga.
     *
     */
    pb: number;
  }

  /**
   * Responde a zcommon.Constants.ComandoEnum.CM_PXARRIVAR - 122
   * Pone la ventana (px) al frente
   * Estado: por implementar
   */
  export interface IPxArrivar {
    /**
     * Número de la ventana a poner al frente.
     */
    px: number;
  }

  export interface ICambiarTituloVentana {
    /**
     * Número de la ventana a cambiar título
     */
    px: number;

    /**
     * Título a poner a la ventana
     */
    vc: string;
  }
  /**
   * Responde a zcommon.Constants.ComandoEnum.CM_ADICIONAR - 44
   * Pone título a la ventana
   * Estado: implementado
   */
  export interface IAdicionar extends ICambiarTituloVentana {}

  /**
   * Responde a zcommon.Constants.ComandoEnum.CM_MODIFICAR - 45
   * Pone título a la ventana
   * Estado: implementado
   */
  export interface IModificar extends ICambiarTituloVentana {}

  /**
   * Responde a zcommon.Constants.ComandoEnum.CM_PRENDERMODO - 51
   * Estado: Por implementar
   */
  export interface IPrenderModo extends ISincBase {
    /**
     *
     */
    mc: number;
  }

  /**
   * Responde a zcommon.Constants.ComandoEnum.CM_CONSULTAR - 61
   * Pone título a la ventana
   * Estado: implementado
   */
  export interface IConsultar extends ICambiarTituloVentana {}

  /**
   * Responde a zcommon.Constants.ComandoEnum.CM_ARRIVARCMP - 77
   * Pone el foco en el campo (campo actual)
   * Estado: Por implementar
   */
  export interface IArrivarCmp {
    /**
     * Numero de la ventana
     */
    px: number;

    /**
     * Número de la región
     */
    rg: number;

    /**
     * Nombre del campo (nomCmp) a poner el foco.
     */
    nc: string;
  }

  /**
   * Responde a zcommon.Constants.ComandoEnum.CM_PRENDERCONTROL - 96
   *  Prende bit control del campo, según zcommon.Constants.ControlCampo
   * Estado: por implementar
   */
  export interface IPrenderControl extends ISincBase {
    /**
     * Modo control a poner (manejo bitwise)
     * mc es el valor decimal del bit a prender (ej: 32 corresponde a bit 6)
     */
    mc: number;
  }

  /**
   * Responde a zcommon.Constants.ComandoEnum.CM_PXDESTRUIR - 121
   */
  export interface IPxDestruir {
    /**
     *
     */
    px: number;
  }

  /**
   *  Responde a zcommon.Constants.ComandoEnum.CM_PXARRIVAR - 122
   */
  export interface IPxArrivar {
    /**
     *
     */
    px: number;
  }

  /**
   * Responde a zcommon.Constants.ComandoEnum.CM_PXVISUALIZARRPT - 123
   */
  export interface IPxVisualizarRpt {
    /**
     *
     */
    vc: string;
  }

  /**
   * Responde a zcommon.Constants.ComandoEnum.CM_SINCBOTON - 140
   */
  export interface ISincBoton extends ISincBase {
    vc: string;
  }

  /**
   *  Responde a zcommon.Constants.ComandoEnum.CM_PONERMODAL - 169
   */
  export interface IPonerModal {
    /**
     *
     */
    px: number;
  }

  /**
   *  Responde a zcommon.Constants.ComandoEnum.CM_QUITARMODAL - 170
   */
  export interface IQuitarModal {
    /**
     *
     */
    px: number;
  }

  /**
   *  Responde a zcommon.Constants.ComandoEnum.CM_IRACMP - 170
   */
  export interface iIrACmp extends ISincBase {
    /**
     *
     */
    nc: string;
  }

  export interface ILimpiarMulti extends ISincBase {
    /**
     * Valor del campo.
     * Para los campos radio:
     *  <vc> </vc>:apagado
     *  <vc>*</vc>:prendido
     * Para los campos check:
     *  <vc> </vc>:apagado
     *  <vc>X</vc>:prendido
     *
     */
    vc: string;
  }

  export interface SetTkna {
    tkna: string;
  }

  export interface SetTkns {
    tkns: string;
  }
}

export interface IZParametrosComando extends IdEntityBase {
  buffer: string;
}

//#endregion

//#region =============================================== STATE ===============================================

export interface IZAplState {
  idApl: string;
  nomApl: string;
  azenURL: string;

  //Datos parametros: [mes:año:bd:usuario:uid]
  parametrosActivacionObj: IParametrosActivacionObj;

  nivelLog: number; //0:no log, 1:log de todo, 2:sólo errores.

  //UI
  estaProcesandoRequestServidor: boolean;
  ultimoComandoEnviado: Constants.ComandoEnum;
  tipoAJAXIndicador: Constants.TipoAJAXIndicadorEnum;

  //Menu
  zMenuModule: IZMenuModule;

  //PX
  zPantexModule: IZPantexModule;
  zPantexStateModule: IZPantexStateModule;
  zLoginModule: IZLoginModule;
  zrptModule: IZrptModule;

  lanzarMenu: number;

  zColaEventosClienteState: ZColaEventosClienteState
}

export interface IParametrosActivacionObj {
  usuario: string;
  uid: string;
  anio: number;
  mes: string;
  numeroMes: number;
  bd: string;

  urlIframeCargarArchivo: string;
}

export interface IZMenuModule {
  visible: boolean;
  zmenu: IZMenu;
}

export interface IZPantexModule {
  pilaPantex: Array<IZPantex>;

  azenURL: string;

  pxAlTope: number;
  iconosBotonesList: Array<ZIconoBoton>;
}

export interface IZPantexStateModule {
  pilaPx: Array<number>;
  pxAlTope: number;

  pilaPantexState: EntityNormalizedObj<IZPantexState>;
  zFormaTablaState: EntityNormalizedObj<IZFormaTablaState>;
  zCampoState: EntityNormalizedObj<IZCampoState>;
  zComandoFormaState: EntityNormalizedObj<IZComandoFormaState>;
  zVentanaState: EntityNormalizedObj<IZVentanaState>;

  zParametrosComando: EntityNormalizedObj<IZParametrosComando>;
}

export interface IZLoginModule {
  username: string;
  password: string;
  zAplList: IZAplList;
  resultadoAction: ResultadoAction;
  tkna: string;
  tkns: string;
}

export interface IZrptModule {
  mostrarReporte: boolean;
  rutaReporte: string;
}

//#endregion

//#region =========================================== CUSTOM DOMAIN ===========================================

interface IZCamposRegion {
  rg: number;
  camposMap: EntityNormalizedObj<IZCampo>;
}

interface IZPantexNormalized {
  px: number;
  zPantex: IZPantex;
  zftMap: EntityNormalizedObj<IZCamposRegion>;
}

//#endregion

export namespace ContractsServices {
  export const esCampoModoLectura = (modo: number): boolean => {
    return Binario.estaPrendidoBit(
      modo,
      Constants.ModoCampoEnum.ZCMP_MSOLOVISUAL
    );
  };

  export const esCampoControlLectura = (control: number) => {
    return Binario.estaPrendidoBit(
      control,
      Constants.ControlCampoEnum.ZCMP_VISUAL
    );
  };

  export const getSincHashKey = (sincParams: CM.ISincBase) => {
    //Es evento de multi
    if (sincParams.fi != undefined) {
      return (
        sincParams.px +
        "|" +
        sincParams.rg +
        "|" +
        sincParams.fi +
        "|" +
        sincParams.nc
      );
    }

    return sincParams.nc;
  };

  export const getSincHashCampo = (zCampoState: IZCampoState) => {
    //Es evento de multi
    return (
      zCampoState.px +
      "|" +
      zCampoState.rg +
      "|" +
      zCampoState.fi +
      "|" +
      zCampoState.nomCmp
    );
  };

  export namespace Binario {
    export const estaPrendidoBit = (num: number, bit: number) => {
      return (num >> bit) % 2 != 0;
    };

    export const prenderBit = (num: number, bit: number) => {
      return num | (1 << bit);
    };

    export const apagarBit = (num: number, bit: number) => {
      return num & ~(1 << bit);
    };
  }
}
