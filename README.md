# Menina Bella Joias

## Editor local de produtos

O arquivo local `editor_produtos.py` abre uma interface para visualizar os dados, editar produtos existentes e criar novos produtos. Ele usa apenas a biblioteca padrão do Python (Tkinter), sem pacotes adicionais.

Na pasta principal do projeto, execute com uma instalação do Python 3 com Tkinter:

```powershell
python editor_produtos.py
```

No Windows, também é possível dar dois cliques em `abrir_editor.bat`. O atalho abre o editor a partir desta raiz e também é ignorado pelo Git.

Selecione um produto na lista ou clique em **Novo produto**, preencha os campos e clique em **Salvar produto** (ou Ctrl+S). O preço aceita `39,90` ou `39.90`; os tamanhos devem ser separados por vírgulas. A busca encontra produtos por nome, ID ou categoria. **Escolher imagem** copia fotos externas para `imagens` sem sobrescrever arquivos existentes. A aba **Foto do produto** exibe a prévia; para suportar também JPG e WebP, instale a dependência opcional com `python -m pip install Pillow`. Sem Pillow, a prévia usa os formatos suportados pelo Tkinter, como PNG, e o cadastro continua funcionando para todos os formatos.

Cada salvamento atualiza `produtos.json` e mantém a versão anterior em `produtos.json.bak`. Se o JSON mudar fora da interface, o editor impede o salvamento; reabra o editor para carregar a versão atual. Ao trocar de produto ou fechar, a interface avisa sobre alterações não salvas.

O `.gitignore` exclui o editor, seu backup e arquivos temporários. O editor é local e não será obtido por quem clonar o repositório. Para publicar alterações no catálogo, inclua `produtos.json` e eventuais novas fotos da pasta `imagens` no commit. A interface não faz commits nem envia arquivos para o GitHub.

Site estático em HTML, CSS e JavaScript. A versão principal está na raiz deste repositório: `index.html`, `colecao.html`, `script.js` e `style.css`.
Há uma única versão do site nesta raiz. As fotos ficam em `imagens/` e as configurações do VS Code em `.vscode/`.

## Abrir o site

No VS Code, abra `index.html` ou `colecao.html` da raiz usando a extensão Live Server (Open with Live Server).
O site precisa ser servido por HTTP/HTTPS: abrir o HTML por duplo clique (`file://`) pode bloquear a leitura do JSON.
Na hospedagem, publique também `produtos.json` e a pasta `imagens`, mantendo os caminhos relativos.

## Cadastrar e atualizar produtos

Edite somente `produtos.json` para adicionar, alterar ou remover produtos. Salve em UTF-8 e atualize a página.
O arquivo contém uma lista de objetos. Exemplo de um produto:

```json
{
  "id": "A008",
  "nome": "Anel Dourado",
  "categoria": "Anéis",
  "preco": 39.90,
  "descricao": "Descrição completa exibida no detalhe do produto.",
  "descricaoCurta": "Resumo exibido na coleção.",
  "imagem": "imagens/anel-dourado.jpg",
  "tamanhos": ["14", "16", "18"]
}
```

- Insira o objeto dentro da lista `[...]`, separando os produtos por vírgula. JSON exige aspas duplas e não aceita comentários nem vírgula depois do último item.
- `id`, `nome`, `categoria` e `imagem` são textos obrigatórios e não podem estar vazios. Cada `id` deve ser único.
- `preco` é um número maior ou igual a zero, com ponto para os centavos, sem aspas nem `R$`.
- `descricao` e `descricaoCurta` são textos opcionais. Sem resumo, o cartão usa a descrição completa.
- `imagem` aponta para um arquivo relativo à página. Copie a foto para `imagens` e respeite o nome e as letras maiúsculas/minúsculas.
- `tamanhos` é uma lista opcional de textos. Use `[]` ou omita o campo para peças sem seleção de tamanho.
- Os filtros Todas, Colares, Brincos, Anéis e Pulseiras permanecem visíveis, mesmo sem produtos. Categorias adicionais são geradas automaticamente pelo JSON. Use a mesma grafia para produtos da mesma categoria.
- Para remover uma peça da vitrine, remova seu objeto da lista. Uma lista vazia `[]` exibe a mensagem de catálogo vazio.

O site lê e valida o arquivo antes de exibir a coleção. Se o JSON estiver inválido ou não puder ser carregado, mostra uma mensagem com botão para tentar novamente; o console do navegador informa o motivo.
O cadastro é feito editando o arquivo: não há formulário administrativo nem gravação pelo navegador.

## Organização

- `produtos.json`: cadastro dos produtos, preços, imagens e tamanhos.
- `script.js`: carregamento e validação do catálogo, filtros, detalhes, carrinho e pedido pelo WhatsApp. A configuração da loja continua em `CONFIG`.
- `colecao.html`: estrutura da vitrine.
- `index.html`: apresentação, perguntas frequentes e contato.
- `style.css`: aparência e responsividade.
- `imagens/`: fotos únicas dos produtos; imagens diferentes são preservadas mesmo quando ainda não estão no catálogo.
- `.vscode/settings.json`: configuração do editor de código.
- `editor_produtos.py` e `abrir_editor.bat`: ferramentas locais, ignoradas pelo Git.
