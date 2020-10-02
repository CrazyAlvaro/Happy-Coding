from PyPDF2 import PdfFileReader, PdfFileWriter

file_1 = "a.pdf"
file_2 = "b.pdf"


def split(path, middle_page):
  """
  split path pdf file into 2 files
  """

  write_1 = PdfFileWriter()
  write_2 = PdfFileWriter()

  pdf = PdfFileReader(path)
  for page_num in range(pdf.getNumPages()):
    if page_num < middle_page:
      write_1.addPage(pdf.getPage(page_num))
    else:
      write_2.addPage(pdf.getPage(page_num))

  with open(file_1, 'wb') as output_1:
    write_1.write(output_1)

  with open(file_2, 'wb') as output_2:
    write_2.write(output_2)



if __name__ == "__main__":
  path = ""
  middle_page = 0
  split(path, middle_page)
