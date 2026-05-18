const GITHUB_API = "https://api.github.com";
const REPO = "leandrocncold/cn-cold-coils";

function headers() {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
}

export interface Commit {
  sha: string;
  message: string;
  date: string;
  author: string;
}

export async function getRecentCommits(n = 10): Promise<Commit[]> {
  const res = await fetch(`${GITHUB_API}/repos/${REPO}/commits?per_page=${n}`, { headers: headers() });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((c: any) => ({
    sha: c.sha.slice(0, 7),
    message: c.commit.message.split("\n")[0],
    date: c.commit.author.date,
    author: c.commit.author.name,
  }));
}

export async function getFileContent(path: string): Promise<string | null> {
  const res = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${path}`, { headers: headers() });
  if (!res.ok) return null;
  const data = await res.json();
  return atob(data.content.replace(/\n/g, ""));
}

export interface PRResult {
  url: string;
  number: number;
}

export async function createFixPR(
  files: { path: string; content: string }[],
  prTitle: string,
  prBody: string,
): Promise<PRResult> {
  const branch = `fix/ai-${Date.now()}`;

  // Get main SHA
  const refRes = await fetch(`${GITHUB_API}/repos/${REPO}/git/ref/heads/main`, { headers: headers() });
  const { object: { sha: mainSha } } = await refRes.json();

  // Create branch
  await fetch(`${GITHUB_API}/repos/${REPO}/git/refs`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: mainSha }),
  });

  // Commit each file
  for (const file of files) {
    const existing = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${file.path}?ref=${branch}`, { headers: headers() });
    const sha = existing.ok ? (await existing.json()).sha : undefined;
    await fetch(`${GITHUB_API}/repos/${REPO}/contents/${file.path}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({
        message: prTitle,
        content: btoa(unescape(encodeURIComponent(file.content))),
        branch,
        ...(sha ? { sha } : {}),
      }),
    });
  }

  // Open PR
  const prRes = await fetch(`${GITHUB_API}/repos/${REPO}/pulls`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ title: prTitle, body: prBody, head: branch, base: "main" }),
  });
  const pr = await prRes.json();
  return { url: pr.html_url, number: pr.number };
}
