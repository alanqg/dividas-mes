let dividas = JSON.parse(localStorage.getItem('dividas')) || [];
let editIndex = null;

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
});

document.getElementById('debtForm').addEventListener('submit', function(e){
    e.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const mes = document.getElementById('mes').value;
    const ano = document.getElementById('ano').value;

    const divida = { descricao, valor, mes, ano, pago: false };

    if (editIndex === null) {
        dividas.push(divida);
    } else {
        dividas[editIndex] = divida;
        editIndex = null;
    }

    salvarDividas();
    this.reset();
    renderTable();
});

function renderTable(){
    const table = document.getElementById('tabelaDividas');
    table.innerHTML = "";

    dividas.forEach((d, i) => {
        const linhaClasse = d.pago ? 'table-success' : '';
        table.innerHTML += `
            <tr class="${linhaClasse}">
                <td>${d.descricao}</td>
                <td>${d.valor.toFixed(2)}</td>
                <td>${d.mes}</td>
                <td>${d.ano}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editarDivida(${i})">Editar</button>
                    <button class="btn btn-sm btn-danger me-1" onclick="excluirDivida(${i})">Excluir</button>
                    ${
                      d.pago
                        ? '<span class="badge bg-success">Paga ✅</span>'
                        : `<button class="btn btn-sm btn-success" onclick="marcarComoPago(${i})">Pago</button>`
                    }
                </td>
            </tr>
        `;
    });
}

function editarDivida(index) {
    const d = dividas[index];
    document.getElementById('descricao').value = d.descricao;
    document.getElementById('valor').value = d.valor;
    document.getElementById('mes').value = d.mes;
    document.getElementById('ano').value = d.ano;
    editIndex = index;
}

function excluirDivida(index) {
    if (confirm("Deseja excluir esta dívida?")) {
        dividas.splice(index, 1);
        salvarDividas();
        renderTable();
    }
}

function marcarComoPago(index) {
    dividas[index].pago = true;
    salvarDividas();
    renderTable();
}

function salvarDividas() {
    localStorage.setItem('dividas', JSON.stringify(dividas));
}
