import express from 'express';


const host = '0.0.0.0';
const porta = 3000;

const server = express();

server.get('/', (requisicao, resposta) => {
    resposta.send(`
        
                                
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reajuste Salarial</title>
</head>

<body>
 <script type="text/javascript">

let matricula, idade, sexo, salariobase, anocontratacao, anoatual;
let tempoempresa, reajuste = 0, descontoouacrescimo = 0, novosalario;

// Entrada de dados
matricula      = parseFloat(prompt("Digite a matricula:"));
idade          = parseInt(prompt("Digite a idade:"));
sexo           = parseInt(prompt("Digite o sexo (1-Masculino / 2-Feminino):"));
salariobase    = parseFloat(prompt("Digite o salario base:"));
anocontratacao = parseInt(prompt("Digite o ano de contratacao:"));
anoatual       = parseInt(prompt("Digite o ano atual:"));

tempoempresa = anoatual - anocontratacao;

if(idade>=16 && salariobase>0 && anoatual>=1960 && matricula>0) 
{
// ===== REAJUSTE =====
if (idade >= 16 && idade <= 39) {
    reajuste = (sexo == 1) ? 0.10 : 0.08;
}
else if (idade >= 40 && idade <= 69) {
    reajuste = (sexo == 1) ? 0.08 : 0.10;
}
else if (idade >= 70 && idade <= 99) {
    reajuste = (sexo == 1) ? 0.15 : 0.17;
}


// ===== DESCONTO OU ACRÉSCIMO =====
if (tempoempresa <= 10) {

    if (idade >= 18 && idade <= 39) {
        descontoouacrescimo = (sexo == 1) ? -10 : -11;
    }
    else if (idade >= 40 && idade <= 69) {
        descontoouacrescimo = (sexo == 1) ? -5 : -7;
    }
    else if (idade >= 70 && idade <= 99) {
        descontoouacrescimo = (sexo == 1) ? -15 : -17;
    }

} 
else {

    if (idade >= 18 && idade <= 39) {
        descontoouacrescimo = (sexo == 1) ? 17 : 16;
    }
    else if (idade >= 40 && idade <= 69) {
        descontoouacrescimo = (sexo == 1) ? 15 : 14;
    }
    else if (idade >= 70 && idade <= 99) {
        descontoouacrescimo = (sexo == 1) ? 13 : 12;
    }
}

// ===== CÁLCULO DO SALÁRIO =====
novosalario = salariobase + (salariobase * reajuste) + descontoouacrescimo;

// ===== SAÍDA =====
document.write("<h2>--- Dados do Funcionário ---</h2>");
document.write("Matricula: " + matricula + "<br>");
document.write("Idade: " + idade + "<br>");
document.write("Sexo: " + (sexo == 1 ? "Masculino" : "Feminino") + "<br>");
document.write("Salario base: R$ " + salariobase + "<br>");
document.write("Tempo de empresa: " + tempoempresa + " anos<br>");
document.write("<h1><b>Novo salario: R$ " + novosalario + "</b></h1>");
}

else
{
alert("Dados Invalidos - *A idade deve ser maior que 16 anos.*O salário base deve ser um número real válido. *O ano de contratação deve ser um inteiro válido maior que 1960. *A matrícula deve ser um inteiro válido maior que zero;");
}



</script>


    
</body>
</html>
         
        `);
     } );
    


     server.get('/horaAtual', (requisicao,resposta) => {
        const horaAtual = new Date();
        const hora = horaAtual.getHours() + ":" + horaAtual.getMinutes() + ":" + horaAtual.getSeconds();
        resposta.send(`
            <!DOCTYPE html>
           <html lang="en">
           <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Horario do Servidor</title>
            </head>

            <body> 
            <h1>Agora são ${hora}</h1> 
            </body>
            </html>
            
        `);

     });

server.listen(porta,host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
    

});