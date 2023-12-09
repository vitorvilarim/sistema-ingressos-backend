CREATE DATABASE ingressos;


CREATE TABLE eventos(
id serial PRIMARY KEY,
nome text NOT NULL,
descricao text NOT NULL
);

CREATE TABLE horario_eventos (
id serial PRIMARY KEY,
horario_evento text NOT NULL,
evento_id integer REFERENCES eventos(id)
);

