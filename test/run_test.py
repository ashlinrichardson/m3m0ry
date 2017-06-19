#!/usr/bin/env python
import os
import sys
import urllib2
base = "http://web.uvic.ca/~lindlab/test/"
for ext in ['test1.py', 'test2.py']:
    url = base + ext
    print url

