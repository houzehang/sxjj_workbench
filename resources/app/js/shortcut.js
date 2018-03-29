const utils = require(__dirname+'\\js\\utils.js');
const fs = require('fs');
const exec = require('child_process').execFile;


var root_path = '';
function __verifySrcPath(waitTime,cb){
	waitTime = waitTime || 0;
	fs.exists("./root_path.info", function(exists) {  
	    if (exists) {
	    	console.log("[xuezike-debug-info] =========== found "+ "");
			root_path = fs.readFileSync('./root_path.info');
			cb && cb();
	    }else{
	    	console.log("[xuezike-debug-info] =========== not found "+ "");
			setTimeout(function(){
				window.open('./extends/electron_form.html');
			},waitTime);
	    }
	});
}
__verifySrcPath(1200);

function __getExtendProjPath(_path,idx){
	_path = _path.toString();
	return _path.substr(0,_path.length-4)+'sxjjEditer'+idx
};

////======== 一、桌面图标配置(1.名称 2.图标资源路径 3.绑定方法名称) ========
var shortcut = [
[0,"模拟器Ⅱ","images/icos/wb.png","copyReleaseToProj2"],
[1,"模拟器Ⅲ","images/icos/wb.png","copyReleaseToProj3"],
[2,"模拟器Ⅳ","images/icos/wb.png","copyReleaseToProj4"],
[3,"模拟器Ⅴ","images/icos/wb.png","copyReleaseToProj5"],
];

////======== 二、桌面图标绑定事件实现 ========

var FuncMap = {
	copyReleaseToProj2:function(){
		FuncMap.__copyReleaseToProj(2);
	},
	copyReleaseToProj3:function(){
		FuncMap.__copyReleaseToProj(3);
	},
	copyReleaseToProj4:function(){
		FuncMap.__copyReleaseToProj(4);
	},
	copyReleaseToProj5:function(){
		FuncMap.__copyReleaseToProj(5);
	},
    __copyReleaseToProj:function(idx){
    	var __runProj2 = function(){
		   exec(__getExtendProjPath(root_path,idx)+'\\FireBirdJS'+idx+'.exe', function(err, data) {  
		        console.log(err)
		        console.log(data.toString());                       
		    });  
    	};

    	var __renameProj2 = function(){
			fs.rename(__getExtendProjPath(root_path,idx)+'\\FireBirdJS.exe',__getExtendProjPath(root_path,idx)+'\\FireBirdJS'+idx+'.exe',function(err){
			    if(err)
			        console.log('error:'+err);
			    // alert('Rename Over!');
			    __runProj2();
			});
    	};

    	var __copy = function(){
	        utils.copy(root_path+`\\frameworks\\runtime-src\\proj.win32\\Release.win32`,__getExtendProjPath(root_path,idx),function(status){
		        if (!status || status == 200) {
			        $("body").mLoading('hide');
			        setTimeout(function(){  
				        // alert("Copy Success!");
				        console.log("[xuezike-debug-info] =========== Copy Success! "+ "");
				        __renameProj2();
					},50);
		        }else{
					fs.exists(root_path+`\\frameworks\\runtime-src\\proj.win32`, function(exists) {  
					    if (exists) {
					    	alert('打开VisualStudio生成Release包后重试');
					    }else{
					    	alert('项目路径设置不正确');
					    }
					});
		        }
	        });
    	};

    	var __verifyTargetPath = function(){
			fs.exists(__getExtendProjPath(root_path,idx), function(exists) {  
			    if (exists) {
			    	__copy();
			    }else{
			    	console.log("[xuezike-debug-info] =========== 没用找到目标路径，创建  "+ __getExtendProjPath(root_path,idx));
		            fs.mkdir(__getExtendProjPath(root_path,idx), function(err) {
		            	if (err) {
		            		console.log("[xuezike-debug-info] =========== err "+ err);
			            }else{
			            	console.log("[xuezike-debug-info] =========== 创建成功 "+ "");
			            	__copy();
			            }
			        })
			    }
			});
    	};


        __verifySrcPath(0,__verifyTargetPath);
    }
}
////======== 三、根路径读取 ========

