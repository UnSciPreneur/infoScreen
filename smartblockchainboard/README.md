# office_atlasboard

A demonstrator for an smart home / blockchain information radiator

to install run (in directory smartblockchainboard)

$ npm install atlasboard

and start the application with

$ atlasboard start 3001

you can then view your board in the browser at http://localhost:3001

## Atlasboard Docu

https://bitbucket.org/atlassian/atlasboard

## Input via mqtt

### The art gallery widget

Listens to a websocket that receives messages from the (mqtt-)tobic "canvas/art". Example:

$ mosquitto_pub -h app.b0x.it -p 3001 -t "canvas/art" -m "dali"
$ mosquitto_pub -h app.b0x.it -p 3001 -t "canvas/art" -m "monet"
$ mosquitto_pub -h app.b0x.it -p 3001 -t "canvas/art" -m "vangogh"


## Tools

### mqtt-ws

https://github.com/dpjanes/mqtt-ws

### ponte

https://github.com/eclipse/ponte
https://eclipse.org/ponte/

## Content

### Precipitations

source: http://meteo.search.ch/prognosis

### BTC Charts

source: http://www.coincap.io/history/1day/BTC
