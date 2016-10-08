if (window.RTCEvents) throw new Error(
  'Cannot capture RTC events, property already exists'
);

window.RTCEvents = [];

export const RTC_PEER_CONNECTION_EVENTS = [
  'addstream',
  'connectionstatechange',
  'datachannel',
  'icecandidate',
  'iceconnectionstatechange',
  'icegatheringstatechange',
  'identityresult',
  'idpassertionerror',
  'idpvalidationerror',
  'negotiationneeded',
  'peeridentity',
  'removestream',
  'signalingstatechange',
  'track',
]

export function coldBrewRTC(servers, options, listeners = RTC_PEER_CONNECTION_EVENTS) {
  const valid = listeners.every(listener =>
    RTC_PEER_CONNECTION_EVENTS.includes(listener)
  );

  if (!valid) throw new Error(
    'Invalid event names passed in to coldBrewRTC'
  );

  const peerConnection = new RTCPeerConnection(servers, options);

  listeners.forEach((listener) => {
    peerConnection.addEventListener(listener, function(event) {
      window.RTCevents.push(event);
    });
  });

  return peerConnection;
}