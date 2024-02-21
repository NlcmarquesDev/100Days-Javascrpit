class Product {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.editId = null;
  }

  addProduct() {
    let produto = this.readData();

    if (this.validationFields(produto)) {
      if (this.editId === null) {
        this.arrayProdutos.push(produto);
        this.id++;
      } else {
        this.updateFields(this.editId, produto);
        this.editId = null;
        document.getElementById("add").innerText = "Salvar";
      }
      this.insertTable();
    }
    this.cleanProduct();
  }
  insertTable() {
    const tbody = document.getElementById("tbody");
    tbody.innerText = "";

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_name = tr.insertCell();
      let td_preco = tr.insertCell();
      let td_action = tr.insertCell();

      let productId = this.arrayProdutos[i].id;

      td_id.classList.add("center");
      td_id.innerHTML = this.arrayProdutos[i].id;

      td_name.innerHTML = this.arrayProdutos[i].name;
      td_name.classList.add("center");

      td_preco.innerHTML = this.arrayProdutos[i].preco;
      td_preco.classList.add("center");

      td_action.classList.add("center");
      let btnUpdate = document.createElement("span");
      btnUpdate.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-pencil-square"
      viewBox="0 0 16 16"
    >
      <path
        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
      />
      <path
        fill-rule="evenodd"
        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
      />
    </svg>`;

      btnUpdate.addEventListener("click", () => {
        this.updateProduct(this.arrayProdutos[i]);
      });

      td_action.appendChild(btnUpdate);

      let btnRemove = document.createElement("span");
      btnRemove.innerHTML = `  <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-trash"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
        />
        <path
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
        />
      </svg>`;
      btnRemove.addEventListener("click", () => {
        this.removeProduct(this.arrayProdutos[i].id);
        this.insertTable();
      });
      td_action.appendChild(btnRemove);
    }
  }

  cleanProduct() {
    document.getElementById("produto").value = "";
    document.getElementById("preco").value = "";
  }
  readData() {
    let produto = {};
    produto.id = this.id;
    produto.name = document.getElementById("produto").value;
    produto.preco = document.getElementById("preco").value;

    return produto;
  }

  validationFields(produto) {
    let msg = "";
    if (produto.name === "") {
      msg += "Por favo o nome do produto";
    }
    if (produto.preco === "") {
      msg += "Por favo o preço do produto";
    }

    if (msg !== "") {
      alert(msg);
      return false;
    }
    return true;
  }
  removeProduct(id) {
    if (confirm("Are you sure you want to remove?")) {
      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id === id) {
          this.arrayProdutos.splice(i, 1);
        }
      }
    }
  }

  updateFields(id, produto) {
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].id === id) {
        this.arrayProdutos[i].name = produto.name;
        this.arrayProdutos[i].preco = produto.preco;
      }
    }
  }

  updateProduct(product) {
    this.editId = product.id;
    document.getElementById("produto").value = product.name;
    document.getElementById("preco").value = product.preco;

    document.getElementById("add").innerText = "Atualizar";
  }
}

export { Product };
