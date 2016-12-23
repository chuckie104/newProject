window.onloader=function(){

  btn.onClick=function(){
    //取到id为name输入的对象
    var innerName =document.querySelector("#name");
    //拿到输入的值
    var  nameValue = innerName.value;
    var tagName = document.querySelectorAll(".name");
    //定义一个数组
    var array =[];
    for(var i=0;i<tagName.length;i++){
      var _text = tagName[i].innerText;
      if(_text==nameValue){
        alert("相同");
      }else{
        aler("进行你的加入操作");
      }
    }
  }
  //找到对应的class

}
