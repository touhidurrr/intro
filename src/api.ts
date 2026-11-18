import { projects, type Project } from "./data";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

async function fetchGitHubMetrics(
  repository: string,
): Promise<{ stars: number; forks: number }> {
  const response = await fetch(`https://api.github.com/repos/${repository}`);
  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const data: unknown = await response.json();
  if (
    !isRecord(data) ||
    typeof data.stargazers_count !== "number" ||
    typeof data.forks_count !== "number"
  ) {
    throw new Error("GitHub API returned invalid repository metrics");
  }

  return { stars: data.stargazers_count, forks: data.forks_count };
}

async function fetchNpmDownloads(packageName: string): Promise<number> {
  const packagePath = encodeURIComponent(packageName);
  const response = await fetch(
    `https://api.npmjs.org/downloads/point/last-week/${packagePath}`,
  );
  if (!response.ok) {
    throw new Error(`npm API responded with ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!isRecord(data) || typeof data.downloads !== "number") {
    throw new Error("npm API returned invalid download metrics");
  }

  return data.downloads;
}

async function refreshProjectMetrics(project: Project): Promise<Project> {
  try {
    if (project.metrics.kind === "github") {
      const currentMetrics = await fetchGitHubMetrics(
        project.metrics.repository,
      );
      return {
        ...project,
        metrics: { ...project.metrics, ...currentMetrics },
      };
    }

    const downloads = await fetchNpmDownloads(project.metrics.packageName);
    return {
      ...project,
      metrics: { ...project.metrics, downloads, period: "week" },
    };
  } catch (error) {
    console.warn(
      `Could not refresh ${project.name} metrics; keeping fallback values.`,
      error,
    );
    return project;
  }
}

export function fetchProjectMetrics(): Promise<Project[]> {
  return Promise.all(projects.map(refreshProjectMetrics));
}
