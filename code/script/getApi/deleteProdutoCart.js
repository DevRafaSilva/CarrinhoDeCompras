export default function deletarProduto(itemId) {
  if (itemId !== undefined) {
    console.log(itemId.quantidade);
    axios
      .delete(`http://localhost:4000/produtoCart/${itemId.id}`, {
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
  }
}
