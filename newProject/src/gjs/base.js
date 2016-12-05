
var url ="http://120.25.102.247:8180/";


function ajax (url,type,json){
  var promise =new Promise(function(resolve,reject){
    $.ajax({
      url: url,
      type: type,
      dataType:"json",
      data:json,
      success:function(data){
        resolve(data);
      },
      error:function(data){
          reject(data);
      }
    })

  })

  return promise;
}
