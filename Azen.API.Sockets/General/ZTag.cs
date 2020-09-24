using Azen.API.Sockets.Utils;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml.Serialization;

namespace Azen.API.Sockets.General
{
    public class ZTag
    {
		public const string    ZTAG_I_PX	 	= "<px>";
		public const string    ZTAG_F_PX 		= "</px>";

		public const string    ZTAG_I_NOMBRECAMPO 	= "<nc>";
		public const string    ZTAG_F_NOMBRECAMPO 	= "</nc>";

		public const string    ZTAG_I_VALORCAMPO 	= "<vc>";
		public const string    ZTAG_F_VALORCAMPO 	= "</vc>";

		public const string    ZTAG_I_MODOCAMPO	= "<mc>";		// tag para modo del campo
		public const string    ZTAG_F_MODOCAMPO	= "</mc>";		// tag para modo  del campo

		public const string    ZTAG_I_FILA		= "<fi>";
		public const string    ZTAG_F_FILA		= "</fi>";

		public const string    ZTAG_I_REGION		= "<rg>";
		public const string    ZTAG_F_REGION		= "</rg>";

		public const string    ZTAG_I_POSBIT		= "<pb>";		// tag para posicion del bit para chequeo o campo seleccionado para radio
		public const string    ZTAG_F_POSBIT		= "</pb>";		// finalizador posbit
  
		public const string    ZTAG_I_PXXML		= "<pxXml>";		// tag para almacenar la definicion del px en xml
		public const string    ZTAG_F_PXXML		= "</pxXml>";       // finalizador de definicion de px en xml

		public const string ZTAG_IPSC = "ipSC";     // tag para almacenar ip del servidor cliente
		public const string ZTAG_I_IPSC = "<ipSC>";     // tag para almacenar ip del servidor cliente
		public const string ZTAG_F_IPSC = "</ipSC>";        // finalizador de ip del servidor cliente

		public const string ZTAG_I_IPCLI = "<ipCli>";     // tag para almacenar ip del cliente
		public const string ZTAG_F_IPCLI = "</ipCli>";        // finalizador de ip del cliente

		public const string ZTAG_I_IPMID = "<ipMid>";     // tag para almacenar ip del cliente
		public const string ZTAG_F_IPMID = "</ipMid>";        // finalizador de ip del cliente

		public const string ZTAG_PSC = "pSC";       // tag para almacenar puerto del servidor cliente
		public const string ZTAG_I_PSC = "<pSC>";       // tag para almacenar puerto del servidor cliente
		public const string    ZTAG_F_PSC		= "</pSC>";		// finalizador de puerto servidor cliente
  
		public const string    ZTAG_I_IDAPLI		= "<apl>";		// tag para almacenar identificador de aplicacion
		public const string    ZTAG_F_IDAPLI		= "</apl>";		// finalizador de identificador de aplicacion

		// Cerios sep 2019: tag para identificar opcion
		public const string    ZTAG_I_OPC		= "<opc>";		// tag para almacenar identificador de opcion
		public const string    ZTAG_F_OPC		= "</opc>";		// finalizador de identificador de opcion
  
		public const string    ZTAG_I_LE		= "<le>";		// tag para lista estatica
		public const string    ZTAG_F_LE		= "</le>";		// finalizador de lista estatica

		public const string    ZTAG_I_TITULO		= "<ti>";		// tag para titulo 
		public const string    ZTAG_F_TITULO		= "</ti>";		// finalizador de titulo

		public const string    ZTAG_I_USUARIO		= "<usr>";		// usuario
		public const string    ZTAG_F_USUARIO		= "</usr>";

		public const string    ZTAG_I_IDRCR		= "<rcr>";		// tag para almacenar identificador de recurso
		public const string    ZTAG_F_IDRCR		= "</rcr>";		// finalizador de identificador de recurso
  
		public const string    ZTAG_I_CLIENTE		= "<cli>";		// tag para tipo de cliente (web, movil, grafico)
		public const string    ZTAG_F_CLIENTE		= "</cli>";		// finalizador de tag
  

		// TAGS de Evento
		public const string    ZTAG_I_EVT		= "<evt>";		// tag para tipo de evento
		public const string    ZTAG_F_EVT		= "</evt>";		// finalizador tipoevt
  
		public const string    ZTAG_I_TIPOEVT		= "<tp>";		// tag para tipo de evento
		public const string    ZTAG_F_TIPOEVT		= "</tp>";		// finalizador tipoevt

		public const string    ZTAG_I_TECEVT		= "<tc>";		// tag para tecla de evento
		public const string    ZTAG_F_TECEVT		= "</tc>";		// finalizador tecevt
  
		public const string    ZTAG_I_CMDEVT		= "<cm>";		// tag para cmd de evento
		public const string    ZTAG_F_CMDEVT		= "</cm>";		// finalizador cmdevt
  
		public const string    ZTAG_I_INFOEVT		= "<if>";		// tag para info evento
		public const string    ZTAG_F_INFOEVT		= "</if>";		// finalizador infevt
  
		public const string    ZTAG_I_BUFFEREVT	= "<bf>";		// tag para buffer evento
		public const string    ZTAG_F_BUFFEREVT	= "</bf>";		// finalizador bufferevt
  
		// TAGS de BD
		public const string    ZTAG_I_BD		= "<bd>";		// tag para nombre de la bd
		public const string    ZTAG_F_BD		= "</bd>";		// finalizador de nombre de bd

		public const string    ZTAG_I_SQL		= "<sql>";		// tag para sentencia sql
		public const string    ZTAG_F_SQL		= "</sql>";     // finalizador sentencia sql

		// TAGS para manejo web
		public const string ZTAG_NUMEVT = "nEvt";       // Inicio de numero de eventos que contiene un buffer
		public const string ZTAG_I_NUMEVT = "<nEvt>";       // Inicio de numero de eventos que contiene un buffer
		public const string    ZTAG_F_NUMEVT		= "</nEvt>";		// Fin de numero de eventos

		public const string    ZTAG_I_NUMFRAME		= "<nFrame>";		// Inicio de numero de frames
		public const string    ZTAG_F_NUMFRAME		= "</nFrame>";		// Fin de numero de frames

		public const string    ZTAG_I_HTMLS		= "<htmls>";		// Inicio que contiene html de pagina principal y html de frames
		public const string    ZTAG_F_HTMLS		= "</htmls>";		// Fin HTMLS

		public const string    ZTAG_I_MODOVENTANA	= "<modoVen>";		// Inicio de modo de la ventana
		public const string    ZTAG_F_MODOVENTANA	= "</modoVen>";		// Fin de modo de ventana

		public const string    ZTAG_I_HTMLPPAL		= "<htmlPpal>";		// Inicio de codigo html de pagina principal
		public const string    ZTAG_F_HTMLPPAL		= "</htmlPpal>";	// Fin de codigo html de pagina principal

		public const string    ZTAG_I_HTMLFRAME	= "<htmlFrame>";	// Inicio de codigo html de frame
		public const string    ZTAG_F_HTMLFRAME	= "</htmlFrame>";	// Fin de codigo html de frame

		public const string    ZTAG_I_ANCHO		= "<ancho>";		// Inicio ancho de ventana
		public const string    ZTAG_F_ANCHO		= "</ancho>";		// Fin ancho de ventana

		public const string    ZTAG_I_ALTO		= "<alto>";		// Inicio alto de ventana
		public const string    ZTAG_F_ALTO		= "</alto>";		// Fin alto de ventana

		// Cerios mnzo 2020
		public const string    ZTAG_I_CRED		= "<crd>";		// credencial de usuario
		public const string    ZTAG_F_CRED		= "</crd>";

		// Cerios abr 2020
		public const string ZTAG_TKNA = "tkna";     // token autorizacion
		public const string ZTAG_I_TKNA = "<tkna>";     // token autorizacion
		public const string ZTAG_F_TKNA = "</tkna>";     // token autorizacion

		public const string ZTAG_TKNS = "tkns";     // token usuario
		public const string ZTAG_I_TKNS = "<tkns>";     // token usuario
		public const string    ZTAG_F_TKNS		= "</tkns>";
  
		// Cerios may 2020
		public const string    ZTAG_I_ARCHIVO		= "<arch>";		// archivo
		public const string    ZTAG_F_ARCHIVO		= "</arch>";
  
		public const string    ZTAG_I_PARAMETROS		= "<param>";		// parametros
		public const string    ZTAG_F_PARAMETROS		= "</param>";  

		public const string    ZTAG_I_CODMENSAJE		= "<codMsj>";		// codidos de mensajes
		public const string    ZTAG_F_CODMENSAJE		= "</codMsj>";  
  
		public const string    ZTAG_I_MENSAJE		= "<msj>";		// mensajes de error especialmente
		public const string    ZTAG_F_MENSAJE		= "</msj>";  
  
  
		// cerios jun  4 2020:
		public const string    ZTAG_I_DATOS		= "<dts>";		// mensaje
		public const string    ZTAG_F_DATOS		= "</dts>";

		// cerios jun  18 2020:
		public const string    ZTAG_I_LOG		= "<log>";		// activa log
		public const string    ZTAG_F_LOG		= "</log>";

		// cerios jun  18 2020:
		public const string    ZTAG_I_FMT		= "<fmt>";		// activa log
		public const string    ZTAG_F_FMT		= "</fmt>";

		public const string    ZTAG_I_OPER		= "<oper>";		// activa log
		public const string    ZTAG_F_OPER		= "</oper>";

		public const string    ZTAG_I_CAMPO	= "<campo>";		// 
		public const string    ZTAG_F_CAMPO	= "</campo>";

		LogHandler _logHandler;

		public ZTag(LogHandler logHandler)
		{
			_logHandler = logHandler;
		}

		public string ObtValorTag(string tagI, string tagF, string buffer)
		{

			string dato;

			string bufferSinBlancos;
			string tagI1;

			int indexI = buffer.IndexOf(tagI);
			int indexF = buffer.IndexOf(tagF);

			if (-1 != indexI && -1 != indexF)
			{

				return (buffer.Substring(indexI + tagI.Length, indexF - (indexI + tagI.Length)).ToString());
			}

			// En caso de tag json :

			// Elimina espacios en blanco
			bufferSinBlancos = buffer.Trim();

			// Reemplaza < > por " y adiciona :
			tagI1 = ((tagI.Replace("<", "\"")).Replace(">", "\"")) + ":";
			//tagI2 = tagI1.replace("<","\"");
			//tagI1 = tagI2.concat(":");

			if (-1 == (indexI = bufferSinBlancos.IndexOf(tagI1)))
				return null;

			dato = bufferSinBlancos.Substring(indexI + tagI1.Length);
			if ('"' == dato[0]) // Es cadena
			{
				return Regex.Split(dato.Substring(1), "[^\"]")[0];
			}
			else // Es numero
			{
				return Regex.Split(dato, "[0-9]")[0];
			}
		}

		public T DeserializeXMLToObject<T>(string xmlData)
		{
			xmlData = "<root>" + xmlData + "</root>";

			T returnObject = default(T);
			if (string.IsNullOrEmpty(xmlData)) return default(T);

			try
			{
				XmlSerializer xmlSerializer = new XmlSerializer(typeof(T));

				using (TextReader reader = new StringReader(xmlData))
				{
					XmlSerializer serializer = new XmlSerializer(typeof(T));
					returnObject = (T)serializer.Deserialize(reader);
				}
			}
			catch (Exception ex)
			{
				_logHandler.Error(ex.ToString());
			}

			return returnObject;
		}

		public string JsonToXml(string data)
		{
			string xmlResult = string.Empty;

			try
			{
				JObject json = JObject.Parse(data);
				foreach (var x in json)
				{
					string name = x.Key;
					JToken value = x.Value;
					xmlResult += $"<campo><nc>{x.Key}</nc><vc>{x.Value}</vc></campo>";
				}

			}
			catch (Exception e)
			{
				return null;
			}


			return "<dts>" + xmlResult + "</dts>";
		}

		public string DictionaryToXml(Dictionary<string, string> dictionary)
		{
			string xmlResult = string.Empty;

			foreach (var item in dictionary)
			{
				xmlResult += $"<campo><nc>{item.Key}</nc><vc>{item.Value}</vc></campo>";
			}

			return "<dts>" + xmlResult + "</dts>";
		}
	}
}
