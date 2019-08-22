// NOTE: using async

var fs = require('fs')
var async = require('async')
var path = require('path')

// NOTE: The async module guarantees only one callback will be fired.
// It also propagates errors and manages parallelism for us.
module.exports = function (dir, cb) {
  async.waterfall([
    function(next) {
      fs.readdir(dir, next)
    },
    function (files, next) {
      var paths = files.map(function (file) { return path.join(dir, file)})

      // NOTE: async.map lets us run fs.stat over a set of paths in parallel
      // and calls back with an array (with order maintained) of the results.
      async.map(paths, fs.stat, function(er, stats) {
        next(er, files, stats)
      })
    },
    function (files, stats, next) {
      var largest = stats
        .filter(function (stat) { return stat.isFile() })
        .reduce(function (prev, next) {
          if (prev.size > next.size ) return prev
          return next
        })

      next(null, files[stats.indexOf(largest)])
    }
  ], cb)
}
