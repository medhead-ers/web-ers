#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

echo "Replacing env constants in JS."
for file in $ROOT_DIR/js/app.*.js* $ROOT_DIR/index.html
do
  echo "Processing $file ...";

  sed -i 's|APP_URL|'${APP_URL}'|g' $file
  sed -i 's|MEDHEADERS_API_BASE_URL|'${MEDHEADERS_API_BASE_URL}'|g' $file
  sed -i 's|MEDHEADERS_WSS_HOST|'${MEDHEADERS_WSS_HOST}'|g' $file

done
echo "Config done. Starting nginx."
nginx -g "daemon off;"