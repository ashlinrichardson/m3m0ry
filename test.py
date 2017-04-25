#!/usr/bin/python
'''
  this script is for receiving the data and saving it to a file. 
'''
import os
import cgi
import cgitb
import datetime
import surveyWebEnvironment; printf = surveyWebEnvironment.printHTMLmsg
cgitb.enable()
form = cgi.FieldStorage()

#printf("str(form)="+str(form))
printf("data=" + str(form.getvalue('data')))
date_str = str(datetime.datetime.now().isoformat())
#printf(date_str)

pwd = os.getcwd() + '/'
dat_f = pwd + 'data/'
if not os.path.exists(dat_f):
  os.mkdir(dat_f)

dat_fn = dat_f + date_str + ".txt"

#printf(dat_fn)

f = open(dat_fn, "wb")
#f.write("str(form)="+str(form)+"\n");
f.write(str(form.getvalue('data'))+"\n")
f.close()
# printf(pwd)
