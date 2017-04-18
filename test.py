#!/usr/bin/python
import os
import cgi
import cgitb
import datetime
import surveyWebEnvironment; printf = surveyWebEnvironment.printHTMLmsg
cgitb.enable()
form = cgi.FieldStorage()

printf("str(form)="+str(form))
printf("data=" + str(form.getvalue('data')))
printf(str(datetime.datetime.now().isoformat()))


pwd = os.getcwd() + '/'

dat_f = pwd + '/data/'

if not os.path.exists(dat_f):
  os.mkdir(dat_f)

printf(pwd)
