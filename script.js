document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("posts-container")) {
    fetch("posts.json")
      .then(response => response.json())
      .then(data => {
        displayPosts(data, 'all');
        loadRecentPosts(data);
      })
      .catch(error => console.error("Error loading posts:", error));
  }
});

// Function to display posts
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

// Load recent posts
function loadRecentPosts(posts) {
  const recentContainer = document.getElementById("recent-posts").querySelector("ul");
  recentContainer.innerHTML = "";

  posts.slice(0, 5).forEach(post => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<img src="${post.image}" alt="${post.title}"><a href="post.html?id=${post.id}">${post.title}</a>`;
    recentContainer.appendChild(listItem);
  });
}

// Category Navigation Fix
function navigateToCategory(category) {
  displayPosts(posts, category);
}
