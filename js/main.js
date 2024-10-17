// Cargar datos de firmas
async function loadSignatures() {
  try {
    const response = await fetch("../data/signatures.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading signatures:", error);
    return null;
  }
}

// Actualizar el display de estadísticas
async function updateDisplay() {
  const data = await loadSignatures();
  if (!data) return;

  const signatures = data.total_signatures;
  const progressPercent = (signatures / 30000) * 100;

  document.getElementById("current-signatures").textContent =
    signatures.toLocaleString();
  document.getElementById("progress-percentage").textContent =
    progressPercent.toFixed(1) + "%";
  document.getElementById("progress-bar").style.width = progressPercent + "%";
}

// Toggle para mostrar/ocultar firmas
async function toggleSignatures() {
  const list = document.getElementById("signatures-list");
  const button = document.querySelector(".toggle-signatures");

  if (list.classList.contains("show")) {
    list.classList.remove("show");
    button.innerHTML = '<i class="fas fa-users"></i> Show Signatures';
    return;
  }

  // Cargar y mostrar firmas
  const data = await loadSignatures();
  if (!data) return;

  list.classList.add("show");
  button.innerHTML = '<i class="fas fa-times"></i> Hide Signatures';

  // Generar lista de firmas
  let html = "";
  data.signatures.forEach((signature) => {
    html += `
            <div class="signature-item">
                <div>
                    <strong>${signature.username}</strong>
                    <span style="margin-left: 10px; color: #888;">${
                      signature.email
                    }</span>
                </div>
                <div class="signature-date">${formatDate(signature.date)}</div>
            </div>
        `;
  });

  list.innerHTML = html;
}

// Formatear fecha
function formatDate(dateStr) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("en-US", options);
}

// Inicializar cuando carga la página
window.onload = updateDisplay;
