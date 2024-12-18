import deletarProduto from './deleteProdutoCart.js';

export default function postCart(mais, diminuir, itemId) {
  if (mais !== undefined) {
    mais.forEach((item) => {
      item.addEventListener('click', () => {
        itemId.quantidade++;
        axios
          .put(`http://localhost:3000/produto/${itemId.id}`, {
            img: itemId.img,
            categoria: itemId.categoria,
            nome: itemId.nome,
            preco: itemId.preco,
            quantidade: itemId.quantidade,
          })
          .then((response) => response)
          .then((dados) => {
            console.log(dados);
          });
        axios
          .put(`http://localhost:4000/produtoCart/${itemId.id}`, {
            img: itemId.img,
            categoria: itemId.categoria,
            nome: itemId.nome,
            preco: itemId.preco,
            quantidade: itemId.quantidade,
          })
          .then((response) => response)
          .then((dados) => {
            console.log(dados);
          });
      });
    });
  }
  if (diminuir !== undefined) {
    diminuir.forEach((item) => {
      item.addEventListener('click', () => {
        itemId.quantidade--;
        axios
          .put(`http://localhost:3000/produto/${itemId.id}`, {
            img: itemId.img,
            categoria: itemId.categoria,
            nome: itemId.nome,
            preco: itemId.preco,
            quantidade: itemId.quantidade,
          })
          .then((response) => response)
          .then((dados) => {
            console.log(dados);
          });
        axios
          .put(`http://localhost:4000/produtoCart/${itemId.id}`, {
            img: itemId.img,
            categoria: itemId.categoria,
            nome: itemId.nome,
            preco: itemId.preco,
            quantidade: itemId.quantidade,
          })
          .then((response) => response)
          .then((dados) => {
            console.log(dados);
          });
        if (itemId.quantidade == 0) deletarProduto(itemId);
      });
    });
  }
}
