const projectsList = document.getElementById("projects-list");

const escapeHtml = (value) => {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};

const createProjectCard = (project) => {
    const techTags = project.techStack
        .map((tech) => `<span>${escapeHtml(tech)}</span>`)
        .join("");

    const githubLink = project.githubUrl
        ? `
      <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    `
        : "";

    const demoLink = project.demoUrl
        ? `
      <a href="${escapeHtml(project.demoUrl)}" target="_blank" rel="noopener noreferrer">
        Demo
      </a>
    `
        : "";

    const detailLink = project.detailUrl
        ? `
      <a href="${escapeHtml(project.detailUrl)}">
        詳細を見る
      </a>
    `
        : "";

    const statusClass =
        project.statusType === "muted" ? "project-status muted" : "project-status";

    return `
    <article class="project-card">
      <div class="${statusClass}">
        ${escapeHtml(project.status)}
      </div>

      <h3>${escapeHtml(project.title)}</h3>

      <p>${escapeHtml(project.description)}</p>

      <div class="project-tech">
        ${techTags}
      </div>

      <div class="project-links">
        ${githubLink}
        ${demoLink}
        ${detailLink}
      </div>
    </article>
  `;
};

if (projectsList) {
    projectsList.innerHTML = projects.map(createProjectCard).join("");
}