

--USE eFut;
--GO


--CREATE OR ALTER PROCEDURE dbo.ADICIONAR_REMOVER_JOGADOR
--    @whats NVARCHAR(20),
--    @goleiroOuLinha NVARCHAR(10),
--    @idJogo INT,
--    @InsertOuDelete BIT  
--AS
--BEGIN
--	SET NOCOUNT ON;

--    DECLARE @idJogador INT;
--    DECLARE @vagasGoleiros INT;
--    DECLARE @vagasLinhas INT;
--    DECLARE @vagasSuplentes INT;
--    DECLARE @totalGoleiros INT;
--    DECLARE @totalLinhas INT;
--    DECLARE @totalSuplentes INT;

   
--    SELECT @idJogador = id_jogador
--    FROM dbo.jogadores
--    WHERE whats = @whats;

    
--    SELECT @vagasGoleiros = vagas_gol, 
--           @vagasLinhas = vagas_linhas, 
--           @vagasSuplentes = vagas_suplentes
--    FROM dbo.jogos
--    WHERE id_jogo = @idJogo;

    
--    SELECT @totalGoleiros = COUNT(*)
--    FROM dbo.LISTA_JOGOS
--    WHERE id_jogo = @idJogo AND TIPO_JOGADOR = 'Goleiro';

--    SELECT @totalLinhas = COUNT(*)
--    FROM dbo.LISTA_JOGOS
--    WHERE id_jogo = @idJogo AND TIPO_JOGADOR = 'Linha';

--    SELECT @totalSuplentes = COUNT(*)
--    FROM dbo.LISTA_JOGOS
--    WHERE id_jogo = @idJogo AND TIPO_JOGADOR = 'Linha' AND POSICAO_LISTA > 16;

--    IF @InsertOuDelete = 1  
--    BEGIN
--        DECLARE @novaPosicao INT;

        
--        IF @goleiroOuLinha = 'Goleiro' AND @totalGoleiros < @vagasGoleiros
--        BEGIN
--            SET @novaPosicao = @totalGoleiros + 1;
--            INSERT INTO dbo.LISTA_JOGOS (ID_JOGO, ID_JOGADOR, TIPO_JOGADOR, POSICAO_LISTA)
--            VALUES (@idJogo, @idJogador, 'Goleiro', @novaPosicao);

--			INSERT INTO dbo.REGISTROS_JOGADORES (ID_JOGO , ID_JOGADOR , TIPO_JOGADOR, POSICAO_LISTA , ACAO )
--			VALUES (@idJogo, @idJogador, 'Goleiro', @novaPosicao,'INSERIDO');

--        END
--        ELSE IF @goleiroOuLinha = 'Linha' AND @totalLinhas < @vagasLinhas
--        BEGIN
--            SET @novaPosicao = @totalLinhas + 1;
--            INSERT INTO dbo.LISTA_JOGOS (ID_JOGO, ID_JOGADOR, TIPO_JOGADOR, POSICAO_LISTA)
--            VALUES (@idJogo, @idJogador, 'Linha', @novaPosicao);

--			INSERT INTO dbo.REGISTROS_JOGADORES (ID_JOGO , ID_JOGADOR , TIPO_JOGADOR, POSICAO_LISTA , ACAO )
--			VALUES (@idJogo, @idJogador, 'Linha', @novaPosicao,'INSERIDO');

--        END
--        ELSE IF @totalSuplentes < @vagasSuplentes
--        BEGIN
--            SET @novaPosicao = @totalLinhas + 1;
--            INSERT INTO dbo.LISTA_JOGOS (ID_JOGO, ID_JOGADOR, TIPO_JOGADOR, POSICAO_LISTA)
--            VALUES (@idJogo, @idJogador, 'Linha', @novaPosicao);

--			INSERT INTO dbo.REGISTROS_JOGADORES (ID_JOGO , ID_JOGADOR , TIPO_JOGADOR, POSICAO_LISTA , ACAO )
--			VALUES (@idJogo, @idJogador, 'Linha', @novaPosicao,'INSERIDO');

--        END
--        ELSE
--        BEGIN
--            RAISERROR('Não há vagas disponíveis para o tipo de jogador selecionado.', 16, 1);
--        END
--    END
--    ELSE  
--    BEGIN
--        DECLARE @posicaoRemovida INT;
--		DECLARE @TIPO_JOGADOR_REMOVIDO VARCHAR(10);

--        SELECT @TIPO_JOGADOR_REMOVIDO = TIPO_JOGADOR
--        FROM dbo.LISTA_JOGOS
--        WHERE id_jogo = @idJogo AND id_jogador = @idJogador;
  
--        SELECT @posicaoRemovida = posicao_lista
--        FROM dbo.LISTA_JOGOS

--        WHERE id_jogo = @idJogo AND id_jogador = @idJogador;
		
--		INSERT INTO dbo.REGISTROS_JOGADORES (ID_JOGO , ID_JOGADOR , POSICAO_LISTA , TIPO_JOGADOR,  ACAO )
--		VALUES (@idJogo, @idJogador, @posicaoRemovida, @TIPO_JOGADOR_REMOVIDO, 'RETIRADO');
        
--        DELETE FROM dbo.LISTA_JOGOS
--        WHERE id_jogo = @idJogo AND id_jogador = @idJogador;
        
--        UPDATE dbo.LISTA_JOGOS
--        SET posicao_lista = posicao_lista - 1
--        WHERE id_jogo = @idJogo AND posicao_lista > @posicaoRemovida;
--    END
--END;
--GO



USE eFut;
GO

CREATE OR ALTER PROCEDURE dbo.ADICIONAR_JOGADOR
    @whats NVARCHAR(20),
    @goleiroOuLinha NVARCHAR(10),
    @idJogo INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @idJogador INT;
    DECLARE @vagasGoleiros INT;
    DECLARE @vagasLinhas INT;
    DECLARE @vagasSuplentes INT;
    DECLARE @totalGoleiros INT;
    DECLARE @totalLinhas INT;
    DECLARE @totalSuplentes INT;
    DECLARE @novaPosicao INT;

    -- Obter o ID do jogador
    SELECT @idJogador = id_jogador
    FROM dbo.jogadores
    WHERE whats = @whats;

    -- Verificar se o jogador já está na lista
    IF EXISTS (SELECT 1 FROM dbo.LISTA_JOGOS WHERE id_jogo = @idJogo AND id_jogador = @idJogador)
    BEGIN
        RAISERROR('O jogador já está na lista.', 16, 1);
        RETURN;
    END

    -- Obter as vagas disponíveis no jogo
    SELECT @vagasGoleiros = vagas_gol, 
           @vagasLinhas = vagas_linhas, 
           @vagasSuplentes = vagas_suplentes
    FROM dbo.jogos
    WHERE id_jogo = @idJogo;

    -- Contar o número de jogadores atuais
    SELECT @totalGoleiros = COUNT(*)
    FROM dbo.LISTA_JOGOS
    WHERE id_jogo = @idJogo AND TIPO_JOGADOR = 'Goleiro';

    SELECT @totalLinhas = COUNT(*)
    FROM dbo.LISTA_JOGOS
    WHERE id_jogo = @idJogo AND TIPO_JOGADOR = 'Linha';

    SELECT @totalSuplentes = COUNT(*)
    FROM dbo.LISTA_JOGOS
    WHERE id_jogo = @idJogo AND TIPO_JOGADOR = 'Linha' AND POSICAO_LISTA > 16;

    -- Inserir jogador
    IF @goleiroOuLinha = 'Goleiro' AND @totalGoleiros < @vagasGoleiros
    BEGIN
        SET @novaPosicao = @totalGoleiros + 1;
        INSERT INTO dbo.LISTA_JOGOS (ID_JOGO, ID_JOGADOR, TIPO_JOGADOR, POSICAO_LISTA)
        VALUES (@idJogo, @idJogador, 'Goleiro', @novaPosicao);

        INSERT INTO dbo.REGISTROS_JOGADORES (ID_JOGO, ID_JOGADOR, TIPO_JOGADOR, POSICAO_LISTA, ACAO)
        VALUES (@idJogo, @idJogador, 'Goleiro', @novaPosicao, 'INSERIDO');
    END
    ELSE IF @goleiroOuLinha = 'Linha' AND @totalLinhas < @vagasLinhas
    BEGIN
        SET @novaPosicao = @totalLinhas + 1;
        INSERT INTO dbo.LISTA_JOGOS (ID_JOGO, ID_JOGADOR, TIPO_JOGADOR, POSICAO_LISTA)
        VALUES (@idJogo, @idJogador, 'Linha', @novaPosicao);

        INSERT INTO dbo.REGISTROS_JOGADORES (ID_JOGO, ID_JOGADOR, TIPO_JOGADOR, POSICAO_LISTA, ACAO)
        VALUES (@idJogo, @idJogador, 'Linha', @novaPosicao, 'INSERIDO');
    END
    ELSE IF @totalSuplentes < @vagasSuplentes
    BEGIN
        SET @novaPosicao = @totalLinhas + 1;
        INSERT INTO dbo.LISTA_JOGOS (ID_JOGO, ID_JOGADOR, TIPO_JOGADOR, POSICAO_LISTA)
        VALUES (@idJogo, @idJogador, 'Linha', @novaPosicao);

        INSERT INTO dbo.REGISTROS_JOGADORES (ID_JOGO, ID_JOGADOR, TIPO_JOGADOR, POSICAO_LISTA, ACAO)
        VALUES (@idJogo, @idJogador, 'Linha', @novaPosicao, 'INSERIDO');
    END
    ELSE
    BEGIN
        RAISERROR('Não há vagas disponíveis para o tipo de jogador selecionado.', 16, 1);
    END
END;
GO


USE eFut;
GO

CREATE OR ALTER PROCEDURE dbo.REMOVER_JOGADOR
    @whats NVARCHAR(20),
    @idJogo INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @idJogador INT;
    DECLARE @posicaoRemovida INT;
    DECLARE @TIPO_JOGADOR_REMOVIDO NVARCHAR(10);

    -- Obter o ID do jogador
    SELECT @idJogador = id_jogador
    FROM dbo.jogadores
    WHERE whats = @whats;

    -- Obter o tipo de jogador removido e a posição
    SELECT @TIPO_JOGADOR_REMOVIDO = TIPO_JOGADOR, @posicaoRemovida = POSICAO_LISTA
    FROM dbo.LISTA_JOGOS
    WHERE id_jogo = @idJogo AND id_jogador = @idJogador;

    -- Registrar a remoção
    INSERT INTO dbo.REGISTROS_JOGADORES (ID_JOGO, ID_JOGADOR, POSICAO_LISTA, TIPO_JOGADOR, ACAO)
    VALUES (@idJogo, @idJogador, @posicaoRemovida, @TIPO_JOGADOR_REMOVIDO, 'RETIRADO');
    
    -- Remover jogador da lista
    DELETE FROM dbo.LISTA_JOGOS
    WHERE id_jogo = @idJogo AND id_jogador = @idJogador;
    
    -- Atualizar posições na lista
    UPDATE dbo.LISTA_JOGOS
    SET posicao_lista = posicao_lista - 1
    WHERE id_jogo = @idJogo AND posicao_lista > @posicaoRemovida;
END;
GO


USE eFut;
GO



CREATE OR ALTER PROCEDURE dbo.CONSULTA_LISTA_JOGO 
    @IDJOGO INT
AS
BEGIN

	SET NOCOUNT ON;
	
	SELECT 
		LJ.POSICAO_LISTA as 'Vaga',
		LJ.ID_JOGO,
		J.ID_JOGADOR,
		ISNULL(J.APELIDO,J.NOME) AS 'Goleiros',
		LJ.DATA_HORA_REGISTRO AS 'Data e Hora da Endrada',
		ISNULL(T.COR,'S/ Time') AS 'Time'
	FROM dbo.LISTA_JOGOS LJ
		LEFT JOIN dbo.JOGADORES J
			ON LJ.ID_JOGADOR = J.ID_JOGADOR
		LEFT JOIN dbo.TAMPINHAS T
			ON LJ.ID_JOGADOR = T.ID_JOGADOR
	WHERE LJ.TIPO_JOGADOR = 'Goleiro'
		and LJ.ID_JOGO = @IDJOGO
		and LJ.POSICAO_LISTA between 1 and 4
	ORDER BY 1;
		

	SELECT 
		LJ.POSICAO_LISTA as 'Vaga',
		LJ.ID_JOGO,
		J.ID_JOGADOR,
		ISNULL(J.APELIDO,J.NOME) AS 'JogadoresLinha',
		LJ.DATA_HORA_REGISTRO AS 'Data e Hora da Endrada',
		ISNULL(T.COR,'S/ Time') AS 'Time'
	FROM dbo.LISTA_JOGOS LJ
		LEFT JOIN dbo.JOGADORES J
			ON LJ.ID_JOGADOR = J.ID_JOGADOR
		LEFT JOIN dbo.TAMPINHAS T
			ON LJ.ID_JOGADOR = T.ID_JOGADOR
	WHERE LJ.TIPO_JOGADOR = 'Linha'
		and LJ.ID_JOGO = @IDJOGO
		and LJ.POSICAO_LISTA between 1 and 16
	ORDER BY 1;

	SELECT 
		LJ.POSICAO_LISTA as 'Vaga',
		LJ.ID_JOGO,
		J.ID_JOGADOR,
		ISNULL(J.APELIDO,J.NOME) AS 'Suplentes',
		LJ.DATA_HORA_REGISTRO AS 'Data e Hora da Endrada'
		--ISNULL(T.COR,'Não Sorteado') AS 'Time'
	FROM dbo.LISTA_JOGOS LJ
		LEFT JOIN dbo.JOGADORES J
			ON LJ.ID_JOGADOR = J.ID_JOGADOR
	WHERE LJ.TIPO_JOGADOR = 'Linha'
		and LJ.ID_JOGO = @IDJOGO
		and LJ.POSICAO_LISTA between 17 and 20
	ORDER BY 1;

END;
GO

USE eFut;
GO


CREATE OR ALTER PROCEDURE dbo.HISTORICO_JOGO_ATUAL
	@IDJOGO INT
AS
BEGIN
	SET NOCOUNT ON;
	
	SELECT 
		LJ.POSICAO_LISTA as 'Posição na Lista',
		RJ.TIPO_JOGADOR AS 'Tipo',
		ISNULL(J.APELIDO,J.NOME) AS 'Nome',
		RJ.DATA_HORA_REGISTRO AS 'Data e Hora de Registro',
		RJ.ACAO AS 'Ação'
	FROM dbo.REGISTROS_JOGADORES RJ
		LEFT JOIN dbo.JOGADORES J
			ON RJ.ID_JOGADOR = J.ID_JOGADOR
		RIGHT JOIN dbo.LISTA_JOGOS LJ
			ON RJ.ID_JOGO = LJ.ID_JOGO
		AND RJ.POSICAO_LISTA = LJ.POSICAO_LISTA
	WHERE LJ.ID_JOGO = @IDJOGO
	ORDER BY RJ.DATA_HORA_REGISTRO;
END;
GO


USE eFut;
GO

CREATE OR ALTER PROCEDURE dbo.LIMPA_LISTA
	@IDJOGO INT
AS
BEGIN
	SET NOCOUNT ON;

	DELETE LISTA_JOGOS
	WHERE ID_JOGO = @IDJOGO;
END;
GO

CREATE OR ALTER PROCEDURE dbo.GERARTAMPINHAS 
    @GOLEIROENTRA BIT,
    @CORES NVARCHAR(100),
    @IDJOGO INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificação de entrada
    IF NOT EXISTS (SELECT 1 FROM dbo.JOGOS WHERE ID_JOGO = @IDJOGO)
    BEGIN
        RAISERROR('Jogo não encontrado.', 16, 1);
        RETURN;
    END

    -- Inicialização e uso de variáveis
    DECLARE @NUMTAMPINHAS INT;
    SET @NUMTAMPINHAS = 
        (SELECT VALOR_REGRA 
         FROM dbo.REGRAS_APP 
         WHERE DESCRICAO = 'JOGADORES_POR_TIME') - IIF(@GOLEIROENTRA = 0, 1, 0);

    -- Validação de cores
    IF LEN(@CORES) = 0
    BEGIN
        RAISERROR('Lista de cores inválida.', 16, 1);
        RETURN;
    END

    -- Inserção com controle de erros
    BEGIN TRY
        DECLARE @COR NVARCHAR(20);
        DECLARE @COLORS TABLE (COR NVARCHAR(20));

        INSERT INTO @COLORS (COR)
        SELECT VALUE 
        FROM STRING_SPLIT(@CORES, ';');

        IF NOT EXISTS (SELECT 1 FROM @COLORS)
        BEGIN
            RAISERROR('Nenhuma cor foi processada.', 16, 1);
            RETURN;
        END

        DECLARE @I INT = 1;
        WHILE @I <= @NUMTAMPINHAS
        BEGIN
            INSERT INTO dbo.TAMPINHAS (COR, ID_JOGO, DATA_HORA_GERAR, GOLEIRO_ENTRA)
            SELECT COR, @IDJOGO, GETDATE(), @GOLEIROENTRA
            FROM @COLORS;

            SET @I += 1;
        END
    END TRY
    BEGIN CATCH
        -- Captura da mensagem de erro
        DECLARE @ErrorMessage NVARCHAR(4000);
        SET @ErrorMessage = ERROR_MESSAGE();

        -- Lançamento do erro com a mensagem capturada
        RAISERROR('Erro ao gerar tampinhas: %s', 16, 1, @ErrorMessage);
    END CATCH
END;
GO

USE eFut;
GO

CREATE OR ALTER PROCEDURE dbo.REALIZARSORTEIOTAMPINHA 
    @IDJOGADOR INT,
    @IDJOGO INT
AS
BEGIN
	
	SET NOCOUNT ON;

    -- Verifica se o jogador já realizou o sorteio neste jogo
    IF EXISTS (
        SELECT 1
        FROM dbo.TAMPINHAS
        WHERE ID_JOGO = @IDJOGO AND ID_JOGADOR = @IDJOGADOR
    )
    BEGIN
        -- O jogador já realizou o sorteio; encerra a procedure
        PRINT 'O jogador já realizou um sorteio para este jogo.';
        RETURN;
    END

    -- Declara a variável para armazenar a tampinha sorteada
    DECLARE @TAMPINHAID INT;

    -- Seleciona uma tampinha disponível aleatoriamente
    SELECT TOP 1 @TAMPINHAID = ID_TAMPINHA 
    FROM DBO.TAMPINHAS 
    WHERE ID_JOGO = @IDJOGO AND ID_JOGADOR IS NULL
    ORDER BY NEWID();

    -- Atualiza a tampinha sorteada com o jogador
    IF @TAMPINHAID IS NOT NULL
    BEGIN
        UPDATE dbo.TAMPINHAS
        SET ID_JOGADOR = @IDJOGADOR
        WHERE ID_TAMPINHA = @TAMPINHAID;

        PRINT 'Sorteio realizado com sucesso.';
    END
    ELSE
    BEGIN
        PRINT 'Não há tampinhas disponíveis para sorteio neste jogo.';
    END
END;
GO


USE eFut;
GO

CREATE OR ALTER PROCEDURE dbo.DELETA_LISTA_TAMPINHAS
	@IDJOGO INT
AS
BEGIN
	SET NOCOUNT ON;

	DELETE dbo.TAMPINHAS
	WHERE ID_JOGO = @IDJOGO
END;
GO




CREATE OR ALTER PROCEDURE dbo.ALTERA_LISTA_TAMPINHAS
	@ID_JOGADOR INT,
	@NEW_JOGADOR INT,
	@ID_JOGO INT
AS
BEGIN
	
	SET NOCOUNT ON;

	UPDATE dbo.TAMPINHAS
	SET ID_JOGADOR = @NEW_JOGADOR
	WHERE ID_JOGO = @ID_JOGO
	AND ID_JOGADOR = @ID_JOGADOR
END;
GO


CREATE OR ALTER PROCEDURE dbo.UPDATE_LOCAIS_LOGOS
    @CAMPO_ALTERADO VARCHAR(100),
    @VALOR_ALTERADO VARCHAR(100),
    @ID_LOCAL INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @SQL NVARCHAR(MAX) = N'UPDATE LOCAIS_JOGOS ';

    IF @CAMPO_ALTERADO = 'VALOR_HORA'
    BEGIN
        SET @SQL += N' SET ' + @CAMPO_ALTERADO + N' = CAST(@VALOR_ALTERADO AS MONEY) WHERE ID_LOCAL = @ID_LOCAL;';
    END
    ELSE
    BEGIN
        SET @SQL += N' SET ' + @CAMPO_ALTERADO + N' = @VALOR_ALTERADO WHERE ID_LOCAL = @ID_LOCAL;';
    END

    -- Executa a consulta dinâmica com parâmetros
    EXEC sp_executesql @SQL,
        N'@VALOR_ALTERADO VARCHAR(100), @ID_LOCAL INT',
        @VALOR_ALTERADO = @VALOR_ALTERADO,
        @ID_LOCAL = @ID_LOCAL;
END;
GO




USE eFut;
GO

CREATE OR ALTER PROCEDURE dbo.CREATE_USER

	@NOME VARCHAR(50),
	@APELIDO VARCHAR(50), 
	@WHATS INT,
	@SENHA NVARCHAR(255)

AS
BEGIN
	BEGIN TRY

	INSERT INTO dbo.jogadores (STATUS_JOGADOR, FREQUENCIA, NOME, APELIDO, WHATS, SENHA) VALUES
	('Ativo', 0, @NOME, @APELIDO, @WHATS, @SENHA);

	END TRY

	BEGIN CATCH
		
		PRINT 'Ocorreu um erro!';
		PRINT 'Código do erro: ' + CAST(ERROR_NUMBER() AS VARCHAR);
		PRINT 'Mensagem: ' + ERROR_MESSAGE();

		INSERT INTO Log_Erros (NumeroErro, MensagemErro, LinhaErro, NomeProcedure)
        VALUES (ERROR_NUMBER(), ERROR_MESSAGE(), ERROR_LINE(), ERROR_PROCEDURE());

	END CATCH;

END;

GO

CREATE OR ALTER PROCEDURE dbo.READ_USER

	@WHATS VARCHAR(11)

AS
BEGIN
	BEGIN TRY

	SELECT * 
	FROM dbo.JOGADORES 
	WHERE WHATS = @WHATS

	END TRY

	BEGIN CATCH
		
		PRINT 'Ocorreu um erro!';
		PRINT 'Código do erro: ' + CAST(ERROR_NUMBER() AS VARCHAR);
		PRINT 'Mensagem: ' + ERROR_MESSAGE();

		INSERT INTO Log_Erros (NumeroErro, MensagemErro, LinhaErro, NomeProcedure)
        VALUES (ERROR_NUMBER(), ERROR_MESSAGE(), ERROR_LINE(), ERROR_PROCEDURE());

	END CATCH;

END;