document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("posts-container")) {
    loadPosts();
  }
  loadRecentPosts();
  enableNavLinks();
});

function loadPosts(category = 'all') {
  fetch("posts.json")
    .then(response => response.json())
    .then(posts => {
      displayPosts(posts, category);
    })
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
        <div class="post-image-container">
          <img src="${post.image}" alt="${post.title}">
        </div>
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
      const recentList = document.getElementById("recent-posts-list");
      recentList.innerHTML = "";
      posts.slice(0, 5).forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `<img src="${post.image}" alt="${post.title}"><a href="post.html?id=${post.id}">${post.title}</a>`;
        recentList.appendChild(li);
      });
    })
    .catch(error => console.error("Error loading recent posts:", error));
}

function enableNavLinks() {
  // Use event delegation on the body to handle clicks on nav links with a data-category attribute.
  document.body.addEventListener("click", function(e) {
    let target = e.target;
    // Traverse up in case a child element (like an icon) was clicked.
    while (target && target !== document.body) {
      if (target.matches(".nav-list a[data-category]")) {
        // Only intercept if the posts container exists (i.e. on the homepage)
        if (document.getElementById("posts-container")) {
          e.preventDefault();
          const category = target.getAttribute("data-category");
          loadPosts(category);
        }
        return;
      }
      target = target.parentNode;
    }
  });
}
