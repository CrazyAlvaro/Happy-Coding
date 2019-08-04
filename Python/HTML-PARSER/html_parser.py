from html_doc import html_doc
from bs4 import BeautifulSoup

file = open("result.txt", "w")
soup = BeautifulSoup(html_doc, 'html.parser')

for line in soup.find_all('div', class_="cue style-scope ytd-transcript-body-renderer"):
  file.write(line.get_text().strip().replace('\n', ' ')+'\n')

file.close()