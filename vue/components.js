Vue.component("pager",function(resolve) {
    getControlViewHtml("pager.html",function(sHtml,status){
        if(status="success")
        resolve({
            template : sHtml

            ,data : function(){
                return { abc : "amit"};
            }
            ,props :{
                grd : { type : Object   }
            }

        });
    });
});


Vue.component("gridFilter",function(resolve) {
    getControlViewHtml("grid-filter.html",function(sHtml,status){
        debugger;
        if(status = "success")
        resolve({
            template : sHtml
            , props : {
                grd : { type : Object , required : true }
            }
            ,data : function (){
                return { };
            }
            
        });
    });
});

Vue.component("grdFilter",function(resolve) {
    getControlViewHtml("grid-filter.html",function(sHtml,status){
        debugger;
        if(status = "success")
        resolve({
            template : sHtml
            , props : {
                grd : { type : Object , required : true }
            }
            ,data : function (){
                return { };
            }
            
        });
    });
});



Vue.component("grdSort",{
    props : { grd : [Object], col : [String]  }
    ,template : '<a class="pull-right" style="cursor:pointer" v-on:click="grd.sort(col, $event)"><i v-bind:class="[\'fa\',grd.getSortClass(col)]"></i> </a>'
});


Vue.component("busyBox",{
    props : { busy : [Boolean] }
    ,template : "<div v-show='busy' tyle='width:100%'><center><div class='busy-lg'></div></center></div>"
});

Vue.component("busy",{
    props : { grd : [Object] }
    ,template : "<div v-show='grd.busy' tyle='width:100%'><center><div class='busy-lg'></div></center></div>"
});




Vue.component("item1",function(resolve) {
    getControlViewHtml("tree1.html",function(sHtml,status){
        if(status="success")
        resolve({
            template : sHtml
            ,  data: function () {
                return {
                  open: false
                }
            }
            , props : {
                model: Object
            }
            , computed: {
                isFolder: function () {
                  return this.model.children &&
                    this.model.children.length
                }
            } 
            , methods : {
                toggle: function () {
                  if (this.isFolder) {
                    this.open = !this.open
                  }
                }
                ,
                changeType: function () {
                  if (!this.isFolder) {
                    Vue.set(this.model, 'children', [])
                    this.addChild()
                    this.open = true
                  }
                }
                ,
                addChild: function () {
                  this.model.children.push({
                    name: 'new stuff'
                  })
                }
            }

        });
    });
});

