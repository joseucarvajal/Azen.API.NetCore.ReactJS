using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace Azen.API.Sockets.Domain.Response
{
    [XmlRoot(ElementName = "root")]
    public class ZSoloLoginResponse
    {
        [XmlElement(ElementName = "usr")]
        public string User { get; set; }
        
        [XmlElement(ElementName = "tkna")]
        public string Tkna { get; set; }

        [XmlElement(ElementName = "vc")]
        public string FieldValue { get; set; }
        
        [XmlElement(ElementName = "codMsj")]
        public int MessageCode { get; set; }
        
        [XmlElement(ElementName = "msj")]
        public string Message { get; set; }
    }
}
