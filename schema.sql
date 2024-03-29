CREATE DATABASE ingressos;


CREATE TABLE eventos(
id serial PRIMARY KEY,
nome text NOT NULL,
descricao text NOT NULL,
preco text
);

CREATE TABLE horario_eventos (
id serial PRIMARY KEY,
horario_evento text NOT NULL,
evento_id integer REFERENCES eventos(id)
);

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL, 
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE vendas(
id SERIAL PRIMARY KEY,
usuario_id int REFERENCES usuarios(id),
evento_id int REFERENCES eventos(id),
quantidade text, 
transacao_id text
);



INSERT INTO eventos (nome, descricao) VALUES 
('Stand-Up', 'Show de cómedia para fazer você rir com piadas de gosto duvidoso'),
('Apresentação Teatro', 'Grupo de dança que irá entreter sua noite'),
('Musical', 'Fãs de High School Musical irão apresentar um cover da saga'),
('Filme', 'A volta dos que não foram');
