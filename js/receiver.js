const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

playerManager.setMessageInterceptor(
  cast.framework.messages.MessageType.LOAD,
  request => {
    castDebugLogger.info('MyAPP.LOG', 'Intercepting LOAD request');
  //  castDebugLogger.info(request);
	
	//document.getElementById("gText").value = request.message;
	
   // castDebugLogger.info(request.media.entity);
   // if (request.media && request.media.entity) {
    //  request.media.contentId = request.media.entity;
  //  }

  });

/** Debug Logger **/
const castDebugLogger = cast.debug.CastDebugLogger.getInstance();

// Enable debug logger and show a warning on receiver
// NOTE: make sure it is disabled on production
castDebugLogger.setEnabled(true);

playerManager.addEventListener(
  cast.framework.events.category.CORE,
  event => {
      castDebugLogger.info('ANALYTICS', 'CORE EVENT:', event);
});

// Set verbosity level for custom tags
castDebugLogger.loggerLevelByTags = {
  'MyAPP.LOG': cast.framework.LoggerLevel.WARNING,
  'ANALYTICS': cast.framework.LoggerLevel.INFO,
};

