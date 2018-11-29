//Before starting coding uncomment this code 
//var oRequest = new clsRequest();

function clsFileUploader(oRequest){
    
    this.rows = [];
    
    this.path_upload = "";
    
    this.process = {
        runing : false 
        ,totalCount : 0
        ,doneCount : 0
        ,errorCount : 0
        ,currentFileName : ""
    }
    
    this.addFiles = function(oFiles){
        
        this.rows = [];
        for(var i =0; i < oFiles.length;i++){
            var jn = {fileName : "",fileSize : 0 ,fileData : null }
            
            jn.fileName = oFiles[i].name;
            jn.fileSize = Math.round(oFiles[i].size / 1024,-2);
            jn.fileData = oFiles[i];
            this.rows.push(jn);
        }
        
        
        this.process.totalCount = this.rows.length;
        
    }
    
    this.getPer = function()
    {
        return  Math.round(((this.process.doneCount + this.process.errorCount) / this.process.totalCount) * 100);
    }

    
    this.addBeforePost = function(d){
        
    }
    
    
    
    this.uploadFile = function(r,e,callBack){
        
        debugger;
        var this1 = this;
        
        var jnPost =  { "fileData" :  r['fileData']} ;
        r.busy = true;
        
        this.process.currentFileName  = r.fileName;
        if($.isFunction(this.addBeforePost)) this.addBeforePost(jnPost);
        
        oRequest.UpdateModule2(this1.path_upload,jnPost,function(status,error){
            
            if(status == "success") {
                r.busy = false;
                r.status = "Done"
                r.done = true;
                r.err = false;
                
                this1.process.doneCount++;
            }
            else
            {
                r.busy = false;
                r.status = error;
                r.done = false;
                r.err = true;
                
                this1.process.errorCount++;
            }
            
            if($.isFunction(callBack) == true){
                callBack();
            }
        });
        
    }
                         
    
    this.uploadFiles = function() {
        var self = this;
            
        //var busy = false;
        var stopInterval = undefined;
        
        var iRow = -1;
        var busy  = false;
        this.process.runing = true;

        var _stopInterval = function(){
            
            clearInterval(stopInterval)
            self.process.runing = false;
            //alert("Operation done kinly check the log !");
        }
            
        stopInterval = setInterval(function(){
            
            
            if(iRow >= (self.rows.length -1)){
                _stopInterval();     
                busy = false;
                return;
            }
                                 
            if(busy == true) return;

            if(iRow < self.rows.length){
                iRow++;
                busy = true;
                self.uploadFile(self.rows[iRow],null,function(){
                    busy = false;        
                });
            }
            
        },100);
    }
    
}
