let carrinho = [];
const produtos = [
    { id: '1', nome: 'Carteira de Couro marrom', preco: 35.00 },
    { id: '2', nome: 'Carteira de Couro preta especial', preco: 35.00 }
];

// Função para abrir o modal do carrinho
function abrirCarrinho() {
    document.getElementById('carrinho-modal').style.display = 'block';
    exibirCarrinho();
}

// Função para fechar o modal do carrinho
function fecharCarrinho() {
    document.getElementById('carrinho-modal').style.display = 'none';
}

// Função para adicionar itens ao carrinho
document.querySelectorAll('button[data-id]').forEach(button => {
    button.addEventListener('click', () => {
        const idProduto = button.getAttribute('data-id');
        adicionarAoCarrinho(idProduto);
        exibirMensagem();
    });
});

function adicionarAoCarrinho(idProduto) {
    const produto = produtos.find(prod => prod.id === idProduto);
    if (produto) {
        carrinho.push(produto);
        console.log('Produto adicionado:', produto);
        exibirCarrinho();
    }
}

// Exibir os itens do carrinho no modal
function exibirCarrinho() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    const carrinhoTotal = document.getElementById('carrinho-total');
    carrinhoItens.innerHTML = ''; // Limpa o conteúdo antes de adicionar os itens
    carrinhoTotal.innerHTML = ''; // Limpa o valor total

    if (carrinho.length === 0) {
        carrinhoItens.innerHTML = '<p>O carrinho está vazio.</p>';
    } else {
        let total = 0;
        carrinho.forEach(item => {
            const itemElemento = document.createElement('p');
            itemElemento.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
            carrinhoItens.appendChild(itemElemento);
            total += item.preco;
        });
        carrinhoTotal.innerHTML = `<p>Total: R$${total.toFixed(2)}</p>`;
    }
}

// Limpar o carrinho
function limparCarrinho() {
    carrinho = [];
    exibirCarrinho();
}

// Função para exibir a mensagem de confirmação
function exibirMensagem() {
    const mensagem = document.getElementById('mensagem-confirmacao');
    mensagem.style.display = 'block';
    setTimeout(() => {
        mensagem.style.display = 'none';
    }, 2000); // Exibe por 2 segundos
}

// Função para confirmar a compra
function confirmarCompra() {
    if (carrinho.length === 0) {
        alert('O carrinho está vazio.');
        return;
    }

    // Exibir um resumo da compra e esvaziar o carrinho
    let resumo = 'Você comprou:\n';
    let total = 0;
    carrinho.forEach(item => {
        resumo += `${item.nome} - R$${item.preco.toFixed(2)}\n`;
        total += item.preco;
    });
    resumo += `\nTotal: R$${total.toFixed(2)}`;

    alert(resumo);
    limparCarrinho(); // Esvazia o carrinho após a confirmação
}

document.getElementById('confirmar-compra').addEventListener('click', confirmarCompra);
