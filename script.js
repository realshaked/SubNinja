function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show');
}

function untoggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('show');
}

function prepareDeleteModal(nomeCategoria) {
  const nomeElemento = document.getElementById('categoriaNomeExcluir');
  nomeElemento.textContent = nomeCategoria;
}