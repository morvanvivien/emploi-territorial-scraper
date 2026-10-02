"""Minimal example: run the emploi-territorial-jobs-scraper Actor and print the results.

Usage: APIFY_TOKEN=... python run.py   (pip install apify-client)
"""
import os
import sys

from apify_client import ApifyClient

token = os.environ.get("APIFY_TOKEN")
if not token:
    sys.exit("Set the APIFY_TOKEN environment variable first.")

client = ApifyClient(token)

run_input = {
    "keywords": "informatique",
    "departments": ["Gironde"],
    "categories": ["A", "B"],
    "publishedWithinDays": 7,
    "maxItems": 50,
    "includeDetails": False,
}

run = client.actor("bibian/emploi-territorial-jobs-scraper").call(run_input=run_input)

count = 0
for item in client.dataset(run.default_dataset_id).iterate_items():
    count += 1
    print(f"{item['title']} | {item.get('employer')} | {item.get('department')} | cat. {item.get('category')} | deadline {item.get('applicationDeadline')}")
print(f"{count} results")
