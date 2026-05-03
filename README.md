# GitHub Issue Automation Tool

This project demonstrates a simple automation script using the GitHub REST API.

## Features
- Fetches issues from a repository
- Filters out pull requests
- Displays:
  - Issue number
  - Title
  - State
  - Labels
  - URL
- Generates a structured report
- Saves output to issues.txt

## Tech Used
- Node.js
- node-fetch
- GitHub REST API

## Run the Project

npm install
node scripts/listIssues.js

## Example Output

#8: Documentation for GPG signing
State: open
Labels: hacktoberfest
URL: (https://github.com/hiero-ledger/hiero/issues/8)

## Purpose

This project simulates real-world GitHub maintainer workflows like issue triaging and tracking.
