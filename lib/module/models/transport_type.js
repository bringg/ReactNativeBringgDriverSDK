export let TransportType;

(function (TransportType) {
  TransportType[TransportType["Unknown"] = 0] = "Unknown";
  TransportType[TransportType["Stationary"] = 1] = "Stationary";
  TransportType[TransportType["Walking"] = 2] = "Walking";
  TransportType[TransportType["Running"] = 3] = "Running";
  TransportType[TransportType["Bicycle"] = 4] = "Bicycle";
  TransportType[TransportType["Driving"] = 5] = "Driving";
  TransportType[TransportType["PublicTransportation"] = 6] = "PublicTransportation";
})(TransportType || (TransportType = {}));
//# sourceMappingURL=transport_type.js.map