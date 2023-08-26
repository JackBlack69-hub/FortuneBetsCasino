#! /bin/bash

npm run build

echo " "
echo "--------- DEPLOYING TO REMOTE SERVER ---------"

scp deploy.zip root@45.32.238.73:/root

ssh root@45.32.238.73 'cd /root && sh deploy-remote.sh && exit'

echo " "
echo "---------------- DEPLOY SUCCESS ---------------"
echo "|                                             |"
echo "| Deployed to remote server @ 45.32.238.73  |"
echo "|                                             |"
echo "| Check logs to confirm that the deploy       |"
echo "| was successfull.                            |"
echo "|                                             |"
echo "-----------------------------------------------"