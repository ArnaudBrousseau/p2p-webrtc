## WebRTWhat?
[WebRTC][webrtc] enables web browsers with Real-Time
Communications capabilities.
WebRTC needs servers/infrastructure to work (see [this HTML5Rocks article][webrtc-infra]):
- STUN (Session Traversal Utilities for NAT) server to get around NAT (Network address translation)
- TURN (Traversal Using Relays around NAT) servers when STUN servers fail
- A signaling server to establish connection. This is not part of WebRTC.
  Every WebRTC app developer has to figure this out or use a third party
  service. [JSEP][jsep] (JavaScript Session Establishment Protocol) is an IETF standard
  describing "the mechanisms for allowing a JavaScript application to fully
  control the signaling plane of a multimedia session"

## Goal: Hassle-Free Peer-to-Peer WebRTC
This project aims at providing a simple JS library to enable peer-to-peer
WebRTC, without any initial setup required. We will use:
- Google Chrome's list of public STUN server
- Freenode IRC channels for signaling

[webrtc]: http://www.webrtc.org/
[webrtc-infra]: http://www.html5rocks.com/en/tutorials/webrtc/infrastructure/
[jsep]: http://tools.ietf.org/html/draft-uberti-rtcweb-jsep

## Running tests
From the command line: `grunt test`

## Building
From the command line: `grunt`
