var curryLog, logStayinAlive;

curryLog = function(arg_text) {
  var log_it = function() { console.log(arg_text); };
  return log_it;
};

logStayinAlive = curryLog('stayin alive');

logStayinAlive();

delete global.logStayinAlive;
delete logStayinAlive;

logStayinAlive();

