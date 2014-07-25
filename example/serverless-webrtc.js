/****************
 * Util functions
 ****************/
var RTCMultiSession = function(options) {
  return {
    send: function (message) {
      data = JSON.stringify(message);
      activedc.send(data);
    }
  }
};

var onconnection = function() {
    console.log('GREAT SUCCESS. PeerConnection connected.');
};

var onsignalingstatechange = function(state) {
    console.info('Signaling state change', state);
}

var oniceconnectionstatechange = function (state) {
    console.info('ICE connection state change', state);
};

var onicegatheringstatechange = function(state) {
    console.info('ICE gathering state change', state);
};

var cfg = {'iceServers':[{'url':'stun:23.21.150.121'}]};
// TODO: figure what that's for
var con = {'optional': [{'DtlsSrtpKeyAgreement': true}]};


/*********************
 * Part handling Alice
 *********************/

// Alice creates a local offer (createChannel).
// She has to provide Bob with an offer description. Once Bob joins the channel
// Alice has to acknowledge Bob via ackPeerConnection. After that Alice and Bob
// and connected peer-to-peer.

var pc1 = new RTCPeerConnection(cfg, con); // Native browser API
var dc1 = null; // DataChannel for Alice

// Since the same JS file contains code for both sides of the connection,
// activedc tracks which of the two possible datachannel variables we're using.
var activedc;

/**
 * This creates a local offer.
 * The offer description will be logged to the console. It can then be used in
 * a different browser to join the channel.
 */
var createChannel = function() {
    setupDC1();
    pc1.createOffer(function (sessionDescription) {
        pc1.setLocalDescription(sessionDescription);
        console.log("Local offer created:", sessionDescription);
    }, function () {console.warn("Couldn't create offer");});
};

var ackPeerConnection = function(ackPayload) {
    var answerDesc = new RTCSessionDescription(ackPayload);
    console.log("Received remote answer: ", answerDesc);
    pc1.setRemoteDescription(answerDesc);
};

var sendMessage = function(message) {
    if (!message) { return; }
    var channel = new RTCMultiSession();
    channel.send({ message: message });
}

var setupDC1 = function() {
    try {
        dc1 = pc1.createDataChannel('test', {
            reliable:true // TCP
        });
        activedc = dc1;
        console.log("Created datachannel (pc1)");

        dc1.onopen = function(e) { console.log('dataChannel opened', e); };
        dc1.onmessage = function(e) { console.log("New message!" , e.data); };
    } catch (e) { console.warn("No data channel (pc1)", e); }
}

/**
 * PeerConnection event handlers
 */
pc1.onicecandidate = function (e) {
    console.log("ICE candidate (pc1)", e);
    if (!e.candidate) { console.log(JSON.stringify(pc1.localDescription)); }
};
pc1.onconnection = onconnection;
pc1.onsignalingstatechange = onsignalingstatechange;
pc1.oniceconnectionstatechange = oniceconnectionstatechange;
pc1.onicegatheringstatechange = onicegatheringstatechange;


/*******************
 * Part handling Bob
 *******************/

// Bob receives an offer description via copy/paste, IM, email, etc...
// ...and joins a channel created by Alice this way.

var pc2 = new RTCPeerConnection(cfg, con);
var dc2 = null;

var joinChannel = function(offerDescription) {
    var offerDesc = new RTCSessionDescription(offerDescription);
    console.info("Joining with an offer",offerDesc);
    connectToOffer(offerDesc);
};

pc2.ondatachannel = function (e) {
    var datachannel = e.channel || e; // Chrome sends event, FF sends raw channel
    console.log("Received datachannel (pc2)", arguments);
    dc2 = datachannel;
    activedc = dc2;
    dc2.onopen = function (e) { console.log('data channel connect'); }
    dc2.onmessage = function (e) {
        console.log("Got message (pc2)", e.data);
    };
};

/**
 * This connects to a channel via an offer description provided by Alice.
 * Once that's done an answer is going to be logged. Alice has to know about
 * that answer to finalize the peer connection (see ackPeerConnection)
 */
var connectToOffer = function(offerDesc) {
    pc2.setRemoteDescription(offerDesc, function() {
        pc2.createAnswer(function (answerDesc) {
            console.log("Created local answer: ", answerDesc);
            pc2.setLocalDescription(answerDesc);
        }, function () { console.error("Cannot create answer", arguments); });
    }, function() { console.error("Cannot set remote desc", arguments); })
}

/**
 * PeerConnection event handlers for Bob.
 */
pc2.onicecandidate = function (e) {
    console.log("ICE candidate (pc2)", e);
    if (!e.candidate) { console.log(JSON.stringify(pc2.localDescription)); }
};
pc2.onconnection = onconnection;
pc2.onsignalingstatechange = onsignalingstatechange;
pc2.oniceconnectionstatechange = oniceconnectionstatechange;
pc2.onicegatheringstatechange = onicegatheringstatechange;
