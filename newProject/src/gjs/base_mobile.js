$(function(){
    var deviceWidth = document.documentElement.clientWidth > 767 ? 500: document.documentElement.clientWidth;
   document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
   window.onresize = function(){
   var deviceWidth = document.documentElement.clientWidth > 767 ? 500 : document.documentElement.clientWidth;
   document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
   };
})
