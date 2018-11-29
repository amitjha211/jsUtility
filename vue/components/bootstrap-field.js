Vue.component("fld",{
    template :  '<div class="form-group"><label>{{fieldTitle}}&nbsp;<span style="color:red" v-show="fieldRequired">*</span></label> <input type="text" v-model="model1" class="form-control" /> </div>'
    , props : {
         fieldTitle : String
        , fieldRequired :  { type : Boolean , default : false }
        , value : [String,Number]
    }
    , data : function(){
        return { model1 : this.value  }
    }
    , watch : {
      model1 : function(newValue){
        this.$emit("input",newValue);
      }  
      ,value : function(newValue){
          this.model1 = newValue
      }
    }
});



