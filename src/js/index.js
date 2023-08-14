const menu = [
    { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
    { codigo: 'Chantily', descricao: 'Chantily (extra do Café)', valor: 3.00 },
    { codigo: 'suco', descricao: 'Suco Natural', valor: 3.00 },
    { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 3.00 },
    { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 3.00 },
    { codigo: 'salgado', descricao: 'Salgado', valor: 3.00 },
    { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 3.00 },
    { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 3.00 },
    
];

const descontosTaxas = {
    dinheiro: 0.05,
    credito: 0.03,
};

const items = [];
let paymentMethod = '';

const cartElement = document.getElementById('cart');
const totalElement = document.getElementById('total');
const errorElement = document.createElement('div');
errorElement.id = 'error';
const checkoutBtn = document.getElementById('checkoutBtn');

document.getElementById('addBtn').addEventListener('click', addItemToCart);
checkoutBtn.addEventListener('click', checkout);

function addItemToCart() {
    const selectedItem = document.getElementById('items').value;
    if (selectedItem) {
        items.push(selectedItem);
        errorElement.textContent = '';
        updateCart();
    } else {
        errorElement.textContent = 'Selecione um item válido!';
    }
}

function updateCart() {
    cartElement.innerHTML = '';

    if (items.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Nenhum item no carrinho.';
        cartElement.appendChild(emptyCartMessage);
    } else {
        items.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = getItemDescription(item);
            cartElement.appendChild(itemElement);
        });
    }
}

function getItemDescription(itemCode) {
    const menuItem = menu.find(item => item.codigo === itemCode);
    return menuItem ? menuItem.descricao : '';
}

function calculateTotal() {
    let total = 0;
    items.forEach(item => {
        const menuItem = menu.find(menuItem => menuItem.codigo === item);
        if (menuItem) {
            total += menuItem.valor;
        }
    });

    if (paymentMethod === 'dinheiro') {
        total *= (1 - descontosTaxas.dinheiro);
    } else if (paymentMethod === 'credito') {
        total *= (1 + descontosTaxas.credito);
    }

    return total;
}

function checkout() {
    const selectedPayment = document.getElementById('payment').value;
    if (selectedPayment) {
        paymentMethod = selectedPayment;
        const total = calculateTotal();
        totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
        errorElement.textContent = '';
    } else {
        errorElement.textContent = 'Selecione uma forma de pagamento válida!';
    }
}

document.body.appendChild(errorElement);
