// Minimal example: run the emploi-territorial-jobs-scraper Actor and print the results.
// Usage: APIFY_TOKEN=... node run.js   (Node 18 or later, npm install apify-client)
import { ApifyClient } from 'apify-client';

const token = process.env.APIFY_TOKEN;
if (!token) {
    console.error('Set the APIFY_TOKEN environment variable first.');
    process.exit(1);
}

const client = new ApifyClient({ token });

const input = {
    "keywords": "informatique",
    "departments": [
        "Gironde"
    ],
    "categories": [
        "A",
        "B"
    ],
    "publishedWithinDays": 7,
    "maxItems": 50,
    "includeDetails": false
};

const run = await client.actor('bibian/emploi-territorial-jobs-scraper').call(input);
const { items } = await client.dataset(run.defaultDatasetId).listItems();

console.log(`${items.length} results`);
for (const item of items) {
    console.log(`${item.title} | ${item.employer} | ${item.department} | cat. ${item.category} | deadline ${item.applicationDeadline}`);
}
