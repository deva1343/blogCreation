document.addEventListener("DOMContentLoaded", function() {
  loadPosts();
  loadRecentPosts();
  enableNavigationLinks();
});

function loadPosts(category = 'all') {
  fetch("posts.json")
    .then(response => response.json())
    .then(posts => displayPosts(posts, category))
    .catch(error => console.error("Error loading posts:", error));
}

function displayPosts(posts, category) {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  posts.forEach(post => {
    if (category === 'all' || post.category === category) {
      const card = document.createElement("div");
      card.className = "post-card";
      card.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <div class="post-content">
          <h2>${post.title}</h2>
          <p>${post.summary}</p>
          <a class="read-more" href="post.html?id=${post.id}">Read More</a>
        </div>
      `;
      container.appendChild(card);
    }
  });
}

function loadRecentPosts() {
  fetch("posts.json")
    .then(response => response.json())
    .then(posts => {
      const recentPostsContainer = document.getElementById("recent-posts-list");
      recentPostsContainer.innerHTML = "";
      posts.slice(0, 5).forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `<img src="${post.image}" alt="${post.title}"><a href="post.html?id=${post.id}">${post.title}</a>`;
        recentPostsContainer.appendChild(li);
      });
    })
    .catch(error => console.error("Error loading recent posts:", error));
}

function enableNavigationLinks() {
  document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      const category = this.getAttribute("data-category");
      loadPosts(category);
    });
  });
}
