Vue.component("drp",{
    template:'<select class="form-control"  v-model="model1" >\n <option v-for="r in grd.rows" v-bind:value="r[valueMember]">{{r[displayMember]}}</option> \n </select>'
    , props :  {
        source : [String,Number]
        , valueMember : [String,Number]
        , displayMember : [String,Number] 
        , value : [String,Number]
    }
    , data : function(){
        var _grd = new ngCRUD(oRequest,this.source,"","","id");
        return { grd : _grd , model1 : this.value };
    }
    , created : function(){
        this.grd.loadAll();
    }
    , watch : {
      model1:function(newValue){
        this.$emit("input",newValue);
      }  
        
      ,value : function(newValue){
        this.model1 = newValue;
      }
    }
});

