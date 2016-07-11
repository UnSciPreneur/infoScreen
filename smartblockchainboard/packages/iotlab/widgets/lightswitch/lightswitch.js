widget = {
  
  //runs when we receive data from the job
  onData: function (el, data) {

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.title) {
      $('h2', el).text(data.title);
    }

    //$('.content', el).html(data.text);
  }
};

var connected = false;
var state = "";
connectSocket();

function WSClick() {
  if (connected) {
    disconnectClient()
  }
  else {
    connectSocket()
  }
}

function connectSocket()
{
  if ("WebSocket" in window) {
    document.getElementById("lightbulb").src="images/lightbulb_connecting.png";
    // Let us open a web socket
    var statusCh = new WebSocket("ws://app.b0x.it:2763/light/status");
    var setCh = new WebSocket("ws://app.b0x.it:2763/light/set");

    disconnectClient = function() {
      statusCh.close();
      setCh.close();
    };

    setLight = function(_state) {
      console.log("Setting state=" + _state);
      setCh.send(_state);
    };

    imageClick = function() {
      if (connected) {
        state = !state;
        setLight(state);
      } else {
        connectSocket();
      }
    };

    statusCh.onopen = function() {
      // Web Socket is connected, send data using send()
			//document.getElementById("lightbulb").src="images/lightbulb_off.png";
      connected = true;
      console.log("Websocket connected");
    };

    statusCh.onmessage = function (evt) {
      var receivedMsg = evt.data;

      console.log("Received light event " + receivedMsg);
      if (receivedMsg == "true") {
        // set image to lightbulb on
				state = true;
				document.getElementById("lightbulb").src="images/lightbulb.png";
      } else if (receivedMsg == "false") {
        // set image to lightbulb off
				state = false;
				document.getElementById("lightbulb").src="images/lightbulb_off.png";
      }
    };

    statusCh.onclose = function()
    {
      // websocket is closed.
			document.getElementById("lightbulb").src="images/lightbulb_disconnected.png";
      connected = false;
    };
  }
  else
  {
    // The browser doesn't support WebSocket
    document.getElementById("lightbulb").src="images/lightbulb_disconnected.png";
    connected = false;
  }
}