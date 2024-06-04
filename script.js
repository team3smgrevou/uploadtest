document.addEventListener('DOMContentLoaded', function() {
    // pemilihan menu di sidebar
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    const sidebar = document.getElementById('sidebar');
    let isSidebarOpen = true; // Variabel untuk melacak status sidebar

    allSideMenu.forEach(item => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
            allSideMenu.forEach(i => {
                i.parentElement.classList.remove('active');
            });
            li.classList.add('active');
        });
    });

    // TOGGLE SIDEBAR
    const menuBar = document.querySelector('#content nav .bx.bx-menu');

    if (menuBar) {
        menuBar.addEventListener('click', function () {
            if (sidebar) {
                isSidebarOpen = !isSidebarOpen; // Toggle status sidebar

                if (isSidebarOpen) {
                    sidebar.classList.remove('hide'); // Hapus kelas hide jika sidebar sedang tersembunyi
                } else {
                    sidebar.classList.add('hide'); // Tambahkan kelas hide jika sidebar sedang terbuka
                }
            }
        });
    }

    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');

    if (searchButton && searchButtonIcon && searchForm) {
        searchButton.addEventListener('click', function (e) {
            if (window.innerWidth < 576) {
                e.preventDefault();
                searchForm.classList.toggle('show');
                if (searchForm.classList.contains('show')) {
                    searchButtonIcon.classList.replace('bx-search', 'bx-x');
                } else {
                    searchButtonIcon.classList.replace('bx-x', 'bx-search');
                }
            }
        });
    }

    if (window.innerWidth < 768 && sidebar) {
        sidebar.classList.add('hide');
    } else if (window.innerWidth > 576 && searchButtonIcon && searchForm) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }

    window.addEventListener('resize', function () {
        if (this.innerWidth > 576 && searchButtonIcon && searchForm) {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
            searchForm.classList.remove('show');
        }
    });

    // Ambil elemen dropdown
    const dataFilter = document.getElementById('data-filter');
    const dashboardContent = document.getElementById('dashboard-content');

    if (dataFilter && dashboardContent) {
        // Event listener untuk perubahan pada dropdown
        dataFilter.addEventListener('change', function() {
            const selectedValue = dataFilter.value;
            console.log("Data yang diminta: " + selectedValue + '.json');

            // Request data sesuai dengan nilai yang dipilih
            requestData(selectedValue);
        });

        // Fungsi untuk meminta data dan memperbarui dashboard
        function requestData(dataType) {
            // Menggunakan XMLHttpRequest atau fetch untuk memuat data JSON
            const xhr = new XMLHttpRequest();
            xhr.open('GET', dataType + '.json', true);
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 400) {
                    // Sukses memuat data
                    const data = JSON.parse(xhr.responseText);

                    // Memperbarui tampilan dashboard
                    renderDashboard(data);
                } else {
                    // Gagal memuat data
                    console.error("Gagal memuat data. Status: " + xhr.status + " - " + xhr.statusText);
                    dashboardContent.innerHTML = '<p>Gagal memuat data. Silakan coba lagi nanti.</p>';
                }
            };
            xhr.onerror = function() {
                console.error("Error koneksi.");
                dashboardContent.innerHTML = '<p>Error koneksi. Silakan periksa koneksi Anda.</p>';
            };
            xhr.send();
        }

        // Fungsi untuk merender data pada dashboard
        function renderDashboard(data) {
            // Contoh cara merender data, bisa disesuaikan sesuai kebutuhan
            dashboardContent.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        }

        // Inisiasi dashboard dengan data awal
        requestData(dataFilter.value);
    }
});
