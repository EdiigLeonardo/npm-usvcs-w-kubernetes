# Create a page in Debian explore folder
- Open caja
- Click in rightClick of you mouse and create a folder "testRestApi";
# Setup database
Setup a MariaDB database with user userx and password passx
  - ###### Alerts:
      No maria db server should be running inside the virtual machine;

      To check the DB instance running use (should appear mariadb listening on port 3306):
        ```sh
        docker ps
        ```
      # Stop database
        ```sh
        sh mariadb_stop.sh
        ```
```sh
sh mariadb_start.sh
```

# Build and run REST API
```sh
sh launch.sh 
```

Listens on port 3000
OpenAPI/Swagger available in http://localhost:3000/docs/

# Run the project

```sh
npm install
npm start
```

## curl calls
```sh
curl -X 'GET' 'http://localhost:3000/'
curl -X 'POST' 'http://localhost:3000/npm' -H 'accept: application/json' -H 'Content-Type: application/json' -d '{"url": "string25","res": "string48"}'
curl -X 'GET' 'http://localhost:3000/npm/1'-H 'accept: application/json'
curl -X 'GET' 'http://localhost:3000/packageInfo' -H 'accept: application/json'
curl -X 'GET' 'http://localhost:3000/packageInfo/axios' -H 'accept: application/json'
curl -X 'GET' 'http://localhost:3000/packageInfo/rxjs' -H 'accept: application/json'
curl -X 'GET' 'http://localhost:3000/docs/packageInfo/search/axios' -H 'accept: application/json'
curl -X 'GET' 'http://localhost:3000/docs/packageInfo/search/rxjs' -H 'accept: application/json'
```

## Unit tests
```sh
npm test
```

### Test Infos
  #### for Endpoints
    - Test for /packageInfo expect contain a response with "couch_bt_engine" inside;
    - Test for /packageInfo/axios expect contain a response with "Promise based HTTP client for the browser and node.js" inside;
    - Test for /packageInfo/search/axios expect contain a response with "Matt Zabriskie" inside;

## Coverage
```sh
npm run coverage
```

Check URL file:///home/vagrant/testRestApi/edig.leonardo/rest-api/coverage/index.html to see the coverage

## Access MariaDB
### mysql/mariadb command 
To access MariaDB directly the command mysql inside the MariaDB container might be used
```sh
docker exec -it mariadb sh
mysql -ppassx # connect using user userx and password passx
mariadb -ppassx # connect using user userx and password passx
show databases;
use testdb;
show tables;
select * from NpmRes;
describe NpmRes;
exit
exit
```

### Plugin MySQL Shell for VS Code
To access MariaDB the VSCode plugin might be used. 
Install the extension [MySQL Shell for VS Code v1.8.1](https://marketplace.visualstudio.com/_apis/public/gallery/publishers/Oracle/vsextensions/mysql-shell-for-vs-code/1.8.1/vspackage?targetPlatform=linux-x64)

Click on ```Extensions``` in VS Code, click on ```...``` and then click on ```Install from VSIX```.

Install the certificate with install.sh (will appear a pop up window). 
```sh
/home/vagrant/.mysqlsh-gui/plugin_data/gui_plugin/web_certs/install.sh
```
After it is installed click on the MySQL icon and add a new DB connection with user userx and password passx. 

The DB testdb and table SumTasks should appear after the REST API is launched and after some tasks are created via curl. 

#intall proxy-http:

### Run in VSCODE SHELL

```sh

 npm i --save-dev @types/http-proxy 

 ```

## Endpoints Infos
  ### MariaDb EndPoints:
  - /npm/{id} - get: provide for us a data in db: testdb, table: NpmRes with id = id;
  - /npm - post: Insert in a table 2 values (url,res) and returns 201 if works or error if dont work;

  ### ProxyEndPoints:
  - /packageInfo - get: return a data from a response of https://registry.npmjs.org/ ;
  - /packageInfo/{value} - get: return a data from a response of https://registry.npmjs.org/value ;
  - /packageInfo/search/{searchText} - get: return a data from a response of https://registry.npmjs.org/-/v1/search?text=${searchText} ;




 

