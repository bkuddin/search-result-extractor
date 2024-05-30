const { chromium } = require('playwright');

(async () => {
    // Launch the browser
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Go to the search engine website (e.g., Google)
    await page.goto('https://www.google.com');

    // Type the search query into the search box and press Enter
    const searchQuery = 'Playwright';
    await page.fill('input[name="q"]', searchQuery);
    await page.press('input[name="q"]', 'Enter');

    // Wait for the search results to load
    await page.waitForSelector('#search');

    // Extract the search result titles and URLs
    const results = await page.evaluate(() => {
        const items = document.querySelectorAll('#search .g');
        return Array.from(items).map(item => {
            const titleElement = item.querySelector('h3');
            const linkElement = item.querySelector('a');
            return {
                title: titleElement ? titleElement.innerText : null,
                url: linkElement ? linkElement.href : null
            };
        });
    });

    // Display the results in the console
    console.log(results);

    // Close the browser
    await browser.close();
})();
