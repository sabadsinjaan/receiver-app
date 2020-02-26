window.onload = () => {
  cast.receiver.logger.setLevelValue(0);
  window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  console.log('Starting Receiver Manager');

  // handler for the 'ready' event
  castReceiverManager.onReady = (event) => {
    console.log(`Received Ready event: ${JSON.stringify(event.data)}`);
    window.castReceiverManager.setApplicationState('Application status is ready...');
  };

  // handler for 'senderconnected' event
  castReceiverManager.onSenderConnected = (event) => {
    console.log(`Received Sender Connected event: ${event.data}`);
    console.log(window.castReceiverManager.getSender(event.data).userAgent);
  };

  // handler for 'senderdisconnected' event
  castReceiverManager.onSenderDisconnected = (event) => {
    console.log(`Received Sender Disconnected event: ${event.data}`);
    if (window.castReceiverManager.getSenders().length === 0) {
      window.close();
    }
  };

  // handler for 'systemvolumechanged' event
  castReceiverManager.onSystemVolumeChanged = (event) => {
    console.log(`Received System Volume Changed event: ${event.data.level} ${
      event.data.muted}`);
  };

  // create a CastMessageBus to handle messages for a custom namespace
  window.messageBus =
    window.castReceiverManager.getCastMessageBus('urn:x-cast:com.sabadsinjaan.cast.gurbani', cast.receiver.CastMessageBus.MessageType.JSON);

  // handler for the CastMessageBus message event
  window.messageBus.onMessage = (event) => {
    console.log(`Message [${event.senderId}]: ${event.data}`);
    // display the message from the sender
    displayText(event.data);
    // inform all senders on the CastMessageBus of the incoming message event
    // sender message listener will be invoked
   // window.messageBus.send(event.senderId, event.data);
  };

  // initialize the CastReceiverManager with an application status message
  window.castReceiverManager.start({ statusText: 'Application is starting' });
  console.log('Receiver Manager started');
};

// utility function to display the text message in the input field
function displayText(json) {
  console.log(json);
  const gurbani = JSON.parse(json);
  const gurmukhiElement = document.getElementById('gurmukhi');
  const slide = document.querySelector('.slide');

  clearClasses();

  gurmukhiElement.innerHTML = gurbani.gurmukhi ? gurbani.gurmukhi : '';
  
  if (gurbani.isText) {
    slide.classList.add('announcement-slide');
  } else {
    slide.classList.remove('announcement-slide');
  }

  
  // Debug info
  document.querySelector('.debug-info').innerHTML = `${json}`;

  window.castReceiverManager.setApplicationState(json);
}

function clearClasses() {
  document.body.className = '';
}
