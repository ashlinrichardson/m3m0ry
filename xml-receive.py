#!/usr/bin/python
''' server-side python-CGI script to receive text data sent over
the internet by the client-side function util.js::xml_send()

20170620 data now saved to survey-specific subfolders'''
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
log_fn = normpath(os.getcwd() + '/data/') + 'log_file.log'
log_f = open(log_fn, 'a')


# timestamped entry to log
def log_entry(msg):
    global log_f
    log_f.write(timestring() + ',' + msg + '\n')

# got here
log_entry('exec ' + str(__file__).strip())

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
fn_base = None
if dat:
    fn_base = str(datetime.datetime.now().isoformat())
    fn_base += '_' + str(uuid.uuid4().hex) + '.txt'
    fn = dat_f + fn_base
    open(dat_f + fn_base, 'wb').write(dat)

# determine survey-specific subfolder create if needed
lines = dat.strip().split('\n')
url = None

for i in range(1, len(lines)):
    try:
        my_url = lines[i].strip().split(',')[0].strip()
        if url:
            if url != my_url:
                log_f.write('error: url mismatch: ' + url + ' != ' + my_url)
        url = my_url
    except:
        pass

words = url.split('/')
if words[-1] != 'memory.html':
    log_f.write('error: unexpected URL: ' + url)

study_name = words[-2]

# specific data file for a particular study
study_f = normpath(dat_f + study_name)
if not os.path.exists(study_f):
    os.mkdir(study_f)

# write the same data to the study-specific folder, as well
if dat:
    open(normpath(study_f) + fn_base, 'wb').write(dat)
    log_entry(' +w ' + normpath(study_f) + fn_base)

log_f.close()