import AvgBasketSizeByCategory from './AvgBasketSizeByCategory.json' assert {type: 'json'};

console.log(AvgBasketSizeByCategory);

const ctx2 = document.getElementById('barchart2').getContext('2d');
const categoryFilter = document.getElementById('category-filter');
const monthFilter = document.getElementById('month-filter');

function filterData(category, month) {
  let filteredData = month === 'all' ? AvgBasketSizeByCategory.default : AvgBasketSizeByCategory.periode.filter(entry => entry.periode.toLowerCase() === month.toLowerCase());

  if (category !== 'all') {
    filteredData = filteredData.filter(entry => (entry.category || entry.Category).toLowerCase() === category.toLowerCase());
  }

  return filteredData;
}

function updateChart(category, month) {
  const filteredData = filterData(category, month);
  const categories = filteredData.map(entry => entry.category || entry.Category);
  const abs = filteredData.map(entry => parseFloat(entry.ABS));

  barchart2.data.labels = categories;
  barchart2.data.datasets[0].data = abs;
  barchart2.update();
}

// Initialize chart with all data
const initialData = filterData('all', 'all');
const initialCategories = initialData.map(entry => entry.category || entry.Category);
const initialABS = initialData.map(entry => parseFloat(entry.ABS));

const barchart2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: initialCategories,
    datasets: [{
      label:'Average Basket Size (ABS)',
      data: initialABS,
      backgroundColor: 'rgba(190, 0, 0, 0.5)',
      borderColor: 'rgba(190, 0, 0, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return value.toFixed(2);
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
  }
    }
  }
});

// Add event listeners to dropdowns
categoryFilter.addEventListener('change', () => {
  const selectedCategory = categoryFilter.value;
  const selectedMonth = monthFilter.value;
  updateChart(selectedCategory, selectedMonth);
});

monthFilter.addEventListener('change', () => {
  const selectedCategory = categoryFilter.value;
  const selectedMonth = monthFilter.value;
  updateChart(selectedCategory, selectedMonth);
});
