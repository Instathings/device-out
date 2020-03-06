const mqtt = require('mqtt');

module.exports = function (RED) {
  function DeviceOutNode(config) {
    RED.nodes.createNode(this, config);
    const { friendly } = config;

    var node = this;
    node.on('input', function (msg) {
      const client = mqtt.connect('mqtt://localhost');
      client.on('connect', () => {
        const topic = `zigbee2mqtt/${friendly}/set`;
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
