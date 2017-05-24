rm -f master.zip
wget https://github.com/ashlinrichardson/m3m0ry/archive/master.zip
unzip -o master.zip
mv m3m0ry-master/ memory/
chmod -R 755 memory/
chmod -R 754 memory/data/
