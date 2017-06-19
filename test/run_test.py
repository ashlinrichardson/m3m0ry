#!/usr/bin/env python
'''20170619 try to run remote python-CGI scripts by fetching their URL's.
'''
import os
import sys
import urllib2
from ansicolor import KRED, KGRN, KMAG, KNRM

# normalized file path (with slash, if directory)
def normpath(p):
    pp = os.path.abspath(p)
    if os.path.isdir(pp):
        pp += '/'
    return pp

log_fn = normpath(os.path.dirname(normpath(__file__))) + '../../log_file_memory.log'
log_fn = normpath(log_fn)
log = open(log_fn, 'a')

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

# error message and quit
def error(msg):
    print KRED + "Error: " + KGRN + msg.strip() + KNRM
    sys.exit(1)

base = "http://web.uvic.ca/~lindlab/memory/test/"
for ext in ['test1.py', 'test2.py']:
    url = base + ext
    html = None
    reply = urllib2.urlopen(url)
    html = reply.read()

    pass_fail = None
    if html == '<html><h1>h3ll0 w0r1d</h1></html>\n':
        print timestring(), url
        print '\t' + KMAG + str([html]) + KNRM
        pass_fail = True
    else:
        pass_fail = False

    # write data to log file
    log.write(timestring() + ',' + url + ',' + ('pass' if pass_fail else 'fail') + ',' + str([html]) + '\n'

log.close()

