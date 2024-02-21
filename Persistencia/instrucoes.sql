CREATE TABLE maquina(
    maquina_codigo INT NOT NULL AUTO_INCREMENT,
    maquina_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_maquina PRIMARY KEY(maquina_codigo)
);

CREATE TABLE instrucao(
    instrucao_codigo INT NOT NULL AUTO_INCREMENT,
    instrucao_descricao VARCHAR(100) NOT NULL,
    maquina_codigo INT NOT NULL,
    CONSTRAINT pk_instrucao PRIMARY KEY(instrucao_codigo),
    CONSTRAINT fk_maquina FOREIGN KEY(maquina_codigo) REFERENCES maquina(maquina_codigo)
);
