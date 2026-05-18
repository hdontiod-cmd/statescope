// data password:u6Y8jMBQbsxsxasz
let chart;

async function getExternal() {
    const response = await fetch("/api/all-population");
    return await response.json();
}

async function loadStates() {
    const result = await getExternal();
    const states = [...new Set(result.data.map(d => d.State))].sort();
    const dropdown = document.getElementById("trendStateSelect");

    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        dropdown.appendChild(option);
    });
}

// Build chart
function buildChart(state, data) {
    const labels = data.map(d => d.Year);
    const values = data.map(d => d.Population);

    const ctx = document.getElementById("trendChart");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: `${state} Population Trend`,
                data: values,
                borderWidth: 2,
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

async function handleStateChange() {
    const state = document.getElementById("trendStateSelect").value;
    if (!state) return;
    const result= await getExternal();

    const filtered = result.data
        .filter(d => d.State ===state)
        .sort((a, b) => a.Year - b.Year);

    buildChart(state, filtered);
}

window.addEventListener("DOMContentLoaded", async () => {
    await loadStates();
    document
        .getElementById("trendStateSelect")
        .addEventListener("change", handleStateChange);
});