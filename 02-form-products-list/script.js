import { Product } from "./Produto.js";
const produto = new Product();

let btnAdd = document.getElementById("add");
btnAdd.addEventListener("click", produto.addProduct.bind(produto));

let btnClear = document.getElementById("clear");
btnClear.addEventListener("click", produto.cleanProduct.bind(produto));
