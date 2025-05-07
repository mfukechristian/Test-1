document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.querySelector("#records-table tbody");

  try {
    const res = await fetch("http://localhost:5000/api/form");
    if (!res.ok) throw new Error("Failed to load data.");

    const records = await res.json();

    if (records.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">No records found.</td></tr>`;
      return;
    }

    records.forEach((record) => {
      const formattedDateOfBirth = formatDate(record.dateOfBirth);
      const formattedCreatedAt = formatDate(record.createdAt);

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${record.name}</td>
        <td>${record.surname}</td>
        <td>${record.idNumber}</td>
        <td>${formattedDateOfBirth}</td>
      `;

      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="5">Error loading records.</td></tr>`;
  }
});

// Helper function to format date as dd/mm/yyyy
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
