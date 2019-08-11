create database post;
use post;

create table userschema(
	email varchar(50),
	password text not null,
	primary key(email)
);

create table postschema(
	id int AUTO_INCREMENT,
	title varchar(20) not null,
	content text not null,
	imagePath text not null,
	creator varchar(50) not null,
	primary key(id)
);