const fs = require('fs');
const path = require('path')

var copyFile = function(srcPath, tarPath, cb) {
  var rs = fs.createReadStream(srcPath)
  rs.on('error', function(err) {
    if (err) {
      console.log('read error', srcPath)
    }
    cb && cb(err)
  })

  var ws = fs.createWriteStream(tarPath)
  ws.on('error', function(err) {
    if (err) {
      console.log('write error', tarPath)
    }
    cb && cb(err)
  })
  ws.on('close', function(ex) {
    cb && cb(ex)
  })

  rs.pipe(ws)
}
var copyFolder = function(srcDir, tarDir, cb) {
	console.log("[xuezike-debug-info] =========== srcDir "+ srcDir);
  fs.readdir(srcDir, function(err, files) {
    var count = 0
    var checkEnd = function() {
      ++count == files.length && cb && cb()
    }

    if (err) {
      // checkEnd()
      cb && cb(500)
      return
    }
	$("body").mLoading('show');
    files.forEach(function(file) {
      var srcPath = path.join(srcDir, file)
      var tarPath = path.join(tarDir, file)

      fs.stat(srcPath, function(err, stats) {
        if (stats.isDirectory()) {
          console.log('mkdir', tarPath)
          fs.mkdir(tarPath, function(err) {
            if (err) {
              console.log(err)
              // return
            }

            copyFolder(srcPath, tarPath, checkEnd)
          })
        } else {
          copyFile(srcPath, tarPath, checkEnd)
        }
      })
    })

    //为空时直接回调
    files.length === 0 && cb && cb()
  })
};
module.exports = {	
	copy:function(src,target,cb){
		copyFolder(src,target,cb);
	}

}



var str = "d:\\sxjj"

console.log("[xuezike-debug-info] ===========  "+ str.substr(0,str.length-4));