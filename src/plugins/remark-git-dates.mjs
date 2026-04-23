import { execSync } from 'child_process';

/**
 * Remark plugin that automatically injects `published` and `lastEdited` dates
 * from git history into each markdown file's frontmatter.
 *
 * - `published`  = date of the first git commit for the file
 * - `lastEdited` = date of the most recent git commit for the file
 *
 * Frontmatter values already set manually will not be overridden.
 * Falls back gracefully if git is unavailable or the file is uncommitted.
 */
export function remarkGitDates() {
  return function (_tree, file) {
    const filePath = file.path;
    if (!filePath) return;

    if (!file.data.astro) file.data.astro = {};
    if (!file.data.astro.frontmatter) file.data.astro.frontmatter = {};
    const fm = file.data.astro.frontmatter;

    try {
      if (!fm.lastEdited) {
        const lastEdited = execSync(
          `git log -1 --format="%as" -- "${filePath}"`,
          { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
        ).trim();
        if (lastEdited) fm.lastEdited = lastEdited;
      }

      if (!fm.published) {
        const published = execSync(
          `git log --follow --diff-filter=A --format="%as" -- "${filePath}"`,
          { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
        ).trim();
        if (published) fm.published = published;
      }
    } catch {
      // git unavailable or file not committed yet — dates will simply not appear
    }
  };
}
