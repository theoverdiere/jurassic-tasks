DROP TABLE  IF EXISTS user_entity;

CREATE TABLE IF NOT EXISTS user_entity (
    id SERIAL PRIMARY KEY,
    birth_date DATE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);