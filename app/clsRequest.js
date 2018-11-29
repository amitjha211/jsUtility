
function clsRequest($http,appConfig) {

    this.getData = function (sPath, callBack) {
        var sPathFull = appConfig.getDataLink(sPath);

        if($http)
        {
            $http.get(sPathFull).success(function (data, status) {
                callBack(data.Obj)
            }).error(function (data, status) {

            });
        }
    };    
    
    this.submitForm =  function ( fields, uploadUrl, callback) {

        var fd = new FormData();
        
        for (var f in fields) {
            if (fields[f] != null && fields[f] != undefined)
                fd.append(f, fields[f]);
        }
        
        ///////////////////////////////////
        
        if($http)
        {
            
            var _fnSuccess = function(res){
                if (callback != undefined) callback(res.data,"success");
            };
            
            var _fnError = function(){
                if (callback != undefined) callback(null,"error");
            };
        
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(_fnSuccess,_fnError);
        }
        else    
        {
            /*
            $.post(uploadUrl,fields,function(data,status){
                if(status == "success") 
                    callback(data,"success");
                else 
                    callback(null,"error");
            });
            */
            
            request  = $.ajax({
                url: uploadUrl,
                contentType: false,
                data: fd,
                processData : false,
                type: 'POST'
            });

            request.done(function(data){
                callback(data,"success");
            });

            request.fail(function(error){
                callback(null,"error");
            });
        }
    };
    
    
    this.execJson = function (sPath, jnData, func,e) {
        var oAjaxProcess = new clsAjaxProcessing(e);
        oAjaxProcess.start();

        var _url = appConfig.getDataLink(sPath);

        this.submitForm(jnData,_url,function (data){
            func(data)
            oAjaxProcess.end();
        });
    }
    
    this.execGrid = function (sPath, pageSize, start, length, jnData, func, e) {
        
        
        var oAjaxProcess = new clsAjaxProcessing(e);
        oAjaxProcess.start();

        var _url = appConfig.getDataPagingLink(sPath, pageSize, length, start);

        this.submitForm(jnData,_url,function (data){
            func(data);
            oAjaxProcess.end();
        });
    }

     this.setSQLReport = function (sPath, jnData, func, e) {
         var url = appConfig.getReportLink(sPath);
         var oAjaxProcess = new clsAjaxProcessing(e);
         
         oAjaxProcess.start();
         this.submitForm(jnData, url, function (data) {
             var response = data['msg'];
             var data1 = data['data'];
             
             if (response != "") {
                 alert(response);
                 if ($.isFunction(func)) func("error");
             }
             else {
                 //ShowMessage("success!", response);
                 if ($.isFunction(func)) func("success", data1);
             }
             
             oAjaxProcess.end();
         });
     }
    
     this.downloadSQLReport = function(sPath,sFileType,jnData,e){
         this.setSQLReport( sPath, jnData, function (status) {
            if(status=="success")
                window.location = appConfig.getReportDownloadLink() + "?filetype=" + sFileType;
        }, e);    
     }
     
     
     this.setFileForDownload = function (sPath, jnData, func, e) {
         
         var url = appConfig.getFileLink(sPath);
         var oAjaxProcess = new clsAjaxProcessing(e);
         
         oAjaxProcess.start();
         this.submitForm(jnData, url, function (data) {
             var response = data['msg'];
             var data1 = data['data'];
             
             if (response != "") {
                 alert(response);
                 if ($.isFunction(func)) func("error");
             }
             else {
                 //ShowMessage("success!", response);
                 if ($.isFunction(func)) func("success", data1);
             }
             
             oAjaxProcess.end();
         });
     }
     
     this.downloadFile = function(sPath,jnData,e){
         
         this.setFileForDownload(sPath, jnData, function (status) {
            if(status=="success")
                window.location = appConfig.getFileDownloadLink();
        }, e);    
     }
     
     this.UpdateModule =  function ( sPath, jnData, func, e) {
            
        var url = appConfig.getUpdateLink(sPath);
        var oAjaxProcess = new clsAjaxProcessing(e);

        oAjaxProcess.start();

        this.submitForm( jnData, url, function (data) {
            var response = data['msg'];
            var data1 = data['data'];

            if (response != "") {
                alert("Opps! "+ response);
                if ($.isFunction(func)) func("error");
            }
            else {
                //ShowMessage("success!", response);
                if ($.isFunction(func)) func("success", data1);
            }
            oAjaxProcess.end();
        });
    }
     
    this.UpdateModule2 =  function ( sPath, jnData, func, e) {
            
        var url = appConfig.getUpdateLink(sPath);
        var oAjaxProcess = new clsAjaxProcessing(e);

        oAjaxProcess.start();

        this.submitForm( jnData, url, function (data) {
            var response = data['msg'];
            var data1 = data['data'];

            if (response != "") {
                //alert("Opps! "+ response);
                if ($.isFunction(func)) func("error",response);
            }
            else {
                //ShowMessage("success!", response);
                if ($.isFunction(func)) func("success", data1);
            }
            oAjaxProcess.end();
        });
    }


}