
import shutil
import os
import sys
from aj import task

def copyAll(sourceFolder,destinationFolder):
    for filename in os.listdir(sourceFolder):
        shutil.copy(sourceFolder + filename, destinationFolder)
        print(filename)




copyAll("vue\\views\\","D:\\current\\appService\\web\\my-build\\vueControls\\")
