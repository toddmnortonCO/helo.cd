create table helo_users (
    user_id serial primary key,
    username varchar(20),
    password varchar(20),
    profile_pic TEXT
)

create table posts (
    user_id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id int REFERENCES helo_users(id)
)