function updateRatings() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Fetch tags from column G (rows 2 to 501)
  Logger.log("Fetching tags from Column G...");
  const tags = sheet.getRange(2, 7, 500).getValues(); // 500 rows starting from row 2
  Logger.log(`Tags fetched: ${JSON.stringify(tags)}`);

  const ratings = []; // Array to store ratings for each row

  tags.forEach(tagRow => {
    const originalTag = tagRow[0].trim(); // Remove extra spaces
    Logger.log(`Original tag: "${originalTag}"`);

    if (!originalTag) {
      ratings.push(["Invalid Tag"]); // Handle empty tags
      return;
    }

    // Split the tag by '/'
    const parts = originalTag.split('/');
    if (parts.length < 2) {
      ratings.push(["Invalid Tag Format"]); // Handle invalid format
      return;
    }

    const contestId = parseInt(parts[0], 10); // First part is contest ID
    const problemIndex1 = parts[1]; // Second part as problem index
    const problemIndex2 = parts[2] || null; // Third part if available

    let problemIndex = problemIndex1; // Default to problemIndex1
    if (problemIndex2) {
      problemIndex = problemIndex1 + problemIndex2; // Concatenate if problemIndex2 exists
    }

    Logger.log(`Contest ID: ${contestId}, Problem Index: ${problemIndex}`);

    // Fetch rating for the concatenated problem index
    const rating = getProblemRating(contestId, problemIndex);
    Logger.log(`Rating: ${rating}`);
    ratings.push([`Rating: ${rating}`]);
  });

  // Write the ratings back to column H
  const ratingsRange = sheet.getRange(2, 8, ratings.length); // Start from row 2, column H
  ratingsRange.setValues(ratings); // Write ratings to column H
}

function getProblemRating(contestId, problemIndex) {
  const url = "https://codeforces.com/api/problemset.problems";

  try {
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());

    if (data.status === "OK") {
      const problems = data.result.problems;
      for (const problem of problems) {
        if (problem.contestId === contestId && problem.index === problemIndex) {
          return problem.rating || "Rating Not Available";
        }
      }
      return "Problem Not Found";
    } else {
      return "API Error";
    }
  } catch (e) {
    return `Error: ${e.message}`;
  }
}
