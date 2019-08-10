create database post;
use post;

create table postschema(
	id int auto_increa,
	title varchar(20) not null,
	content text not null,
	imagePath text not null,
	primary key(id)
);

create table userschema(
	email varchar(50),
	password text not null,
	primary key(email)
);