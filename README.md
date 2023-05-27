# Intro

It's assumed the git repository is cloned in ```npm-registry-w-docker-n-kubernetes``` .

# Create account Docker Hub

Nowadays there is a [pull rate limit in Docker Hub](https://docs.docker.com/docker-hub/download-rate-limit/). 

To surpass this issue it's required to [create a Docker Hub account](https://hub.docker.com/signup) associated with an email, is possible a private email account due to issues with the corporate email.

Quote from [whats-the-download-rate-limit-on-docker-hub](https://docs.docker.com/docker-hub/download-rate-limit/#whats-the-download-rate-limit-on-docker-hub)
```
For authenticated users, it’s 200 pulls per 6 hour period.
```

To use the limit associated with the email it's required to run the command ```docker login``` in the terminal.

# Cleanup k3s and docker registry (optional)

```sh
cd .
kubectl delete -f spa-ingress.yml
kubectl delete -f angular-app-ingress.yml
kubectl delete -f api-ingress.yml 
kubectl delete -f mariadb.yml 
kubectl delete -f spa/spa.yml
kubectl delete -f angular-app/angular-app.yml 
kubectl delete -f api/api.yml 
kubectl delete deployment ingress-nginx-controller -n ingress-nginx
kubectl delete service ingress-nginx-controller-admission ingress-nginx-controller -n ingress-nginx
kubectl get pods --all-namespaces  | grep nginx | awk '//{print $2}' | xargs -i kubectl delete pod {} -n ingress-nginx

kubectl get deployment --all-namespaces
kubectl get service --all-namespaces
kubectl get pods --all-namespaces

docker stop registry 
docker rm registry 
docker system prune -a -f --volumes
docker ps 
```

# Remove traefik ingress controller

```sh
kubectl -n kube-system delete helmcharts.helm.cattle.io traefik
sudo service k3s stop
sudo nano /etc/systemd/system/k3s.service
# Edit the k3s service file /etc/systemd/system/k3s.service by adding this line to the ExecStart
# ExecStart=/usr/local/bin/k3s server --write-kubeconfig-mode 644 --disable traefik
sudo systemctl daemon-reload
sudo rm /var/lib/rancher/k3s/server/manifests/traefik.yaml
sudo service k3s start
kubectl get service  --all-namespaces
# In kube-system namespace should only appear kube-dns and metrics-server 
```

# Install nginx ingress controller and start docker registry

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.4.0/deploy/static/provider/cloud/deploy.yaml
sh registry_start.sh

# set credentials of docker registry
kubectl get secrets
kubectl delete secret  docker-registry-creds
kubectl create secret docker-registry docker-registry-creds \
  --docker-server="localhost:5000" --docker-username=testuser \
  --docker-password=testpassword
```

# Setup MariaDB

```sh
kubectl apply -f mariadb.yml
sleep 120
MARIADB_CONTAINER=$(kubectl get pods | grep mariadb | awk '//{print $1}')
kubectl cp setupdb.sql $MARIADB_CONTAINER:/tmp
kubectl exec -it $MARIADB_CONTAINER -- sh -c 'mysql -ppassword < /tmp/setupdb.sql'
```

# Test MariaDB (optional)

```sh
kubectl exec -it $MARIADB_CONTAINER -- bash
mysql -u userx -ppassx
# show databases; 
# \q 
exit 
```

# Build and run REST API

```sh
cd ./api
docker build -t api-image .
docker tag api-image localhost:5000/api-image
docker push localhost:5000/api-image

cd ../
kubectl apply -f api/api.yml
sleep 120 
```

# Configure host api.local in ingress

```sh
EXTERNAL_IP=$(ip  addr show enp0s3 | grep "inet " | awk '//{print $2}' | sed  's/\/24//g')
echo $EXTERNAL_IP
sudo sh -c "echo '\n$EXTERNAL_IP api.local \n' >> /etc/hosts"
ping api.local -c 3
sleep 15

# if there is an issue with external IP's run 
kubectl patch svc ingress-nginx-controller -p "{\"spec\":{\"externalIPs\":[\"$EXTERNAL_IP\"]}}" -n ingress-nginx
kubectl get service ingress-nginx-controller -n=ingress-nginx
```

# Build and run SPA

## debug and fix errors (optional):

- To fix any errors encountered while building a Docker image, you can try the following scripts:

```sh
npm update --force
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install --force
```

```sh
cd ./spa
docker build -t spa-image .
docker tag spa-image localhost:5000/spa-image
docker push localhost:5000/spa-image
kubectl apply -f ./spa.yml
sleep 120
```

# Configure host spa.local in ingress

```sh
EXTERNAL_IP=$(ip  addr show enp0s3 | grep "inet " | awk '//{print $2}' | sed  's/\/24//g')
echo $EXTERNAL_IP
sudo sh -c "echo '\n$EXTERNAL_IP spa.local \n' >> /etc/hosts"
ping spa.local -c 3
sleep 15
```

# Build and run angular-app

## debug and fix errors (optional):

- To fix any errors encountered while building a Docker image, you can try the following scripts:

```sh
npm update
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```
## Building a image to Docker:

```sh
cd ./angular-app
docker build -t angular-app-image .
docker tag angular-app-image localhost:5000/angular-app-image
docker push localhost:5000/angular-app-image
kubectl apply -f ./angular-app.yml
sleep 120
```

# Configure host angular-app.local in ingress

```sh
EXTERNAL_IP=$(ip  addr show enp0s3 | grep "inet " | awk '//{print $2}' | sed  's/\/24//g')
echo $EXTERNAL_IP
sudo sh -c "echo '\n$EXTERNAL_IP angular-app.local \n' >> /etc/hosts"
ping angular-app.local -c 3
sleep 15
```


# Create local Certificate authority

## Create private key localCA

With pass phrase ```12345678```.
```sh
mkdir ./certs
cd ./certs
openssl genrsa -des3 -out localCA.key 2048
#Generating RSA private key, 2048 bit long modulus (2 primes)
#..........+++++
#..................................+++++
#e is 65537 (0x010001)
#Enter pass phrase for localCA.key:
#Verifying - Enter pass phrase for localCA.key:
```

## Create root certificate (public key) localCA

```sh
openssl req -x509 -new -nodes -key localCA.key -sha256 -days 1825 -out localCA.pem 
#Enter pass phrase for localCA.key:
#You are about to be asked to enter information that will be incorporated
#into your certificate request.
#What you are about to enter is what is called a Distinguished Name or a DN.
#There are quite a few fields but you can leave some blank
#For some fields there will be a default value,
#If you enter '.', the field will be left blank.
#-----
#Country Name (2 letter code) [AU]:PT
#State or Province Name (full name) [Some-State]:Castelo Branco
#Locality Name (eg, city) []:Fundão
#Organization Name (eg, company) [Internet Widgits Pty Ltd]:CABugs
#Organizational Unit Name (eg, section) []:Bugs
#Common Name (e.g. server FQDN or YOUR name) []:ca.local
#Email Address []:vagrant@ca.local
```

#  localCA.key (your private key) and localCA.pem (your root certificate).

```sh
sudo cp ./certs/localCA.pem /usr/local/share/ca-certificates/localCA.crt
sudo update-ca-certificates

awk -v cmd='openssl x509 -noout -subject' '/BEGIN/{close(cmd)};{print | cmd}' < /etc/ssl/certs/ca-certificates.crt | grep Bugs
```

# Steps for api.local

## Create certificate and private key (api-local.crt and api-local.key)

```sh
openssl genrsa -out api-local.key 2048
```

## Create CSR (certificate signing request)

```sh
openssl req -new -key api-local.key -out api-local.csr
#You are about to be asked to enter information that will be incorporated
#into your certificate request.
#What you are about to enter is what is called a Distinguished Name or a DN.
#There are quite a few fields but you can leave some blank
#For some fields there will be a default value,
#If you enter '.', the field will be left blank.
#-----
#Country Name (2 letter code) [AU]:PT
#State or Province Name (full name) [Some-State]:Castelo Branco 
#Locality Name (eg, city) []:Fundão
#Organization Name (eg, company) [Internet Widgits Pty Ltd]:Bugs
#Organizational Unit Name (eg, section) []:Bugs
#Common Name (e.g. server FQDN or YOUR name) []:api.local
#Email Address []:vagrant@api.local 
#
#Please enter the following 'extra' attributes
#to be sent with your certificate request
#A challenge password []:
#An optional company name []:
```

## Create a configuration file called api-local.ext

Create file ```api-local.ext```

```sh
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = api.local
```

## Create the CA signed certificate: using our CSR, the CA private key, the CA certificate, and the config file

With pass phrase ```12345678```.

```sh
openssl x509 -req -in api-local.csr -CA localCA.pem -CAkey localCA.key -CAcreateserial \
    -out api-local.crt -days 825 -sha256 -extfile api-local.ext
# Signature ok
# subject=C = PT, ST = Castelo Branco, L = Fund\C3\83\C2\A3o, O = Bugs, OU = Bugs, CN = api.local, emailAddress = "vagrant@api.local "
# Getting CA Private Key
# Enter pass phrase for /home/vagrant/edig.leonardo/npm-usvcs/certs/localCA.key:
# 
kubectl delete secret k3s-tls-api-local
kubectl create secret tls k3s-tls-api-local --namespace default --key api-local.key --cert api-local.crt
sleep 5
cd ./
kubectl apply -f api-ingress.yml
sleep 5
curl api.local
curl https://api.local -kv 2>&1 | grep -i issuer
# *  issuer: C=PT; ST=Castelo Branco; L=Fundão; O=CABugs; OU=Bugs; CN=ca.local; emailAddress=vagrant@ca.local
curl https://api.local -v 2>&1 | grep -i issuer
# *  issuer: C=PT; ST=Castelo Branco; L=Fundão; O=CABugs; OU=Bugs; CN=ca.local; emailAddress=vagrant@ca.local
curl https://api.local
```

# Steps for spa.local 

## Create certificate and private key (spa-local.crt and spa-local.key)

```sh
cd ./certs
openssl genrsa -out spa-local.key 2048
```

## Create CSR (certificate signing request)

```sh
openssl req -new -key spa-local.key -out spa-local.csr
#You are about to be asked to enter information that will be incorporated
#into your certificate request.
#What you are about to enter is what is called a Distinguished Name or a DN.
#There are quite a few fields but you can leave some blank
#For some fields there will be a default value,
#If you enter '.', the field will be left blank.
#-----
#Country Name (2 letter code) [AU]:PT
#State or Province Name (full name) [Some-State]:Castelo Branco 
#Locality Name (eg, city) []:Fundão
#Organization Name (eg, company) [Internet Widgits Pty Ltd]:Bugs
#Organizational Unit Name (eg, section) []:Bugs
#Common Name (e.g. server FQDN or YOUR name) []:spa.local
#Email Address []:vagrant@spa.local 
#
#Please enter the following 'extra' attributes
#to be sent with your certificate request
#A challenge password []:
#An optional company name []:
```

## Create a configuration file called spa-local.ext

Create file ```spa-local.ext```
```sh
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = spa.local
```

## Create the CA signed certificate: using our CSR, the CA private key, the CA certificate, and the config file

With pass phrase ```12345678```.
```sh
openssl x509 -req -in spa-local.csr -CA localCA.pem -CAkey localCA.key -CAcreateserial \
    -out spa-local.crt -days 825 -sha256 -extfile spa-local.ext
#Signature ok
#subject=C = PT, ST = Castelo Branco, L = Fund\C3\83\C2\A3o, O = Bugs, OU = Bugs, CN = spa.local, emailAddress = "vagrant@spa.local "
#Getting CA Private Key
#Enter pass phrase for /home/vagrant/edig.leonardo/npm-usvcs/certs/localCA.key:

kubectl delete secret k3s-tls-spa-local
kubectl create secret tls k3s-tls-spa-local --namespace default --key spa-local.key --cert spa-local.crt
sleep 5

cd .
kubectl apply -f spa-ingress.yml
sleep 120
curl spa.local
curl https://spa.local -kv 2>&1 | grep -i issuer
#*  issuer: C=PT; ST=Castelo Branco; L=Fundão; O=CABugs; OU=Bugs; CN=ca.local; emailAddress=vagrant@ca.local
curl https://spa.local -v 2>&1 | grep -i issuer
#*  issuer: C=PT; ST=Castelo Branco; L=Fundão; O=CABugs; OU=Bugs; CN=ca.local; emailAddress=vagrant@ca.local
curl https://spa.local
```

# Steps for angular-app.local 

## Create certificate and private key (angular-app-local.crt and angular-app-local.key)

```sh
cd ./certs
openssl genrsa -out angular-app-local.key 2048
```

## Create CSR (certificate signing request)

```sh
openssl req -new -key angular-app-local.key -out angular-app-local.csr
#You are about to be asked to enter information that will be incorporated
#into your certificate request.
#What you are about to enter is what is called a Distinguished Name or a DN.
#There are quite a few fields but you can leave some blank
#For some fields there will be a default value,
#If you enter '.', the field will be left blank.
#-----
#Country Name (2 letter code) [AU]:PT
#State or Province Name (full name) [Some-State]:Castelo Branco 
#Locality Name (eg, city) []:Fundão
#Organization Name (eg, company) [Internet Widgits Pty Ltd]:Bugs
#Organizational Unit Name (eg, section) []:Bugs
#Common Name (e.g. server FQDN or YOUR name) []:angular-app.local
#Email Address []:vagrant@angular-app.local 
#
#Please enter the following 'extra' attributes
#to be sent with your certificate request
#A challenge password []:
#An optional company name []:
```

## Create a configuration file called angular-app-local.ext

Create file ```angular-app-local.ext```
```sh
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = angular-app.local
```

## Create the CA signed certificate: using our CSR, the CA private key, the CA certificate, and the config file

With pass phrase ```12345678```.
```sh
openssl x509 -req -in angular-app-local.csr -CA localCA.pem -CAkey localCA.key -CAcreateserial \
    -out angular-app-local.crt -days 825 -sha256 -extfile angular-app-local.ext
#Signature ok
#subject=C = PT, ST = Castelo Branco, L = Fund\C3\83\C2\A3o, O = Bugs, OU = Bugs, CN = angular-app.local, emailAddress = "vagrant@angular-app.local "
#Getting CA Private Key
#Enter pass phrase for /home/vagrant/edig.leonardo/npm-usvcs/certs/localCA.key:

kubectl delete secret k3s-tls-angular-app-local
kubectl create secret tls k3s-tls-angular-app-local --namespace default --key angular-app-local.key --cert angular-app-local.crt
sleep 5

cd .
kubectl apply -f angular-app-ingress.yml
sleep 120
curl angular-app.local
curl https://angular-app.local -kv 2>&1 | grep -i issuer
#*  issuer: C=PT; ST=Castelo Branco; L=Fundão; O=CABugs; OU=Bugs; CN=ca.local; emailAddress=vagrant@ca.local
curl https://angular-app.local -v 2>&1 | grep -i issuer
#*  issuer: C=PT; ST=Castelo Branco; L=Fundão; O=CABugs; OU=Bugs; CN=ca.local; emailAddress=vagrant@ca.local
curl https://angular-app.local
```


## Setup Firefox 

 * Open Firefox
 * Goto settings
   * Privacy and security
   * Certificates
   * View certificates
   * Tab authorities
   * Import, ./certs/localCA.pem
   * Trust for: websites, email
   * OK
 * Open https://api.local
 * Open https://spa.local
 * Open https://angular-app.local
 * Open https://api.local/docs/ 

## Chromium 

 * Open Chromium
 * 3 vertical dots
   * Settings
   * Privacy and security
   * Security
   * Manage certificates
   * Tab authorities
   * Import, ./certs/localCA.pem 
   * Trust for: websites, email and software makers
   * OK 
 * Open https://api.local 
 * Open https://spa.local
 * Open https://api.local/docs/ 

# Command line k3s ingress HTTPS checks

```sh
curl https://api.local/
curl https://api.local/docs/
curl https://spa.local/
curl https://angular-app.local/
```

# Rollout, apply new image for spa

```sh
cd ./spa
nano src/App.tsx # change number after Edit 
git diff # see differences 
# build tag and push image to local docker registry
docker build -t spa-image .
docker tag spa-image localhost:5000/spa-image
docker push localhost:5000/spa-image
# deploy new image
kubectl get deployments -o wide
kubectl rollout restart deployment spa
kubectl rollout status deployment spa
sleep 120
kubectl get deployments spa -o wide 
kubectl get pods -o wide # container creating, age very small (units in seconds)
# Open https://spa.local/ to check the new text written in App.tsx
```

# Rollout, apply new image for angular-app

```sh
cd ./angular-app
nano src/App.tsx # change number after Edit 
git diff # see differences 

# build tag and push image to local docker registry
docker build -t angular-app-image .
docker tag angular-app-image localhost:5000/angular-app-image
docker push localhost:5000/angular-app-image
#alter something

docker tag angular-app-image localhost:5000/angular-app-image
docker push localhost:5000/angular-app-image
cd ../
kubectl apply -f angular-app/angular-app.yml
sleep 120


# deploy new image
kubectl get deployments -o wide
kubectl rollout restart deployment angular-app
kubectl rollout status deployment angular-app
sleep 120
kubectl get deployments angular-app -o wide 
kubectl get pods -o wide # container creating, age very small (units in seconds)

# Open https://angular-app.local/ to check the new text written in App.tsx
```
# Test add values endpoint in the api.local

Access https://api.local/docs/#/default/Add :
 * Click on "Try it out" button
 * Set two values in val1 and val2 
 * Click on "Execute" button
 * Check in MariaDB the table SumTasks that belongs to the testdb database

```sh
MARIADBPOD=$(kubectl get pods | grep mariadb | awk '//{print $1}')
echo $MARIADBPOD 
kubectl exec -it $MARIADBPOD -- bash
mysql -u userx -ppassx
# show databases;
# use testdb;
# show tables;
# \q 
exit 
```
# Add DNS servers to be used in the pods if DNS resolution fails (optional)

If by chance pods are unable to reach out to public Internet addresses maybe there is a DNS issue. We need to connect to the pod/container in k3s.

A symptom of such issue might be the failure of trying to install curl in an Alpine based pod/container:
```sh
POD=$(kubectl get pods | grep spa | awk '//{print $1}')
echo $POD
kubectl exec -it $POD -- ash
# inside the pod
apk add curl # if there is a problem it will fail 
exit
```

To add public DNS servers such as Cloudflare and Google run the following:
```sh
KUBE_EDITOR="nano" kubectl -n kube-system edit configmap coredns
```

In the line that has forward write the following:
```sh
forward . 1.1.1.1 8.8.8.8 /etc/resolv.conf 
```

Redeploy the k3s services with ```kubectl delete``` -f and ```kubectl apply -f```
