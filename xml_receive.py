#!/usr/bin/python
''' this server-side python-CGI script receives text format data sent
over the internet by the client-side function util.js::xml_send()'''
import os
import cgi
import datetime

pwd = os.getcwd() + '/'

dat_f = pwd + 'data/'
if not os.path.exists(dat_f):
    os.mkdir(dat_f)

dat_fn = dat_f + str(datetime.datetime.now().isoformat()) + ".txt"

# retrieve CGI form data
dat_str = None
try:
    dat_str = str(cgi.FieldStorage().getvalue('data')) + '\n'
except:
    pass

# write the data to file in the data/ folder
if dat_str:
    f = open(dat_fn, 'wb').write(dat_str)
