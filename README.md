# How to Scrape Emploi-Territorial: French Public Sector and Local Government Jobs

> **Run it now, no code: [emploi-territorial-jobs-scraper on the Apify Store](https://apify.com/bibian/emploi-territorial-jobs-scraper)** &nbsp;|&nbsp; $2.00 per 1,000 job postings &nbsp;|&nbsp; no browser, no proxy

emploi-territorial.fr is the official job board of French local government: cities, departments, regions and their agencies, with around 27,000 live postings. This guide shows how to scrape French public sector jobs and collect French local government jobs as structured data: employer, department, grade, deadline and application link, with a free Apify Actor from the console or from code.

Searches this page answers: emploi territorial scraper, french public sector jobs, french local government jobs, offres emploi collectivites.

## What you get from the Emploi-Territorial scraper

- Postings from the whole of France, newest first, filtered by keyword, department, civil service category (A, B, C) and publication date.
- Employer, department, sector, grade, job family and occupations.
- Publication date, application deadline, start date, working time and workplace.
- With full details enabled: missions, expected profile and application link.

Export the dataset as JSON, CSV or Excel, or read it through the Apify API. A real sample (five results, personal data removed, long texts truncated) is in [`sample-output.json`](sample-output.json).

## Output fields

| Field | What it is |
|---|---|
| `id`, `url` | Posting reference and public link |
| `title`, `employer` | Job title and hiring local authority |
| `department`, `workplace` | Department name and workplace address |
| `category`, `sector`, `grade`, `grades` | Civil service category (A, B, C), sector and grade(s) |
| `employmentType`, `jobType`, `workingTime` | Permanent or contract, vacancy type, full or part time |
| `jobFamily`, `occupations` | Job family and occupations from the public service job directory |
| `publishedAt`, `applicationDeadline`, `startDate` | Dates |
| `openToContractors`, `vacancyReason`, `remoteWork`, `salary` | Extra conditions when published (often null) |
| `summary`, `missions`, `profile`, `applyUrl` | Plain text details, only when full details are enabled |

## Use cases

- **Monitor public sector hiring.** See which local authorities hire, in which departments and grades, every day.
- **Feed a job alert, a board or a newsletter.** Run it daily with "published within 1 day" and send the new postings to subscribers.
- **Map hiring by territory.** Count postings by employer, department and job family.
- **Prepare candidates and training programs.** Read the missions and expected profile for each grade.

## Input

| Field | What it does |
|---|---|
| `keywords` | Words that must all appear in the title, employer, grade or sector. Accents and case are ignored. |
| `departments` | Department names, for example `Gironde`. Empty means all of France. |
| `categories` | `A`, `B` and/or `C`. Empty means all. |
| `publishedWithinDays` | Keep only recent postings. Use `1` for daily monitoring. |
| `maxItems` | The run stops once this many postings are saved (default 50). |
| `includeDetails` | Opens each posting to add missions, profile, workplace and start date. Turn it off for the fastest and cheapest runs. |

Example input:

```json
{
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
}
```

## Three ways to use it

### 1. Apify console, no code

1. Open [the Actor page](https://apify.com/bibian/emploi-territorial-jobs-scraper) and click **Try for free** (a free Apify account is enough).
2. Fill in the input form (keywords, filters and the maximum number of results) and click **Start**.
3. When the run finishes, open the **Output** tab, check the table, then **Export** as CSV, Excel or JSON.
4. For a daily alert, open **Schedules**, create a daily schedule for the Actor and, optionally, add an integration that sends new results to Slack, e-mail or Google Sheets.

### 2. Apify API with JavaScript

```bash
npm install apify-client
export APIFY_TOKEN="your token from Apify console, Settings, Integrations"
node examples/run.js
```

```js
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const run = await client.actor('bibian/emploi-territorial-jobs-scraper').call({
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
});

const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) {
    console.log(`${item.title} | ${item.employer} | ${item.department} | cat. ${item.category} | deadline ${item.applicationDeadline}`);
}
```

The complete file is [`examples/run.js`](examples/run.js) (ES module, Node 18 or later).

### 3. Apify API with Python

```bash
pip install apify-client
export APIFY_TOKEN="your token from Apify console, Settings, Integrations"
python examples/run.py
```

```python
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])

run = client.actor("bibian/emploi-territorial-jobs-scraper").call(run_input={
    "keywords": "informatique",
    "departments": ["Gironde"],
    "categories": ["A", "B"],
    "publishedWithinDays": 7,
    "maxItems": 50,
    "includeDetails": False,
})

for item in client.dataset(run.default_dataset_id).iterate_items():
    print(f"{item['title']} | {item.get('employer')} | {item.get('department')} | cat. {item.get('category')} | deadline {item.get('applicationDeadline')}")
```

The complete file is [`examples/run.py`](examples/run.py). Never put your token in the code: read it from the `APIFY_TOKEN` environment variable as above.

## Pricing

Pay per result: **$2.00 per 1,000 job postings** (that is $0.002 per job posting), plus a tiny start fee of $0.00005 per run. You pay only for the results saved to the dataset. Apify's free plan includes monthly credits, enough to try it on a few hundred results. Prices are those shown on the [Store page](https://apify.com/bibian/emploi-territorial-jobs-scraper) when this guide was written; the Store page is the reference.

## Limits and honest notes

- Salary is rarely published on these postings, so `salary` is mostly `null`.
- Filters are applied while reading the listings, so you only pay for postings that match, but a very narrow filter on the whole site can take longer to find enough results.
- Contact names and phone numbers of civil servants are never exported. `applyUrl` is the application link given by the site.
- This is an unofficial tool, not affiliated with emploi-territorial.fr. Check the site terms and the data protection rules that apply to your use.

## FAQ

**How many postings are there?**  
Around 27,000 live postings when the Actor was published.

**Can I filter by department?**  
Yes, pass department names in `departments`, for example `["Gironde", "Paris"]`.

**What is the cheapest way to run it?**  
Set `includeDetails` to false and use `publishedWithinDays`. The run reads only the listing pages and stops early.

**Are A, B and C categories supported?**  
Yes, with the `categories` input.

## Try it

**[Open emploi-territorial-jobs-scraper on the Apify Store](https://apify.com/bibian/emploi-territorial-jobs-scraper)**

The code in `examples/` is released under the MIT license (see [LICENSE](LICENSE)). The data belongs to its original publishers.
