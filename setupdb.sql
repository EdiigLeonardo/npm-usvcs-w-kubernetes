create database testdb;
create user 'userx'@'%' identified by 'passx';
grant all on testdb.* to  'userx'@'%';

