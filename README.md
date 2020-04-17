# node-red addon for Instathings devices

This addon extends [node-red](https://github.com/node-red/node-red) for supporting Instathings devices.

### device-out node

This addon allows to control Instathings devices in Node-RED environment.

The `device-out` node receives input data from other nodes, connects itself to a local mqtt topic and send a custom payload to an Instathings device to change its status. 

Using a [device-in](https://github.com/Instathings/node-red-contrib-device-in) node as input, you can set the status of your devices depending on data coming from your sensors. 

Using this node you can configure a custom Node-RED flow able to control your Instathings devices!

### License
device-out is [fair-code](http://faircode.io/) licensed under [Apache 2.0 with Commons Clause](./LICENSE.md)

