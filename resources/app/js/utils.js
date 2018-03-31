const fs = require('fs');
const path = require('path')
/**
 * 拷贝文件
 * @param  {[type]}   srcPath [description]
 * @param  {[type]}   tarPath [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
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

/**
 * 拷贝文件夹
 * @param  {[type]}   srcDir [description]
 * @param  {[type]}   tarDir [description]
 * @param  {Function} cb     [description]
 * @return {[type]}          [description]
 */
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

/**
 * 替换某文件的某一行内容
 */
var _replaceOneLine = function(filePath,oldLine_unique,newLine,callback){
  var fs = require('fs');
  fs.readFile(filePath,"utf8",function(err,data){
    if (err) {
      callback && callback(err);
    }else{
      var arr = data.split('\n');
      for(var i = 0,len = arr.length; i < len; i++){
        if (new RegExp(oldLine_unique).test(arr[i]) ) {
          arr[i] = newLine;
        }
      }
      fs.writeFile(filePath,arr.join('\n'),function(_err){
        if (_err) {
          callback && callback(err);
        }else{
          callback();
        }
      });
    }
  });
};


module.exports = {	
	copy:function(src,target,cb){
		copyFolder(src,target,cb);
	},
  replaceOneLine:function(filePath,oldLine_unique,newLine,callback){
    _replaceOneLine(filePath,oldLine_unique,newLine,callback);
  }
}