from PIL import Image
import imghdr
import glob, os, sys
from multiprocessing import Pool

# DEFAULT_SIZE = (480, 480)
DEFAULT_SIZE = (960, 960)
IMAGE_TYPE = ['rgb', 'gif', 'pbm', 'pgm', 'ppm', 'tiff', 'rast', 'xbm', 'jpeg', 'bmp', 'png', 'webp', 'exr']
def down_size(image_path, size=DEFAULT_SIZE):
  im = Image.open(image_path)
  im.thumbnail(size)
  im.save(image_path)

def resize_func(input_file):
  if imghdr.what(input_file) not in IMAGE_TYPE:
    return
  print("Processing: input_file: {} to output_file {}".format(input_file, input_file))
  down_size(input_file)

if __name__ == "__main__":
  input_path = sys.argv[1]

  # file / director
  if os.path.isdir(input_path):
    # directory
    files = list(os.listdir(input_path))
    proc_files = []

    if len(files) >= 0:
      for file in files:
        proc_files.append(os.path.join(input_path, file))

      with Pool(4) as p:
        p.map(resize_func, proc_files)
  else:
    # file
    input_file = input_path
    down_size(input_file)
