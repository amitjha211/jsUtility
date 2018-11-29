import os
import shutil
import sys

from aj import task

def copyAll(sourceFolder,destinationFolder):
    for filename in os.listdir(sourceFolder):
        shutil.copy(sourceFolder + filename, destinationFolder)
        print(filename)



common = {
    "out" : ".\\..\\jsDemo\\build\\common.js"
    ,"input" : [
        "common\\clsAjaxProcessing.js"
        ,"common\\g.js"
        ,"common\\global.js"
        ,"common\\myAjax.js"
    ]
}

ng = {
    "out" : ".\\..\\jsDemo\\build\\ngBll.js"
    ,"input" : [
        '.\\..\\jsDemo\\build\\common.js'
        ,'ng\\ngCommon.js'
        ,'app\\clsAppConfig.js'
        ,'app\\clsRequest.js'
        ,'app\\mypdf.js'
        ,'ng\\bll.js'
        ,'app\\clsCRUD.js'
        ,'ng\\directives\\pager.js'
        ,'ng\\directives\\sorter.js'
        ,'ng\\directives\\busy.js'
        ,'ng\\directives\\grd-filter.js'
        ,'ng\\directives\\test.js'
        ,'ng\\directives\\drp.js'
        ,'ng\\directives\\fld.js'
        ,'ng\\directives\\file-model.js'
        ,'ng\\directives\\pdf-bundle.js'
        ,'ng\\commonControllers\\CRUDControllers.js'
        
    ]
}

vue  = {
    "out" : ".\\..\\jsDemo\\build\\vueBll.js"
    ,"input" : [
         '.\\..\\jsDemo\\build\\common.js'
        ,'app\\mypdf.js'
        ,'vue\\Common.js'
        ,'app\\clsAppConfig.js'
        ,'app\\clsRequest.js'
        ,'app\\mypdf.js'
        ,'app\\clsCRUD.js'
        ,'app\\clsFileUploader.js'
        ,'vue\\components.js'
        ,'vue\\components\\bulk-uploader.js'
        ,'vue\\components\\drp.js'
		,'vue\\components\\bootstrap-field.js'
        ,'vue\\components\\pdf-bundle.js'
        ,'vue\\clsFilterField.js'
        

    ]
}

task.join_files(common,ng,vue)

print("Concat completed !")

###################

shutil.copyfile(".\\..\\jsDemo\\build\\common.js","D:\\current\\appService\\web\\my-build\\common.js")
shutil.copyfile(".\\..\\jsDemo\\build\\ngBll.js","D:\\current\\appService\\web\\my-build\\ngBll.js")
shutil.copyfile(".\\..\\jsDemo\\build\\vueBll.js","D:\\current\\appService\\web\\my-build\\vueBll.js")
#copyAll(".\\..\\jsDemo\\build\\","D:\\current\\appService\\web\\my-build\\")
#copyAll(".\\vue\\views\\","D:\\current\\appService\\web\\my-build\\vueControls\\")

print("Copying vue View files")
task.copyAll("vue\\views\\","D:\\current\\appService\\web\\my-build\\vueControls\\")

print("Copying NG View files")
task.copyAll("ng\\views\\","D:\\current\\appService\\web\\my-build\\ngResources\\views\\")

print("file moved !")