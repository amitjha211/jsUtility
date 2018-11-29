Vue.component("bulkUploader", function (resolve) {
    getControlViewHtml("bulk-uploader.html",function(resultHtml, status) { 
        
        resolve({
            template: resultHtml
            , props: {
                uploadPath : String
            }
            , data: function () {
                //debugger;
                var oFiles = new clsFileUploader(oRequest)
                oFiles.path_upload = this.uploadPath;
                
                return {
                    oFiles : oFiles
                }
            }
            , methods: {
                fillFiles : function (e) {
                    this.oFiles.addFiles(e.currentTarget.files);
                }
            }
            , created: function () {
                var self = this;
                this.oFiles.addBeforePost = function (r) {
                    self.$emit("onpost", r);
                }
            }
        });
    });
});
