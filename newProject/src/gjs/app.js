function homePage()
{

  //000
}


//产品分类
function productClassfix(){
  //获取列表点击
  $(".productClassfix_btnC").click(function(){
    //如果存在，又再次点击。则无反应
    if($(".productG_content_ul1").length>1){
      return;
    }
    productClassfixAjax();
  });

  function productClassfixAjax() {
    ajax(""+url+"wangjian/api/productType/listProduct","post",{merchantId:"44"})
    .then((data)=>{
        // console.log(JSON.stringify(data));
        pushList(data);
    })
  }

  //删除列表
  $(document).delegate('.productC_del', 'click', function(event) {
    //锁定this
    _this = $(this);
    //获取id
    var id = $(this).parents("ul").attr("id");
    ajax(""+url+"wangjian/api/productType/deleteProduct","post",{id:id})
    .then((data)=>{
        // console.log(JSON.stringify(data));
        var {resultCode,resultMessage,resultData} =data;
        if(resultCode==0){
          // _this.parents("ul").remove();
            productClassfixAjax();
          alert("删除成功");
        }
    })
  });


  //打开新增列表
  $(".productClassfix_btnN").click(function(){
    $(".productClassfix_addAlert").show();

  });
  //关闭新建列表
  $("#closeProductClassfix_addAlert").click(function(){
    $(".productClassfix_addAlert").hide();
  });

  //点击新增列表确定之后调接口
  $(".productClassfix_addAlert_btn").click(function(){
    //客户输入的商品名字
    var typeName = $("#pc_addAlert_input").val();
    ajax(""+url+"wangjian/api/productType/addProduct","post",{merchantId:"44",typeName:typeName})
    .then((data)=>{
      // console.log(JSON.stringify(data));
      var {resultCode,resultMessage,resultData} =data;
      if(resultCode==0){
        alert("新增成功");
        $("#pc_addAlert_input").val("");
        $(".productClassfix_addAlert").hide();
          productClassfixAjax();
      }
    })
  });
  //置顶排序
  $(document).delegate('.productC_zhiding', 'click', function(event) {

      //需要的参数
      var id =$(this).parents("ul").attr("id");
      var nearbyid =$(".productClassfixAjax").find(".productG_content_ul1").attr("id");
      var index =$(this).parents("ul").find(".productC_content_table2").eq(0).text();
      var merchantId="44";
      var type="top";
      var json = {id,nearbyid,index,merchantId,type};
        console.log(JSON.stringify(json));
        // return;
      ajax(""+url+"wangjian/api/productType/sortProduct","post",json)
      .then((data)=>{
          var {resultCode,resultMessage,resultData} =data;
          if(resultCode==0){
            alert("更换成功");
              productClassfixAjax();
          }
      }).catch((data)=>{
        alert("接口错误");
      })
  });


  //上升排序
  $(document).delegate('.productC_up', 'click', function(event) {
      //需要的参数
      var id =$(this).parents("ul").attr("id");
      var nearbyid =$(this).parents("ul").prev().attr("id");
      // var index =$(this).parents("ul").find(".productC_content_table2").eq(0).text();
      var merchantId="44";
      var type="1";
      var json = {id,nearbyid,merchantId,type};
        console.log(JSON.stringify(json));
      ajax(""+url+"wangjian/api/productType/sortProduct","post",json)
      .then((data)=>{
          var {resultCode,resultMessage,resultData} =data;
          if(resultCode==0){
            alert("更换成功");
              productClassfixAjax();
          }
      }).catch((data)=>{
        alert("接口错误");
      })
  });


  //下降排序
  $(document).delegate('.productC_dowm', 'click', function(event) {
      //需要的参数
      var id =$(this).parents("ul").attr("id");
      var nearbyid =$(this).parents("ul").next().attr("id");
      // var index =$(this).parents("ul").find(".productC_content_table2").eq(0).text();
      var merchantId="44";
      var type="2";
      var json = {id,nearbyid,merchantId,type};

      console.log(JSON.stringify(json));


      ajax(""+url+"wangjian/api/productType/sortProduct","post",json)
      .then((data)=>{
          var {resultCode,resultMessage,resultData} =data;
          if(resultCode==0){
            alert("更换成功");
              productClassfixAjax();
          }
      }).catch((data)=>{
        alert("接口错误");
      })
  });

  //置地排序
  $(document).delegate('.productC_zhidi', 'click', function(event) {
      var _length=$(".productClassfixAjax").find(".productG_content_ul1").length;
      console.log(_length);
      //需要的参数

      var id =$(this).parents("ul").attr("id");
      var nearbyid =$(".productClassfixAjax").find(".productG_content_ul1").eq(_length-1).attr("id");
      var index =$(this).parents("ul").find(".productC_content_table2").eq(0).text();
      var merchantId="44";
      var type="bottom";
      var json = {id,nearbyid,index,merchantId,type};

      console.log(JSON.stringify(json));

      ajax(""+url+"wangjian/api/productType/sortProduct","post",json)
      .then((data)=>{
          var {resultCode,resultMessage,resultData} =data;
          if(resultCode==0){
            alert("更换成功");
              productClassfixAjax();
          }
      }).catch((data)=>{
        alert("接口错误");
      })
  });

  //添加子分类
  $(document).delegate('.productC_child_add', 'click', function(event) {
    //添加子分类
    var _addBtn = `<div class="productC_child fl">
                      <div class="fl" style="margin-left:4px">
                          <input type="text" name="name" class="productC_child_WType" >
                      </div>
                      <div class="productC_contentf_LOGO fl">

                      </div>
                      <div class="fr" style="font-size:16px;margin-right:6px;">
                          x
                      </div>
                    </div>`;
    $(this).parent(".productC_content_table4").prepend(_addBtn);
  });
  //确定添加子分类
  $(document).delegate('.productC_contentf_LOGO', 'click', function(event) {
    //客户输入的商品名字
    var typeName = $(this).parent().find(".productC_child_WType").val();
    var parentId =$(this).parents("ul").attr("id");
    // console.log(typeName);
    // console.log(parentId);
    // return;
    ajax(""+url+"wangjian/api/productType/addProduct","post",{merchantId:"44",typeName:typeName,parentId:parentId})
    .then((data)=>{
      // console.log(JSON.stringify(data));
      var {resultCode,resultMessage,resultData} =data;
      if(resultCode==0){
        alert("新增子分类成功");
         $(this).parent().find(".productC_child_WType").attr("readonly","readonly");
      }
    })
  });

  //修改分类名
  var flage=true;
  $(document).delegate('.productC_contro', 'click', function(event) {
    if(flage){
      // //获取text
      // var oldText=$(this).parent(".productC_content_table5").siblings('.productC_content_table2').eq(1).text();
      //将编辑改为保存
      $(this).find("div").eq(1).text("保存");
      //把它变为可编辑
      $(this).parent(".productC_content_table5").siblings('.productC_content_table2').eq(1).attr("contenteditable","true");
      flage=false;
    }else{
      //获取修改后的text
        var newText = $(this).parent(".productC_content_table5").siblings('.productC_content_table2').eq(1).text();
        var id =$(this).parents("ul").attr("id");
        // console.log(id);
        // console.log(newText);
        // return;
      ajax(""+url+"wangjian/api/productType/editProduct","post",{id:id,typeName:newText})
      .then((data)=>{
        // console.log(JSON.stringify(data));
        var {resultCode,resultMessage,resultData} =data;
        if(resultCode==0){
          alert("修改成功");
          $(this).find("div").eq(1).text("编辑");
          $(this).parent(".productC_content_table5").siblings('.productC_content_table2').eq(1).attr("contenteditable","false");
          flage=false;
        }
      })

    }
  });
  //ajax回调函数
  function pushList(data) {
      //定义list
      var list ="";
      $(".productClassfixAjax").empty();
      //解构取对象
      var {resultCode,resultMessage,resultData} =data;
      // console.log(typeof resultCode);
      //查询成功
      if(resultCode==0){

        for(var i in resultData){

          //参数说明
          var {id,merchantId,typeName,indexs,begin,number,wTypes} =resultData[i];
          if(wTypes!=undefined&&wTypes.length>0){
            //子分类list
            var cList ="";
            for(var a in wTypes){
              cList+=`<div class="productC_child fl">
              <div class="fl" style="margin-left:4px">
                  <input type="text" name="name" class="productC_child_WType" value=${wTypes[a].typeName} readonly="readonly">
              </div>

                <div class="productC_contentf_LOGO fl">

                </div>
                <div class="fr" style="font-size:16px;margin-right:6px;">
                    x
                </div>
                </div>`;
            }
          }else{
            var cList ="";
          }
          list+=` <ul class="clearfix productG_content_ul1" id=${id}>
                  <li class="productC_content_table1 fl">
                    <div class="productG_table_select" style="margin:10px auto;">

                    </div>
                  </li>
                  <li class="productC_content_table2 fl">${indexs}</li>
                  <li class="productC_content_table2 fl">${typeName}</li>
                  <li class="productC_content_table3 fl">
                      <section class="productC_zhiding fl">

                      </section>
                      <section class="productC_up fl">

                      </section>
                      <section  class="productC_dowm fl">

                      </section>
                      <section class="productC_zhidi fl">

                      </section>
                  </li >
                  <li class="productC_content_table4  fl">
                    ${cList}
                    <div class="productC_child_add fl">
                        <div class="fl productC_child_blue">
                            +
                        </div>
                        <div class="fl">
                            添加子分类
                        </div>
                    </div>
                  </li>
                  <li class="productC_content_table5  fl">
                    <div class="productC_contro fl">
                      <div class="productC_contro_edit fl">

                      </div>
                      <div class="fl">
                          编辑
                      </div>
                    </div>
                    <div class="productC_del fl">
                      <div class="productC_contro_delete fl ">

                      </div>
                      <div class="fl">
                          删除
                      </div>
                    </div>
                  </li>
              </ul>`;
        }

        $(".productClassfixAjax").append(list);
      }
  }
}

//产品规格
function productSpec(){
  getProductParam();
  //新建规格
  $(".productSpec_btnC").click(function(){
    $("#productSpec_edit").show();
    //常用规格的length
    var oLength=$("#productSpec_select_box li").length;
    if(!(oLength>0)){
        // ajaxAleady();
    }
  });

  //添加到新建规格的白色  productSpec_aleaSelect_box
  $("#productSpec_select_box").delegate('li', 'click', function(event) {
    //先统计规格白色里面的数量
    var _length = $(".productSpec_aleaSelect_box").find(".productSpec_aleaSelect").length;
    if(_length==2){
      alert("最多只能选择两种规格");
    }else{
      //选中的text
      var _text = $(this).text();
      var stringHtml =` <div class="productSpec_aleaSelect fl">
                          <div class="productSpec_aleaSelect_text">
                            ${_text}
                          </div>
                          <div class="closeAleaSelect">
                              x
                          </div>
                      </div> `;
      $(".productSpec_aleaSelect_box").append(stringHtml);
    }
  });

  //取消新建规格白色的孩子
  $(".productSpec_aleaSelect_box").delegate('.productSpec_aleaSelect', 'click', function(event) {
      //点击关闭 直接抹掉
      $(this).remove();
  });

  //点击确定调新建规格接口
  $(".productSpec_aleaSelect_sure").click(function(){
    //先统计规格白色里面的数量
    var _length = $(".productSpec_aleaSelect_box").find(".productSpec_aleaSelect").length;
    if(_length==0){
      alert("请选择至少一种规格");
    }else{
      //进行paramname 变量拼接
      var oTextArray=[];
      for(var i=0;i<_length;i++){
        var oText=  $(".productSpec_aleaSelect_box").find(".productSpec_aleaSelect").children('.productSpec_aleaSelect_text').eq(i).text();
          oTextArray.push(oText);
      }
      //数组转为字符串
      var paramName = oTextArray.join(",");

      //直接调保存接口 POST /api/productType/productParamAd
      ajax(""+url+"wangjian/api/productType/productParamAdd","post",{merchantId:"44",paramName:paramName})
      .then((data)=>{
        var {resultCode,resultMessage,resultData} =data;
        if(resultCode==0){
          //点击的list
          alert("添加成功");
          $("#productSpec_edit").hide();
        }
      })
    }
  });

  //关闭新建规格
  $(".closeproductSpecAlert").click(function(){
    $("#productSpec_edit").hide();
  });

  //获取常用数据
  // function ajaxAleady(){
  //   ajax(""+url+"wangjian/api/productType/productParamList","post",{})
  //   .then((data)=>{
  //     var {resultCode,resultMessage,resultData} =data;
  //     if(resultCode==0){
  //       //点击的list
  //       var btnList="";
  //       for(var i in resultData){
  //         btnList+=`<li>${resultData[i].paramName}</li>`;
  //       }
  //       $("#productSpec_select_box").append(btnList);
  //     }
  //   })
  // }

  //删除产品规格
  $(document).delegate('.productC_del', 'click', function(event) {
    var id =$(this).parents("ul").attr("id");
      ajax(""+url+"wangjian/api/productType/productParamDelete","post",{merchantId:"44",id:id})
      .then((data)=>{
          var {resultCode,resultMessage,resultData} =data;
          if(resultCode==0){
            alert("删除成功");
            getProductParam();
          }
      })
  });

  //编辑产品规格接口
  var flage=true;
  $(document).delegate('.productC_contro', 'click', function(event) {
    if(flage){
      // //获取text
      // var oldText=$(this).parent(".productC_content_table5").siblings('.productC_content_table2').eq(1).text();
      //将编辑改为保存
      $(this).find("div").eq(1).text("保存");
      //把它变为可编辑
      $(this).parent(".productC_content_table5").siblings('.productS_content_table3').attr("contenteditable","true");
      flage=false;
    }else{
      //获取修改后的text
        var newText = $(this).parent(".productC_content_table5").siblings('.productS_content_table3').text();
        var id =$(this).parents("ul").attr("id");
        // console.log(id);
        // console.log(newText);
        // return;
      ajax(""+url+"wangjian/api/productType/productParamUpdate","post",{merchantId:"44",id:id,paramName:newText})
      .then((data)=>{
        // console.log(JSON.stringify(data));
        var {resultCode,resultMessage,resultData} =data;
        if(resultCode==0){
          alert("修改成功");
          $(this).find("div").eq(1).text("编辑");
          $(this).parent(".productC_content_table5").siblings('.productC_content_table2').eq(1).attr("contenteditable","false");
          flage=false;
        }
      })

    }
  });

  //添加产品规格值
  $(document).delegate('.productC_child_add', 'click', function(event) {
    var This =$(this);
    var paramId = $(this).parents("ul").attr("id");
    var merchantId =$(this).parents("ul").attr("merchantId");
    getProductValue(merchantId,paramId,This);
    //添加子分类
    var _addBtn = `<div class="productC_child fl">
                      <div class="fl" style="margin-left:4px">
                          <input type="text" name="name" class="productC_child_WType" >
                      </div>
                      <div class="fl productC_contentf_box" style="display:none;">
                        <div class="productC_contentf_LOGO fl">

                        </div>
                        <div class="fr productS_Del_value" style="font-size:16px;margin-right:6px;">
                            x
                        </div>
                      </div>
                      <div class="productS_contentf_LOGO fr">
                      </div>
                    </div>`;
    $(this).parent(".productS_content_table4").prepend(_addBtn);
  });


  //删除规格值
  $(document).delegate('.productS_Del_value', 'click', function(event) {
      //外层母亲层
      var thisParent =$(this).parents(".productC_child ");
      var paramId  = thisParent.attr("paramId");
      var id =thisParent.attr("id");
      var merchantId =$(this).parents("ul").attr("merchantId");
      ajax(""+url+"wangjian/api/productType/productParamValueDelete","post",{merchantId:merchantId ,paramId:paramId,id:id})
      .then((data)=>{
        var {resultCode,resultMessage,resultData} =data;
        if(resultCode==0){
          alert("删除成功");
          thisParent.remove();
        }
      })
  })

  //编辑规格值
  $(document).delegate('.productC_contentf_LOGO', 'click', function(event) {
      var This =$(this);
      $(this).parent().siblings('div').find(".productC_child_WType").attr("readonly",false);
      This.parent().siblings('.productS_contentf_LOGO').show();
       This.parent().hide();
  });

  //添加规格值
  $(document).delegate('.productS_contentf_LOGO', 'click', function(event) {

      var This =$(this);
      var oText = $(this).siblings('div').find(".productC_child_WType").val();
      var paramId =$(this).parents("ul").attr("id");
      var merchantId =$(this).parents("ul").attr("merchantId");
      var id =This.parent(".productC_child").attr("id");
      if(id==undefined){
        ajax(""+url+"wangjian/api/productType/productParamValueAdd","post",{merchantId:merchantId ,paramId:paramId,paramValue:oText})
        .then((data)=>{
          var {resultCode,resultMessage,resultData} =data;
          if(resultCode==0){
            alert("添加规格值成功");

            getProductValue(merchantId,paramId,This);
            // This.hide();
            // This.siblings('div').find(".productC_child_WType").attr("readonly",true);
            // This.siblings('.productC_contentf_box').show();
          }
        })
      }else{
        ajax(""+url+"wangjian/api/productType/productParamValueUpdate","post",{merchantId:merchantId ,id:id,paramId:paramId,paramValue:oText})
        .then((data)=>{
          var {resultCode,resultMessage,resultData} =data;
          if(resultCode==0){
            alert("修改规格值成功");
            This.hide();
            This.siblings('div').find(".productC_child_WType").attr("readonly",true);
            This.siblings('.productC_contentf_box').show();
          }
        })
      }

  });

  //获取产品规格
  //POST /api/productType/productParamValueAdd
  function getProductParam(){
    $(".productParame_box").empty();
    ajax(""+url+"wangjian/api/productType/productParamListForMerchant","post",{merchantId:"44"})
    .then((data)=>{
      var {resultCode,resultMessage,resultData} =data;
      if(resultCode==0){
        //点击的list
        var list="";
        for(var i in resultData){
          var {id,paramName,merchantId}=resultData[i];
          list+=`<ul class="clearfix productG_content_ul1" id=${id} merchantId=${merchantId}>
                        <li class="productC_content_table1 fl">
                          <div class="productG_table_select" style="margin:10px auto;">

                          </div>
                        </li>
                        <li class="productC_content_table2 fl">${i}</li>
                        <li class="productS_content_table3 fl">
                            ${paramName}
                        </li >
                        <li class="productS_content_table4  fl">

                          <div class="productC_child_add fl">
                              <div class="fl productC_child_blue">
                                  +
                              </div>
                              <div class="fl">
                                  添加规格分类
                              </div>
                          </div>
                        </li>
                        <li class="productC_content_table5  fl">
                          <div class="productC_contro fl">
                            <div class="productC_contro_edit fl">

                            </div>
                            <div class="fl">
                                编辑
                            </div>
                          </div>
                          <div class="productC_del fl">
                            <div class="productC_contro_delete fl ">

                            </div>
                            <div class="fl">
                                删除
                            </div>
                          </div>
                        </li>
                  </ul> `;
        }
        $(".productParame_box").append(list);
      }
    })
  }

  //获取产品规格值
  function getProductValue(merchantId,paramId,object){
    var parents=   object.parents("ul");
    parents.find(".productC_child ").remove();

    ajax(""+url+"wangjian/api/productType/productParamValueList","post",{merchantId:merchantId,paramId:paramId})
    .then((data)=>{
      var {resultCode,resultMessage,resultData} =data;
      if(resultCode==0){
        for(var i in resultData){
          var {id,paramId,paramValue,merchantId} = resultData[i];
          var _addBtn = `<div class="productC_child fl" id=${id} paramId=${paramId}>
                            <div class="fl" style="margin-left:4px">
                                <input type="text" name="name" class="productC_child_WType" value=${paramValue} readonly="true">
                            </div>
                            <div class="fl productC_contentf_box" >
                              <div class="productC_contentf_LOGO fl">

                              </div>
                              <div class="fr productS_Del_value" style="font-size:16px;margin-right:6px;">
                                  x
                              </div>
                            </div>
                            <div class="productS_contentf_LOGO fr" style="display:none;">
                            </div>
                          </div>`;
                parents.find(".productS_content_table4").prepend(_addBtn);

        }
      }
    })
  }
}
