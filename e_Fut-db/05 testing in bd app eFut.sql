use master;


USE eFUT;

select * from LOCAIS_JOGOS
select * from jogos
select * from jogadores

-- Inserindo dados na tabela LOCAIS_JOGOS
INSERT INTO DBO.LOCAIS_JOGOS (NOME, CEP, RUA, NUMERO, BAIRRO, LOCALIZACAO, VALOR_HORA, TIPO_PAG)
VALUES 
('Arena Futebol Society', '12345-678', 'Rua dos Esportes', '123', 'Centro', 'Campo aberto com iluminação', 120.00, 'MENSALISTA'),
('Estádio Campo Grande', '98765-432', 'Avenida das Nações', '456', 'Jardim Paulista', 'Estádio coberto', 200.00, 'INDIVIDUAL'),
('Quadra Futshow', '13579-246', 'Rua da Vitória', '789', 'Vila Nova', 'Quadra com grama sintética', 150.00, 'MENSALISTA');

-- Inserindo dados na tabela JOGOS
INSERT INTO DBO.JOGOS ( DATA, HR_INI, HR_FIM, ID_LOCAL, ID_PREMIACAO, VAGAS_LINHAS, VAGAS_GOL, VAGAS_SUPLENTES)
VALUES
( '2024-11-10', '18:00', '20:00', 1, NULL, 16, 3, 4),
( '2024-11-11', '19:30', '21:30', 2, NULL, 14, 2, 4),
( '2024-11-12', '17:00', '19:00', 3, NULL, 16, 3, 5);

-- Inserir dados fictícios na tabela dbo.jogadores
INSERT INTO dbo.jogadores (STATUS_JOGADOR, FREQUENCIA, NOME, APELIDO, WHATS, SENHA,user_adm) VALUES
('Ativo', 0, 'Denyson', 'Denilsu', 67993464728, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',1),
('Ativo', 0, 'Rudney', 'Didu', 6799010002, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
('Ativo', 0, 'Edylson', 'Dr', 999010003, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
('Ativo', 0, 'Alessandro', 'Psico', 999010004, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
('Ativo', 0, 'Flavio', 'Paraguai', 999010005, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
('Ativo', 0, 'Leonardo', 'Léo', 999010006, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
('Ativo', 0, 'Humberto', 'HL', 999010007, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
('Ativo', 0, 'Odaide', '', 999010008, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
('Ativo', 0, 'Robson', '', 999010009, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
( 'Ativo', 0, 'Rodrigo', '', 999010010, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
( 'Ativo', 0, 'Peterson', '', 999010011, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
( 'Ativo', 0, 'Rodrigo', 'ISS', 999010012, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
( 'Ativo', 0, 'Mateus', 'Mita', 999010013, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
( 'Ativo', 0, 'Vini', '', 999010014, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
( 'Ativo', 0, 'Leandro', '', 999010015, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
( 'Ativo', 0, 'Convidado', '', 0, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
('Ativo', 0, 'Willyan', 'Wil', 999010017, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0),
('Ativo', 0, 'Cyrino', 'Cyr', 999010018, '$2a$10$3R664XXl41SfnR5CTX6qv.iXbh1QaC6V7jKqaBRvjUW/aJMfX1CV2',0)





-- Definindo o ID do jogo
DECLARE @idJogo INT = 1;
DECLARE @InsertOuDelete BIT = 1;  -- 1 para inserir

--Jogadores de linha
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 67993464728, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 6799010002, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010003, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010004, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010005, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010006, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010007, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010008, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010009, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010010, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010011, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010012, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010013, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010014, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010015, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 0, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
-- Goleiros
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010017, @goleiroOuLinha = 'Goleiro', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010018, @goleiroOuLinha = 'Goleiro', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
--Suplentes
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 0, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 0, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 0, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 0, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;




-- Remoção de alguns jogadores
DECLARE @idJogo INT = 2;
DECLARE @InsertOuDelete BIT
SET @InsertOuDelete = 0;  -- 0 para remover
-- Remove o jogador "Vini"
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 6799010002, @goleiroOuLinha = 'Linha', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;
-- Remove o jogador "Davids"
EXEC dbo.ADICIONAR_REMOVER_JOGADOR @whats = 999010005, @goleiroOuLinha = 'LINHA', @idJogo = @idJogo, @InsertOuDelete = @InsertOuDelete;


use eFUT

-- Consulta a lista
EXEC DBO.CONSULTA_LISTA_JOGO @IDJOGO = 2

-- Consulta a lista após as remoções
EXEC dbo.HISTORICO_JOGO_ATUAL @IDJOGO =2 --	ainda esta errado

EXEC dbo.LIMPA_LISTA @IDJOGO = 2

EXEC dbo.GERARTAMPINHAS @GOLEIROENTRA = 1, @CORES = 'Amarelo;Preto;Verde' , @IDJOGO =1

exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 1, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 2, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 3, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 4, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 5, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 6, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 7, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 8, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 9, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 10, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 11, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 12, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 13, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 14, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 15, @IDJOGO=1
exec dbo.REALIZARSORTEIOTAMPINHA @IDJOGADOR = 16, @IDJOGO=1

SELECT * FROM TAMPINHAS order by 2,6

EXEC dbo.DELETA_LISTA_TAMPINHAS @IDJOGO = 1

SELECT * FROM LISTA_JOGOS

EXEC dbo.ALTERA_LISTA_TAMPINHAS @ID_JOGADOR = 1 ,@NEW_JOGADOR = 5, @ID_JOGO =1



exec dbo.create_user @NOME,@APELIDO,@WHATS,@SENHA

SELECT * FROM dbo.JOGADORES WHERE WHATS = '67993464728'

update JOGADORES
set user_adm= null
WHERE ID_JOGADOR=58

delete JOGADORES
where ID_JOGADOR = 58


exec sp_executesql @statement=N'SELECT * FROM dbo.JOGADORES WHERE WHATS = ''67993464728'''

EXEC dbo.READ_USER @WHATS = '67993464728'

exec sp_executesql @statement=N'SELECT * FROM dbo.JOGADORES WHERE WHATS = ''67993464728'''


UPDATE JOGADORES
SET APELIDO = NULL
WHERE APELIDO = ''





exec dbo.ADICIONAR_JOGADOR @whats= '999010004' ,@goleiroOuLinha = 'Linha', @idJogo=2

use eFUT
exec dbo.REMOVER_JOGADOR @whats = '67993464728', @idjogo = 2

select * from LISTA_JOGOS


select * from JOGADORES