const cargoList = [
    {
        id: "CARGO001",
        name: "Строительные материалы",
        status: "В пути",
        origin: "Москва",
        destination: "Казань",
        departureDate: "2024-11-24"
    },
    {
        id: "CARGO002",
        name: "Хрупкий груз",
        status: "Ожидает отправки",
        origin: "Санкт-Петербург",
        destination: "Екатеринбург",
        departureDate: "2024-11-26"
    }
];

function generateCargoId() {
    return `CARGO${String(cargoList.length + 1).padStart(3, '0')}`;
}

function renderCargoList() {
    const cargoTableBody = document.getElementById('cargoTableBody');
    const filterStatus = document.getElementById('filterStatus').value;
    cargoTableBody.innerHTML = '';
    cargoList.forEach(cargo => {
        if (filterStatus && cargo.status !== filterStatus) return;

        const statusClass = cargo.status === "Ожидает отправки" ? 'status-awaiting' : 
                            cargo.status === "В пути" ? 'status-in-transit' : 
                            'status-delivered';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cargo.id}</td>
            <td>${cargo.name}</td>
            <td class="${statusClass}">${cargo.status}</td>
            <td>${cargo.origin}</td>
            <td>${cargo.destination}</td>
            <td>${cargo.departureDate}</td>
            <td>
                <select class="form-control change-status" data-id="${cargo.id}">
                    <option value="Ожидает отправки" ${cargo.status === "Ожидает отправки" ? 'selected' : ''}>Ожидает отправки</option>
                    <option value="В пути" ${cargo.status === "В пути" ? 'selected' : ''}>В пути</option>
                    <option value="Доставлен" ${cargo.status === "Доставлен" ? 'selected' : ''}>Доставлен</option>
                </select>
            </td>
        `;
        cargoTableBody.appendChild(tr);
    });
    bindEvents();
}

function bindEvents() {
    document.querySelectorAll('.change-status').forEach(select => {
        select.addEventListener('change', function() {
            const cargo = cargoList.find(c => c.id === this.dataset.id);
            const newStatus = this.value;
            if (newStatus === "Доставлен" && new Date(cargo.departureDate) > new Date()) {
                alert("Невозможно изменить статус на 'Доставлен', так как дата отправления в будущем.");
                renderCargoList();
            } else if (newStatus === "В пути" && new Date(cargo.departureDate) > new Date()) {
                alert("Невозможно изменить статус на 'Доставлен', так как дата отправления в будущем.");
                renderCargoList();
            } else {
                cargo.status = newStatus;
                renderCargoList();
            }
        });
    });

    document.getElementById('filterStatus').addEventListener('change', renderCargoList);
}

document.getElementById('addCargoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('cargoName').value.trim();
    const origin = document.getElementById('cargoOrigin').value;
    const destination = document.getElementById('cargoDestination').value;
    const departureDate = document.getElementById('cargoDate').value;

    if (!name || !origin || !destination || !departureDate) {
        alert('Пожалуйста, заполните все поля формы.');
        return;
    }

    const newCargo = {
        id: generateCargoId(),
        name,
        status: "Ожидает отправки",
        origin,
        destination,
        departureDate
    };

    cargoList.push(newCargo);
    renderCargoList();
    this.reset();
});

document.addEventListener('DOMContentLoaded', renderCargoList);
