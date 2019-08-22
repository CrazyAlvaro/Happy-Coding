var fs = require('fs')
var path = require('path')
var Q = require('q')
var fsReaddir = Q.denodeify(fs.readdir) // [1]
var fsStat = Q.denodeify(fs.stat)

module.exports = function (dir) {
  return fsReaddir(dir)
    .then(function (files) {
      var promises = files.map(function (file) {
        return fsStat(path.join(dir,file))
      })
      return Q.all(promises).then(function (stats) { // [2]
        return [files, stats] // [3]
      })
    })
    .then(function (data) { // [4]
      var files = data[0]
      var stats = data[1]
      var largest = stats
        .filter(function (stat) { return stat.isFile() })
        .reduce(function (prev, next) {
        if (prev.size > next.size) return prev
          return next
        })
      return files[stats.indexOf(largest)]
    })
}
