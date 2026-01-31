# 🤖 Dependabot Guide

**Dependabot** is a GitHub bot that automatically scans your `package.json` (frontend) and `requirements.txt` (backend) for outdated or vulnerable dependencies.

When it creates a Pull Request (PR), it means a new version is available or a security flaw has been fixed.

## ✅ How to setup

Good news: **It is already configured!**

The file `.github/dependabot.yml` that we added contains the instructions for the bot:
1.  **Frontend (`/frontend`)**: Checks `npm` updates weekly.
2.  **Backend (`/backend`)**: Checks `pip` updates weekly.
3.  **Actions**: Checks GitHub Actions updates monthly.

## ⚙️ How to "Activate" it

Dependabot is enabled by default on public repositories. For private repositories, or to double-check:

1.  Go to your GitHub repository.
2.  Click on **Settings** > **Code security and analysis**.
3.  Ensure **"Dependabot alerts"** and **"Dependabot security updates"** are **Enabled**.
4.  Ensure **"Dependabot version updates"** is **Enabled**.

## 🧐 How it works

1.  **Wait**: Every week (as configured), Dependabot scans the project.
2.  **PR**: If an update is found, it opens a Pull Request named like `Bump react from 18.2.0 to 18.3.0`.
3.  **Review**:
    *   The CI (Lint & Build) will run on this PR automatically.
    *   If the CI passes (Green checkmark ✅), it's generally safe to merge.
    *   Click "Merge pull request".
4.  **Done**: Your project is up to date!

## 💡 Tips

*   **Security First**: If Dependabot flags a "Security Vulnerability", prioritize merging that PR.
*   **Changelogs**: Dependabot PRs usually include a link to the library's changelog/release notes. It's good practice to read them quickly to see if there are "Breaking Changes".
