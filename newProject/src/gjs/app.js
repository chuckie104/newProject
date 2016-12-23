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

  //获取产品规格值yzwjn 1236 http://www.fmdisk.com/file-799571.html
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

//产品添加页
function productList(){
  //获取分类列表
  $(".product_type_hasSelect").click(function(){
    $(".product_type_box").toggle();
    var __length =$(".product_type_box").find("div").length;
    if(__length==0){
      ajax(""+url+"wangjian/api/productType/listProduct","post",{merchantId:"44"})
      .then((data)=>{
        var {resultCode,resultMessage,resultData} =data;
        if(resultCode==0){
          //下来的div集合声明
          var divList="";
          for(var i in resultData){
            var json = resultData[i];
            var {id,typeName} =json;
            divList+=`<div class="product_type_box_list" data=${id}>
            ${typeName}
            </div> `;
          }
          $(".product_type_box").append(divList);
        }
      })
    }
    return false;
  });
  //点击选取分类的值
  $(".product_type_box").delegate('.product_type_box_list', 'click', function(event) {
    //获取点击的值
        var oText = $(this).text();
        var oData = $(this).attr("data");
        $(".product_type_hasSelect").text(oText);
        $(".product_type_hasSelect").attr("data",oData);
        $(".product_type_box").hide();
  });

  //获取产品规格数据
  ajax(""+url+"wangjian/api/productType/productParamValuesCollection","post",{merchantId:"44"})
  .then((data)=>{
    var {resultCode,resultMessage,resultData} =data;
    if(resultCode==0){
      var productParameList="";
      //规格数组
      for(var i in resultData){
        var paramValueList="";
        //名字
        var paramName = resultData[i].paramName;
        var paramValue = resultData[i].paramValue;
        //规格子规格数组
        for(var a in paramValue){
          var {id,paramValue:newParamValue,paramId} = paramValue[a];
          paramValueList+=`<li data=${id} paramId=${paramId}>
                              <div class="productG_table1_select fl"></div>
                              <div class="fl">${newParamValue}</div>
                            <li>`;
        }
        productParameList+=`  <div class="productList_specBox">
            <div class="productList_color clearfix">
              <div class="productList_left_text fl">
                ${paramName}
              </div>
              <div class="productList_color_box fl">
                <ul class="clearfix">
                  ${paramValueList}
                </ul>
              </div>
            </div>
            <div class="productG_content_table_info" style="margin-left:96px;">
              (提示：以上是系统初始化的规格样本，可以在左侧菜单中的“产品规格”处删除新增适合您产品的规格)
            </div>
          </div>`;
        var tableBox = `<li class="productL_content_table1 fl" paramId=${paramId}>${paramName}</li>`;
        $(tableBox).insertBefore('#productL_content_table2');
      }
      $(productParameList).insertBefore('.productL_content_table');
    }
  })

  //保存按钮
  $(".productG_content_saveBtn").click(function(){

    //商家id
    var merchantId="44";

    //产品名称
    var productName =$("#productNameIn").val();

    if($.trim(productName)==""||$.trim(productName)===null){
      alert("产品名称不能为空");
      return;
    }

    var productNumIn=$("#productNumIn").val();

    if($.trim(productNumIn)==""||$.trim(productNumIn)===null){
      alert("产品编号不能为空");
      return;
    }

    //产品分类id
    var typeId=$(".product_type_hasSelect").attr("data");

    if(typeId==undefined){
      alert("请选择产品分类");
      return;
    }



    //产品编号
    var productNo=$("#productNumIn").val();

    if($.trim(productNo)==""||$.trim(productNo)===null){
      alert("产品编号不能为空");
      return;
    }

    //单位重量
    var unit=$("#productKgIn").val();

    if($.trim(unit)==""||$.trim(unit)===null){
      alert("单位重量不能为空");
      return;
    }
    //声明产品json
    var goodInfos=[];



    var liLength=$(".productList_box").find("ul").length;

      if(liLength==0){
        alert("请先生成产品");
      }else{

      for(var i =0;i<liLength;i++){
        var goodInfo={};
        //父亲id
        var paramId1 =$("#productList_id").find(".productL_content_table1").eq(1).attr("paramId");

        //儿子id
        var paramValueId1 =$(".productList_box").find(".productG_content_ul1").eq(i).find(".productL_content_table1").eq(1).attr("paramValueId1");
        //商品状态
        var state="1";
        //商品库存
        var productStock=$(".productList_box").find(".productG_content_ul1").eq(i).find(".productL_content_table2").eq(0).text();
        //最低售价
        var price=$(".productList_box").find(".productG_content_ul1").eq(i).find(".productL_content_table2").eq(1).text();
        //成本价
        var costPrice=$(".productList_box").find(".productG_content_ul1").eq(i).find(".productL_content_table2").eq(2).text();;
        //销售价
        var sellPrice=11;

        //
        var paramId2 =$("#productList_id").find(".productL_content_table1").eq(2).attr("paramId");
        var paramValueId2 = $(".productList_box").find(".productG_content_ul1").eq(i).find(".productL_content_table1").eq(2).attr("paramValueId2");;
        var goodPictureId=$(".productList_box").find(".productG_content_ul1").eq(i).find(".productL_content_upload_btn").attr("productPictureId");
        goodInfo.productId ="";
        goodInfo.sellPrice=sellPrice;
        goodInfo.paramId1=paramId1;
        goodInfo.paramValueId1=paramValueId1;
        goodInfo.paramId2=paramId2;
        goodInfo.paramValueId2=paramValueId2;
        goodInfo.statue=state;
        // productStock=parseInt(productStock);
        goodInfo.productStock=productStock;
        // price=parseInt(price);
        goodInfo.price=price;
        // costPrice=parseInt(costPrice);
        goodInfo.costPrice=costPrice;
        goodInfo.goodPictureId=goodPictureId;
        goodInfos.push(goodInfo);
      }

    }



    //产品图片id
    var productPictureId=$("#productL_img_upload").attr("productPictureId");
    if(productPictureId==undefined){
      alert("请上传产品图片");
      return;
    }
    //海报图片id
    var billId=$("#productL_banner_upload").attr("billId");
    if(billId==undefined){
      alert("请上传海报");
      return;
    }

    var json={};
    json.merchantId=merchantId;
    json.productName=productName;
    json.typeId=typeId;
    json.unit=unit;
    json.goodInfo=JSON.stringify(goodInfos);
    json.productPictureId=productPictureId;
    json.billId=billId;
    json.productNo=productNumIn;

    console.log(JSON.stringify(json));

    ajax(""+url+"wangjian/api/productType/productAdd","post",json)
    .then((data)=>{
      var {resultCode,resultMessage,resultData} =data;
      if(resultCode==0){
        alert("生成产品成功");
      }else{
        alert("失败");
      }
    }).catch((data)=>{
      alert(data.responseText);
    })
  });


    //选中的规格
    $(document).delegate('.productG_table1_select', 'click', function(event) {
        $(this).addClass('productG_table1_selectActive');
        //父亲的index
        var oIndex= $(this).parents(".productList_specBox").index();

        //拿到自己的text
        var thisText=$(this).siblings('div').text();
        //拿到自己的id
        var id = $(this).parent("li").attr("data");
        //拿到自己父亲的id
        var paramId =$(this).parent("li").attr("paramId");
        //兄弟div的长度
        var broLength = $(this).parents('.productList_specBox').siblings('.productList_specBox').find(".productG_table1_selectActive").length;

        if(broLength>0){
            // 装选择的type的数组
            var array=[];
            var idArray=[];
            var paramIdArray=[];
            for(var i =0;i<broLength;i++){
            var _$object = $(this).parents('.productList_specBox').siblings('.productList_specBox').find(".productG_table1_selectActive").eq(i);
            //拿到子规格的text
            var oText = _$object.siblings('div').text();
            //拿子规格id
            var sId = _$object.parent("li").attr("data");

            //拿子规格的parameid
            var sParamId = _$object.parent("li").attr("paramId");
            array.push(oText);
            idArray.push(sId);
            paramIdArray.push(sParamId);
            }
          //返回list  array点击另一边的参数列表  thisText当前点击的文本
          var _oList = appendKu(array,thisText,oIndex, id ,paramId ,idArray,paramIdArray);

          $(".productList_box").append(_oList);
        }
    });

    //添加到库存的函数
    function appendKu(array,text,index,myId,myParamID,idArray,paramIdArray){
        //遍历进来的数组
        var list="";
        for(var i in array){
          if(index==2){
            var _String=` <li class="productL_content_table1 fl" paramId1=${myId} paramValueId1=${myParamID}>${text}</li>
                          <li class="productL_content_table1 fl" paramId2=${idArray[i]} paramValueId2=${paramIdArray[i]}>${array[i]}</li>`;
          }else if(index==3){
            // 如果先选上面再选下面
            var _String=` <li class="productL_content_table1 fl" paramId1=${idArray[i]} paramValueId1=${paramIdArray[i]}>${array[i]}</li>
                          <li class="productL_content_table1 fl" paramId2=${myId} paramValueId2=${myParamID}>${text}</li>`;
          }
          var random = Math.random()*1000;
              random =Math.random()*random;
              random =Math.floor(random);
          list+=`  <ul class="clearfix productG_content_ul1">
                   <li class="productL_content_table1 fl">
                     <div class="productG_table_select" style="margin:10px auto;">

                     </div>
                   </li>
                   ${_String}
                   <li class="productL_content_table2 fl" contentEditable="true">

                   </li >
                   <li class="productL_content_table2  fl" contentEditable="true">

                   </li>
                   <li class="productL_content_table2  fl"contentEditable="true">

                   </li>
                   <li class="productL_content_table3  fl">
                        <div class="fl prodect_list_imgS" style="color:blue;margin-left:10px;cursor:point;display:none;">
                            [ IMG ]
                        </div>
                        <div class="fr productL_content_upload_btn" style="margin-top:8px;margin-right:6px;">
                            <input type="file" accept="image/*;capture=camera" id="fileImg${random}" name="file" onchange=tableAjaxImg("fileImg${random}")>
                            <p>
                              上传图片
                            </p>
                        </div>
                   </li>

            </ul>`;
        }
        return list;
    }

}
