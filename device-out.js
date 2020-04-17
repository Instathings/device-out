const mqtt = require('mqtt');
const fs = require('fs');

module.exports = function (RED) {
  function DeviceOutNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    node.on('input', function (msg) {
      const client = mqtt.connect('mqtt://eclipse-mosquitto');
      client.on('connect', () => {
        const splitted = config.friendly.split('|');
        const protocolId = splitted[0];
        const friendly = splitted[1];
        switch (protocolId) {
          case 'modbus': {
            protocol = 'modbus';
            break;
          }
          case 'vRy6GTde': {
            protocol = 'zigbee';
            break;
          }
        }
        const topic = `${protocol}2mqtt/${friendly}/set`;
        this.log(config.payload);
        client.publish(topic, config.payload, () => {
          client.end();
          client.removeAllListeners();
        });
      });
    });
  }
  RED.nodes.registerType("device out", DeviceOutNode);

  const configPath = process.env.IS_HOST ? '/home/pi/service/knownDevices.config' : '/home/node/node-red/service/knownDevices.config';

  RED.httpAdmin.get('/devices', (req, res) => {
    let deviceKeys = {};
    if (fs.existsSync(configPath)) {
      return fs.readFile(configPath, (err, content) => {
        if (err) {
          return res.status(500);
        }
        deviceKeys = JSON.parse(content);
        return res.json(deviceKeys);
      });
    }
    return res.json({});
  });
}
