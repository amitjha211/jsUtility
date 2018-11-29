
"use strict"
function clsPDFViewer(ssLink) {
    /*
    data
    currentPage = 1;
    totalPages = 0
    error = false;
    busy = false
    
    -----Functions-------------------
    
    setCanvas(oCanvas);
    onFileLoad();
    viewPage();
    viewPageByIndex(iIndex);
    loadPDF();
    setPDFLink(sLink);
    reset();
    next();
    previous();

    */

    var sLink = ssLink;

    var _pdf = null;

    var _canvas = null;
    
    this.currentPage = 1;
    this.totalPages = 0
    this.error = false;
    this.pages = [];
    this.busy = false;
    this.progressPer = 0;
    
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
        self.busy = true;
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
            
            self.busy=false;
        });
    }
    
    this.viewPageByIndex = function(iIndex)    {
        self.currentPage = iIndex;
        self.viewPage();
    }


    

    this.loadPDF = function () {
        
        var _progress = function(objProgress){
            self.progressPer = (objProgress.loaded / objProgress.total) * 100;
            
            if(self.onFileLoad) 
                self.onFileLoad();
            
            console.log(self.progressPer);
        }
        
        PDFJS.getDocument( { url : sLink }, false, null, _progress ).then(function(pdf) {
            _pdf = pdf;
            self.totalPages = _pdf.numPages;
            _fillPagesInfo();
            self.viewPage();
            //$scope.$apply();
            if($.isFunction(self.onFileLoad)) self.onFileLoad();
            
        }).catch(function(error) {
            alert(error);
        });
        
        /*
        PDFJS.getDocument(sLink).then(function (pdf) {
            // you can now use *pdf* here
            
            _pdf = pdf;
            self.totalPages = _pdf.numPages;
            
            _fillPagesInfo();
            self.viewPage();
            
            //$scope.$apply();
            
            if(angular.isFunction(self.onFileLoad)) self.onFileLoad();
        });
        */
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
        if (self.currentPage >= (self.totalPages)) {
            alert("You are on the last page !")
            return;
        }
        
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

