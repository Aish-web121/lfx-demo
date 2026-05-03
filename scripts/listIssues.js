import fetch from "node-fetch";
import fs from "fs";

const OWNER = "hiero-ledger";
const REPO = "hiero";

async function fetchIssues() {
    try {
        const url = `https://api.github.com/repos/${OWNER}/${REPO}/issues`;

        const response = await fetch(url, {
            headers: {
                "Accept": "application/vnd.github+json",
                "User-Agent": "lfx-demo-script"
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status}`);
        }

        const issues = await response.json();

        let output = `Open Issues for ${OWNER}/${REPO}:\n\n`;

        issues.forEach(issue => {
            output += `#${issue.number}: ${issue.title}\n`;
        });

        console.log(output);

       
        fs.writeFileSync("issues.txt", output);
        console.log("\n✔ Saved to issues.txt");

    } catch (err) {
        console.error("Error:", err.message);
    }
}

fetchIssues();