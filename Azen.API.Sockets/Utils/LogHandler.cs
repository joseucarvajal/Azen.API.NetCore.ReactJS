using log4net;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using System.Xml;

namespace Azen.API.Sockets.Utils
{
    public class LogHandler
    {
        private readonly string LOG_CONFIG_FILE = @"log4net.config";

        private static readonly log4net.ILog _log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public LogHandler()
        {
            SetLog4NetConfiguration();
        }

        public ILog GetLogger(Type type)
        {
            return LogManager.GetLogger(type);
        }

        public void Debug(object message)
        {
            _log.Debug(message);
        }

        public void Info(object message)
        {
            _log.Info(message);
        }

        public void Error(object message)
        {
            _log.Error(message);
        }

        public void Warn(object message)
        {
            _log.Warn(message);
        }

        private void SetLog4NetConfiguration()
        {
            XmlDocument log4netConfig = new XmlDocument();
            log4netConfig.Load(File.OpenRead(LOG_CONFIG_FILE));

            var repo = LogManager.CreateRepository(
                Assembly.GetEntryAssembly(), typeof(log4net.Repository.Hierarchy.Hierarchy));

            log4net.Config.XmlConfigurator.Configure(repo, log4netConfig["log4net"]);
        }
    }
}

