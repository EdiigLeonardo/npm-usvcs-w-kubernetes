mkdir auth
docker stop registry
docker run --entrypoint htpasswd httpd:2 -Bbn testuser testpassword > auth/htpasswd
docker run -d -p 5000:5000 --restart=always --name registry \
  -v "$(pwd)"/auth:/auth -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd registry:2
echo "testpassword" > pwd.txt
cat pwd.txt | docker login localhost:5000 --username testuser --password-stdin
