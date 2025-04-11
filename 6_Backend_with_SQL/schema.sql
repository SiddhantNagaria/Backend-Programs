create table users(
    id varchar(50) primary key,
    username varchar(50) unique,
    email varchar(50) unique not null,
    password VARCHAR(50) not null
);