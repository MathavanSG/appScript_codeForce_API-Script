# Codeforces Rating Updater

This repository contains a Google Apps Script that updates problem ratings from Codeforces in a Google Sheets document. The script uses the Codeforces API to fetch problem details and writes the corresponding ratings to the spreadsheet.

## Features

- Fetches problem ratings from the Codeforces API.
- Parses tags from a specified column in Google Sheets.
- Handles various edge cases, such as invalid tags or missing problem ratings.
- Writes the ratings to the next column in the spreadsheet.

## How It Works

1. **Input Tags**: The script reads tags from Column G (e.g., "1234/A", "5678/B").
2. **Fetch Ratings**: For each tag, the script fetches the problem rating using the Codeforces API.
3. **Output Ratings**: The script writes the ratings to Column H of the spreadsheet.

## Prerequisites

- A Google Sheets document where the script will run.
- Tags in Column G (starting from Row 2).
- Access to the Codeforces API.

## Setup Instructions

1. Open your Google Sheets document.
2. Navigate to **Extensions > Apps Script**.
3. Copy and paste the code from `updateRatings.gs` into the Apps Script editor.
4. Save the script and authorize the necessary permissions.
5. Run the `updateRatings()` function to update the ratings in the sheet.

## Script Overview

### `updateRatings()`
This function:
- Fetches tags from Column G.
- Validates and parses each tag to extract the contest ID and problem index.
- Calls the `getProblemRating()` function to fetch the rating.
- Writes the ratings back to Column H.

### `getProblemRating(contestId, problemIndex)`
This function:
- Makes an API call to the Codeforces problem set endpoint.
- Searches for the specified contest ID and problem index.
- Returns the problem's rating or an appropriate error message.

## Error Handling

- **Empty Tags**: Tags that are empty will be marked as "Invalid Tag."
- **Invalid Format**: Tags that do not match the expected format (e.g., "1234/A") will be marked as "Invalid Tag Format."
- **API Errors**: If the Codeforces API fails, an error message will be returned.

## Example

| **Tag (Column G)** | **Rating (Column H)**   |
|---------------------|-------------------------|
| `1234/A`           | `Rating: 1500`         |
| `5678/B`           | `Problem Not Found`    |
| `abcd`             | `Invalid Tag Format`   |
| (empty)            | `Invalid Tag`          |

## Dependencies

- Codeforces API: [https://codeforces.com/api/problemset.problems](https://codeforces.com/api/problemset.problems)

## Known Issues

- API Rate Limits: Excessive API calls may result in rate limiting by Codeforces.
- Missing Data: Some problems may not have a rating available.
