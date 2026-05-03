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

        const data = await response.json();

        //  Filter only real issues (remove PRs)
        const issues = data.filter(issue => !issue.pull_request);

        //  Sort issues by number
        issues.sort((a, b) => a.number - b.number);

        let output = `Open Issues Report for ${OWNER}/${REPO}\n`;
        output += `Generated at: ${new Date().toLocaleString()}\n`;
        output += `Total Issues: ${issues.length}\n\n`;

        issues.forEach(issue => {
            const labels = issue.labels.length
                ? issue.labels.map(label => label.name).join(", ")
                : "No labels";

            output += `#${issue.number}: ${issue.title}\n`;
            output += `State   : ${issue.state}\n`;
            output += `Labels  : ${labels}\n`;
            output += `URL     : ${issue.html_url}\n`;
            output += `----------------------------------------\n`;
        });

        //  Print to console
        console.log(output);

        //  Save to file
        fs.writeFileSync("issues.txt", output);
        console.log("\n✔ Saved to issues.txt");

    } catch (err) {
        console.error(" Error:", err.message);
    }
}

fetchIssues();