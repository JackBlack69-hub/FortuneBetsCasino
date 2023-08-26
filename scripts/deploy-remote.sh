#! /bin/bash

pm2 stop 0
rm -rf /apps/fortunebets-xyz

mkdir temp
unzip /root/deploy.zip -d temp
cp -R /root/temp /apps/fortunebets-xyz

rm -rf /root/temp

npm i --prefix /apps/fortunebets-xyz
pm2 start 0
