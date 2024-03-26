CREATE TABLE IF NOT EXISTS maquina (
    maquina_codigo INT NOT NULL AUTO_INCREMENT,
    maquina_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_maquina PRIMARY KEY (maquina_codigo)
);

CREATE TABLE IF NOT EXISTS instrucao (
    instrucao_codigo INT NOT NULL AUTO_INCREMENT,
    instrucao_descricao VARCHAR(100) NOT NULL,
    maquina_codigo INT NOT NULL,
    CONSTRAINT pk_instrucao PRIMARY KEY (instrucao_codigo),
    CONSTRAINT fk_maquina FOREIGN KEY (maquina_codigo) REFERENCES maquina (maquina_codigo)
);

CREATE TABLE peca (
    peca_codigo INT NOT NULL AUTO_INCREMENT,
    peca_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_peca PRIMARY KEY (peca_codigo)
);

CREATE TABLE operacao (
    operacao_codigo INT NOT NULL AUTO_INCREMENT,
    operacao_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_operacao PRIMARY KEY (operacao_codigo)
);

CREATE TABLE peca_operacao (
    peca_codigo INT NOT NULL,
    operacao_codigo INT NOT NULL,
    PRIMARY KEY (peca_codigo, operacao_codigo),
    FOREIGN KEY (peca_codigo) REFERENCES peca (peca_codigo),
    FOREIGN KEY (operacao_codigo) REFERENCES operacao (operacao_codigo)
);

CREATE TABLE maquina_operacao (
    maquina_codigo INT NOT NULL,
    operacao_codigo INT NOT NULL,
    PRIMARY KEY (maquina_codigo, operacao_codigo),
    FOREIGN KEY (maquina_codigo) REFERENCES maquina (maquina_codigo),
    FOREIGN KEY (operacao_codigo) REFERENCES operacao (operacao_codigo)
);
