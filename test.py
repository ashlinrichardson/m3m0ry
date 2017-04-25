#!/usr/bin/python
'''this script is for receiving the data and saving it to a file. 
  xml_send.html (in the example) sends the data. this script recieves it.'''
import os
import cgi
import cgitb
import datetime
cgitb.enable()
form = cgi.FieldStorage()

date_str = str(datetime.datetime.now().isoformat())

pwd = os.getcwd() + '/'
dat_f = pwd + 'data/'
if not os.path.exists(dat_f):
  os.mkdir(dat_f)

dat_fn = dat_f + date_str + ".txt"

f = open(dat_fn, "wb")
f.write(str(form.getvalue('data'))+"\n")
f.close()
