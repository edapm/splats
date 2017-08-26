from PIL import Image
import glob
import os
import shutil

SIZE = (400, 400)

if os.path.exists("dump/out/img"):
    shutil.rmtree("dump/out/img")
os.mkdir("dump/out/img")

for infile in glob.glob("dump/img/*"):
    im = Image.open(infile)
    im.thumbnail(SIZE)
    file = os.path.basename(os.path.splitext(infile)[0])
    im.save("dump/out/img/{}.jpg".format(file), optimize=True)
