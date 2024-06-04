import salesByMonth from './salesByMonth.json' assert { type: 'json' };

console.log(salesByMonth);

// Function to update chart based on selected category and month
function updateChart(category, month) {
    let filteredData;

    if (category === 'all' && month === 'all') {
        filteredData = salesByMonth.total_sales.map(entry => ({
            periode: entry.periode,
            total_sales: parseInt(entry.total_sales)
        }));
    } else if (category === 'all') {
        filteredData = salesByMonth.total_sales
            .filter(entry => entry.periode.toLowerCase() === month.toLowerCase())
            .map(entry => ({
                periode: entry.periode,
                total_sales: parseInt(entry.total_sales)
            }));
    } else if (month === 'all') {
        filteredData = salesByMonth.total_by_category
            .filter(entry => entry.category.toLowerCase() === category.toLowerCase())
            .map(entry => ({
                periode: entry.periode,
                total_sales: parseInt(entry.total_sales)
            }));
    } else {
        filteredData = salesByMonth.total_by_category
            .filter(entry => entry.category.toLowerCase() === category.toLowerCase() && entry.periode.toLowerCase() === month.toLowerCase())
            .map(entry => ({
                periode: entry.periode,
                total_sales: parseInt(entry.total_sales)
            }));
    }

    const xValuesLine = filteredData.map(entry => entry.periode);
    const yValuesLine = filteredData.map(entry => entry.total_sales);

    // Update chart data
    myLineChart.data.labels = xValuesLine;
    myLineChart.data.datasets[0].data = yValuesLine;
    myLineChart.update();
}

// Create initial chart
var ctx4 = document.getElementById('chart4').getContext('2d');
var myLineChart = new Chart(ctx4, {
    type: 'line',
    data: {
        labels: [], // Initially empty
        datasets: [{
            label: 'Total Sales',
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgba(190, 0, 0, 0.5)',
            borderColor: 'rgba(190, 0, 0, 1)',
            data: [] // Initially empty
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 100,
                    callback: function (value) {
                        return value;
                    }
                }
            }
        }
    }
});

// Call updateChart initially with 'all' category and 'all' month
updateChart('all', 'all');

// Event listeners for the filters
const categoryFilter = document.getElementById('category-filter');
const monthFilter = document.getElementById('month-filter');

categoryFilter.addEventListener('change', function () {
    const selectedCategory = this.value;
    const selectedMonth = monthFilter.value;
    updateChart(selectedCategory, selectedMonth);
});

monthFilter.addEventListener('change', function () {
    const selectedCategory = categoryFilter.value;
    const selectedMonth = this.value;
    updateChart(selectedCategory, selectedMonth);
});
