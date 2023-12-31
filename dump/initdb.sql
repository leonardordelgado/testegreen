CREATE DATABASE GreenDB;
USE GreenDB;

CREATE TABLE lotes (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100),
	ativo BOOLEAN,
	criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE boletos (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome_sacado VARCHAR(255),
	id_lote INT NOT NULL,
	`valor` DECIMAL(10, 2),
	linha_digitavel VARCHAR(255),
	ativo BOOLEAN,
	criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_lote) REFERENCES lotes(id)
);
INSERT INTO lotes (nome, ativo) VALUES ('0017', true);
INSERT INTO lotes (nome, ativo) VALUES ('0018', true);
INSERT INTO lotes (nome, ativo) VALUES ('0019', true);
