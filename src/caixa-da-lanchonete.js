class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        return "";
    }

}

export { CaixaDaLanchonete };

class CaixaDaLanchonete {
    calcularValorDaCompra(formaDePagamento, itens) {
      const cardapio = {
        cafe: 3.00,
        chantily: 1.50,
        suco: 6.20,
        sanduiche: 6.50,
        queijo: 2.00,
        salgado: 7.25,
        combo1: 9.50,
        combo2: 7.50
      };
  
      const descontos = {
        dinheiro: 0.05,
        credito: 0.03
      };
  
      if (!descontos[formaDePagamento]) {
        return "Forma de pagamento inválida!";
      }
  
      let total = 0;
      let extras = {};
  
      for (const item of itens) {
        const [codigo, quantidade] = item.split(',');
        
        if (!cardapio[codigo]) {
          return "Item inválido!";
        }
  
        if (codigo !== 'chantily' && codigo !== 'queijo') {
          total += cardapio[codigo] * quantidade;
        } else {
          if (!extras[codigo]) {
            extras[codigo] = 0;
          }
          extras[codigo] += parseInt(quantidade);
        }
      }
  
      if (extras['chantily'] > 0 && !extras['cafe']) {
        return "Item extra não pode ser pedido sem o principal";
      }
      
      if (extras['queijo'] > 0 && !extras['sanduiche']) {
        return "Item extra não pode ser pedido sem o principal";
      }
  
      total += extras['chantily'] * cardapio['chantily'];
      total += extras['queijo'] * cardapio['queijo'];
  
      total -= total * descontos[formaDePagamento];
      
      if (formaDePagamento === 'credito') {
        total += total * descontos['credito'];
      }
  
      if (total === 0) {
        return "Não há itens no carrinho de compra!";
      }
  
      return `R$ ${total.toFixed(2)}`;
    }
  }
  
  
  