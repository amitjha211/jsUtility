
Vue.component("pdfTopmenu",function(resolve) {
    getControlViewHtml("pdfTopmenu.html",function(sHtml,status){
        if(status = "success")
        resolve({
            template : sHtml
            , props : {
                viewer : { type : Object , required : true }
            }
            ,data : function (){
                return { };
            }
        });
    });
});


Vue.component("pdfContainer",function(resolve) {
    getControlViewHtml("pdfContainer.html",function(sHtml,status){
        if(status = "success")
        resolve({
            template : sHtml
            , props : {
                viewer : { type : Object , required : true }
            }
            ,data : function (){
                return { };
            }
            ,mounted : function(){
                debugger;
                var elem2 = $("#the-canvas",this.$el)[0];
                this.viewer.setCanvas(elem2);
            }
        });
    });
});

/*
appBll.directive("pdfTopmenu", function (appConfig) {
    return {
        restrict: "E"
        , scope : {  viewer : "=" }
        , replace : false
        , templateUrl : appConfig.viewLink + 'pdfTopmenu.html' //appConfig.appResourceLink + "/dms/controls/pdfViewer/pdfviewer.html"
        , link : function (scope,element) {
            
            //var elem2 = $("#the-canvas",element)[0];
            //scope.viewer.setCanvas(elem2);
            
            scope.viewer.onFileLoad = function(){
                scope.$apply();
            }
        }
    }
});

appBll.directive("pdfContainer", function (appConfig) {
    return {
        restrict: "E"
        , scope : {  viewer : "=" }
        , replace : false
        , templateUrl :  appConfig.viewLink + 'pdfContainer.html' //appConfig.appResourceLink + "/dms/controls/pdfViewer/pdfviewer.html"
        
        , link : function (scope,element) {
            
            
            var elem2 = $("#the-canvas",element)[0];

            scope.viewer.setCanvas(elem2);

            scope.viewer.onFileLoad = function(){
                
                scope.$apply();
            }
        }
    }
});
*/