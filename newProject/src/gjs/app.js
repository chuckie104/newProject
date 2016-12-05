function homePage()
{

  //000
}

function productClassfix(){
  //获取列表点击
  $(".productClassfix_btnC").click(function(){
    //如果存在，又再次点击。则无反应
    if($(".productG_content_ul1").length>1){
      return;
    }
    ajax(""+url+"wangjian/api/productType/listProduct","post",{merchantId:"44"})
    .then((data)=>{
        console.log(JSON.stringify(data));
        pushList(data);
    })
  });

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
          _this.parents("ul").remove();
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
      }
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

      //解构取对象
      var {resultCode,resultMessage,resultData} =data;
      console.log(typeof resultCode);
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

        $(".productG_content_table").append(list);
      }
  }
}
