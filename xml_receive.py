#!/usr/bin/python
''' server-side python-CGI script to receive text data sent over 
the internet by the client-side function util.js::xml_send()'''
import os
import cgi
import datetime

# create /data folder if it does not yet exist
dat_f = os.getcwd() + '/data/'
if not os.path.exists(dat_f):
    os.mkdir(dat_f)

# retrieve CGI form data
dat = None
try:
    dat = str(cgi.FieldStorage().getvalue('data'))
except:
    pass

# write the data to file in the data/ folder
if dat_str:
    fn = dat_f + str(datetime.datetime.now().isoformat()) + '.txt'
    open(fn, 'wb').write(dat)
