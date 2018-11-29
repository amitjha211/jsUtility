//templateUrl : appConfig.viewLink + "sorter.htm",
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
