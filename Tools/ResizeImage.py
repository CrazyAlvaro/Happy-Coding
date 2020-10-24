from PIL import Image
from multiprocessing import Pool
import imghdr
import glob, os, sys
import tqdm

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
  # print("Processing: input_file: {} to output_file {}".format(input_file, input_file))
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

      pool = Pool(processes=4)
      for _ in tqdm.tqdm(pool.imap_unordered(resize_func, proc_files), total=len(proc_files)):
        pass
  else:
    # file
    input_file = input_path
    down_size(input_file)
