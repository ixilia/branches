var Server = require('bittorrent-tracker').Server

var server = new Server({
    udp: true,
    http: true,
    ws: true,
    stats: true,
    filter: function (infoHash, params, cb) {
        // Blacklist/whitelist function for allowing/disallowing torrents. If this option is
        // omitted, all torrents are allowed. It is possible to interface with a database or
        // external system before deciding to allow/deny, because this function is async.

        // It is possible to block by peer id (whitelisting torrent clients) or by secret
        // key (private trackers). Full access to the original HTTP/UDP request parameters
        // are available in `params`.

        cb(null)
    }
})


server.http
server.udp
server.ws

server.on('error', function (err) {
    console.log(err.message)
})

server.on('warning', function (err) {
    console.log(err.message)
})

server.on('listening', function () {
    console.log('listening on http port:' + server.http.address().port)
    console.log('listening on udp port:' + server.udp.address().port)
    console.log('listening on ws port:' + server.ws.address().port)
})

server.listen(8080, '', '')

// listen for individual tracker messages from peers:

server.on('start', function (addr) {
    console.log('got start message from ' + addr)
})

server.on('complete', function (addr) {})
server.on('update', function (addr) {})
server.on('stop', function (addr) {})
