document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const addUrlBtn = document.getElementById('addUrlBtn');
    const urlList = document.getElementById('urlList');
    const fetchBtn = document.getElementById('fetchBtn');
    const resultNumbers = document.getElementById('resultNumbers');

    const urls = [];

    addUrlBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (url !== '') {
            urls.push(url);
            urlInput.value = '';
            renderUrls();
        }
    });

    fetchBtn.addEventListener('click', () => {
        fetchNumbers();
    });

    function renderUrls() {
        urlList.innerHTML = '';
        urls.forEach((url) => {
            const li = document.createElement('li');
            li.textContent = url;
            urlList.appendChild(li);
        });
    }

    async function fetchNumbers() {
        const results = [];

        for (const url of urls) {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch data from ${url}`);
                }

                const data = await response.json();

                if (data.numbers && Array.isArray(data.numbers)) {
                    results.push(...data.numbers);
                }
            } catch (error) {
                console.error(`Error fetching ${url}: ${error.message}`);
            }
        }

        const uniqueNumbers = [...new Set(results)].sort((a, b) => a - b);
        resultNumbers.textContent = JSON.stringify({ numbers: uniqueNumbers }, 4);
    }
});
