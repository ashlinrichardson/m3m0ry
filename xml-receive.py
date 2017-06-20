#!/usr/bin/python
''' server-side python-CGI script to receive text data sent over
the internet by the client-side function util.js::xml_send()'''
import os
import cgi
import uuid
import datetime


# standardized time stamp string
def timestring():
    import time
    t = time.localtime()
    return (('%04d' % t.tm_year) +
            ('%02d' % t.tm_mon) +
            ('%02d' % t.tm_mday) +
            ('%02d' % t.tm_hour) +
            ('%02d' % t.tm_min) +
            ('%02d' % t.tm_sec))


# normalized file path (with slash, if directory)
def normpath(p):
    pp = os.path.abspath(p)
    if os.path.isdir(pp):
        pp += '/'
    return pp

# open a log file ?
log_fn = normpath(os.getcwd() + '/data/log_file.log')
log_f = open(log_fn, 'a')


# timestamped entry to log
def log_entry(msg):
    global log_f
    log_f.write(timestring() + ',' + msg + '\n')

log_entry(string(__file__).strip())

# create /data folder if it does not yet exist
dat_f = normpath(os.getcwd() + '/data/')
if not os.path.exists(dat_f):
    os.mkdir(dat_f)

# retrieve CGI form data
dat = None
try:
    dat = str(cgi.FieldStorage().getvalue('data'))
except:
    pass

# write the data to file in the data/ folder
if dat:
    fn = dat_f + str(datetime.datetime.now().isoformat())
    open(fn + '_' + str(uuid.uuid4().hex) + '.txt', 'wb').write(dat)

# determine survey-specific subfolder create if needed
lines = dat.strip().split('\n')
url = None
for i in range(1, len(lines)):
    try:
        my_url = line.strip().split(',')[0].strip()
        if url:
            if url != my_url:
                log_f.write('error: url mismatch: ' + url + ' != ' + my_url)
        url = my_url
    except:
        pass

words = url.split('/')
if words[-1] != 'memory.html':
    log_f.write('error: unexpected URL: ' + url)

folder_name = words[-2]
log_f.write('folder_name,' + folder_name)
    
log_f.close()

