# testegreen
"# green" 
### as rotas estaram descritas 
# Get http://localhost:3000/boletos 
"### Nesta rota pode ser descrita as formas de busca se não for informada nenhum parametro de busca ele 
retornara um arrei padcom todos os boletos cadastrados exemplos de como deve ser feita a busca"
"# para toda busca com parametros relacionados a usuarios devera ser informada o nome exemplo
 http://localhost:3000/boletos?nome=JOSE  
 os parametros adicionais aceitos são
 valor_inicial
 valor_final
 id_lote
 abos podem ser posto de forma separada obrigatorio o uso do parametro nome"
# Get http://localhost:3000/boletos?relatorio=1
"# Ao informa o parametro relatorio=1 ele devolve uma resposta de pdf com base64"
# POST http://localhost:3000/uploads
"# Ao acessar essa rota enviar o arquivo csv de cadastro de boletos onde serão tratos e adicionados ao banco de dados fazendo relação
com o id da tabela de lotes "
# POST http://localhost:3000/uploads/pdf
"# Ao acessar essa rota enviar o arquivo PDF onde sera trato e ira dividir o salvando eles com o id da tabela boleto correspondente a ele 
na pasta temps/pdf"
# https://planetary-shuttle-954363.postman.co/workspace/green~99a1024f-0016-45af-972b-41142f04addc/overview?workspaceOnboarding=show
"# link do invite do postman"
