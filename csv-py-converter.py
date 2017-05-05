#!/usr/bin/python
import csv
import sys
import os.path
import os

fileName = sys.argv[1]
fileNameConv = str(os.path.splitext(fileName)[0])+'_utf.csv'

with open(fileName, 'rb') as source_file:
  with open(fileNameConv, 'w+b') as dest_file:
    contents = source_file.read()
    dest_file.write(contents.decode('utf-16').encode('utf-8'))

# deleting the first line
with open(str(fileNameConv), 'r') as fin:
    data = fin.read().splitlines(True)
with open(str(fileNameConv), 'w') as fout:
    fout.writelines(data[1:])

# read tab-delimited file
with open(str(fileNameConv),'rb') as fin:
    cr = csv.reader(fin, delimiter='\t')
    filecontents = [line for line in cr]

# write comma-delimited file (comma is the default delimiter)
with open(str(os.path.splitext(fileNameConv)[0])+'_converted.csv','wb') as fou:
    cw = csv.writer(fou, delimiter=';', quotechar='"', quoting=csv.QUOTE_ALL)
    cw.writerows(filecontents)
