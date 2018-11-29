"use strict"


function clsPDFViewer(ssLink) {

    var sLink = ssLink;

    var _pdf = null;

    var _canvas = null;
    
    this.currentPage = 1;
    this.totalPages = 0
    this.error = false;
    this.pages = [];
    
    this.setCanvas = function(oCanvas) {
        _canvas = oCanvas;
    };
    
    this.onFileLoad = function(){
        
    };
    
    var self = this;
    
    var _fillPagesInfo = function() {
        
        for(var i = 0; i < self.totalPages; i++) {
            
            var jn = { pageNumber : i+1 };
            
            self.pages.push(jn);
            
        }
    }

    this.viewPage = function () {
        _pdf.getPage(self.currentPage).then(function (page) {
            // you can now use *page* here
            var scale = 1.5;
            
            var viewport = page.getViewport(scale);

            //var canvas = document.getElementById('the-canvas');
            var context = _canvas.getContext('2d');
            _canvas.height = viewport.height;
            _canvas.width = viewport.width;

            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            
            page.render(renderContext);
        });
    }
    
    this.viewPageByIndex = function(iIndex)    {
        self.currentPage = iIndex;
        self.viewPage();
    }


    

    this.loadPDF = function () {
        PDFJS.getDocument(sLink).then(function (pdf) {
            // you can now use *pdf* here
            
            _pdf = pdf;
            self.totalPages = _pdf.numPages;
            
            _fillPagesInfo();
            self.viewPage();
            
            //$scope.$apply();
            
            if(angular.isFunction(self.onFileLoad)) self.onFileLoad();
        });
    }


    this.setPDFLink = function (_Link) {
        sLink = _Link;
        self.loadPDF()
    }

    this.reset = function () {
        this.currentPage = 1;
        self.viewPage();
    }

    this.next = function () {
        this.currentPage += 1;
        self.viewPage();
    }

            
    this.previous = function () {
        if (self.currentPage == 1) {
            alert("You are on the first page !")
            return;
        }

        self.currentPage -= 1;
        self.viewPage();
    }    
}



appBll.directive("pdfTopmenu", function (appConfig) {
    return {
        restrict: "E"
        , scope : {  viewer : "=" }
        , replace : false
        , templateUrl : '../web/js/src/pdfViewer/pdfTopmenu.html' //appConfig.appResourceLink + "/dms/controls/pdfViewer/pdfviewer.html"
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
        , templateUrl : '../web/js/src/pdfViewer/pdfContainer.html' //appConfig.appResourceLink + "/dms/controls/pdfViewer/pdfviewer.html"
        
        , link : function (scope,element) {
            
            
            var elem2 = $("#the-canvas",element)[0];

            scope.viewer.setCanvas(elem2);

            scope.viewer.onFileLoad = function(){
                scope.$apply();
            }
        }
    }
});


