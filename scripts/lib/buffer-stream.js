var stream = require('stream')

module.exports = class BufferStream extends stream.Writable {
  constructor () {
    super()
    this.value = ''
  }
  _write (chunk, encoding, callback) {
    this.value += chunk.toString()
    callback()
  }
}
