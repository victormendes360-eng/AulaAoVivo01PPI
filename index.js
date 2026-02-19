import express from 'express';

const host = '0.0.0.0';
const porta = 3001;

const server = express();

server.get('/', (req, res) => {

    // Captura os parâmetros da URL
    const { matricula, idade, sexo, salariobase, anocontratacao } = req.query;

    // Conversão para números
    const matriculaNum = parseInt(matricula);
    const idadeNum = parseInt(idade);
    const sexoNum = parseInt(sexo); // 1 = Masculino, 2 = Feminino
    const salarioBaseNum = parseFloat(salariobase);
    const anoContratacaoNum = parseInt(anocontratacao);
    const anoAtual = new Date().getFullYear();

    // Validação básica dos dados
    if (!matriculaNum || idadeNum < 16 || (sexoNum !== 1 && sexoNum !== 2) || !salarioBaseNum ||anoContratacaoNum < 1960  ) 
        {
        return res.send(`
            <h1>Dados Inválidos</h1>
            <p>
                A idade deve ser maior que 16 anos.<br>
                O salário base deve ser válido.<br>
                O ano de contratação deve ser maior que 1960.<br>
                Sexo deve ser 1 (Masculino) ou 2 (Feminino).<br>
                Matrícula deve ser maior que zero.
            </p>
            <p>Exemplo de URL válida:<br>
            <code>http://localhost:3000/?matricula=123&idade=30&sexo=1&salariobase=2000&anocontratacao=2015</code></p>
              `);

    }

    const tempoEmpresa = anoAtual - anoContratacaoNum;

    //  REAJUSTE 
    let reajuste = 0;
    if (idadeNum >= 16 && idadeNum <= 39) {
        reajuste = (sexoNum === 1) ? 0.10 : 0.08;
    } else if (idadeNum >= 40 && idadeNum <= 69) {
        reajuste = (sexoNum === 1) ? 0.08 : 0.10;
    } else {
        reajuste = (sexoNum === 1) ? 0.15 : 0.17;
    }

    // DESCONTO OU ACRÉSCIMO 
    let descontoouacrescimo = 0;

    if (tempoEmpresa <= 10) {
        if (idadeNum >= 16 && idadeNum <= 39) {
            descontoouacrescimo = (sexoNum === 1) ? -10 : -11;
        } else if (idadeNum >= 40 && idadeNum <= 69) {
            descontoouacrescimo = (sexoNum === 1) ? -5 : -7;
        } else {
            descontoouacrescimo = (sexoNum === 1) ? -15 : -17;
        }
    } else {
        if (idadeNum >= 16 && idadeNum <= 39) {
            descontoouacrescimo = (sexoNum === 1) ? 17 : 16;
        } else if (idadeNum >= 40 && idadeNum <= 69) {
            descontoouacrescimo = (sexoNum === 1) ? 15 : 14;
        } else {
            descontoouacrescimo = (sexoNum === 1) ? 13 : 12;
        }
    }

    //  CÁLCULO DO NOVO SALÁRIO 
    const novoSalario = salarioBaseNum + (salarioBaseNum * reajuste) + descontoouacrescimo;

    //  RETORNO HTML 
    res.send(`
        <h2>--- Dados do Funcionário ---</h2>
        Matrícula: ${matriculaNum} <br>
        Idade: ${idadeNum} <br>
        Sexo: ${sexoNum === 1 ? "Masculino" : "Feminino"} <br>
        Salário Base: R$ ${salarioBaseNum.toFixed(2)} <br>
        Tempo de Empresa: ${tempoEmpresa} anos <br>
        <h1>Novo Salário: R$ ${novoSalario.toFixed(2)}</h1>
    `);

});

// Rota de teste de horário
server.get('/horaAtual', (req, res) => {
    const horaAtual = new Date();
    const hora = `${horaAtual.getHours()}:${horaAtual.getMinutes()}:${horaAtual.getSeconds()}`;
    res.send(`
        <h1>Agora são ${hora}</h1>
    `);
});

// Inicializa o servidor
server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});