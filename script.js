const repositoryList = document.querySelector("#repository-list");
const listStatus = document.querySelector("#list-status");

function renderRepository(repository) {
  const item = document.createElement("li");
  item.className = "repository-card";

  const heading = document.createElement("h3");
  heading.className = "repository-title";

  const link = document.createElement("a");
  link.href = repository.url;
  link.textContent = repository.name;
  heading.append(link);

  const owner = document.createElement("p");
  owner.className = "repository-owner";
  owner.textContent = `by ${repository.owner}`;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const metadata = document.createElement("p");
  metadata.className = "repository-meta";

  const stars = document.createElement("span");
  stars.textContent = `★ ${repository.stars.toLocaleString()} stars`;

  const language = document.createElement("span");
  language.textContent = repository.language;

  metadata.append(stars, language);
  item.append(heading, owner, description, metadata);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Unable to load repositories (${response.status}).`);
    }

    const data = await response.json();
    if (!Array.isArray(data.repositories)) {
      throw new Error("The repository data has an invalid format.");
    }

    repositoryList.replaceChildren(...data.repositories.map(renderRepository));

listStatus.textContent = data.repositories.length
  ? `${data.repositories.length} starred repositories loaded.`
  : "No starred repositories yet.";
} catch (error) {
  listStatus.textContent = `Could not load repositories: ${error.message}`;
}
  }
}

loadRepositories();
