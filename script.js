document.addEventListener("DOMContentLoaded", function() {
  loadPosts();
  loadRecentPosts();
  // Enable navigation via event delegation
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
  // Use event delegation: listen on document.body for clicks on any .nav-list a with data-category attribute
  document.body.addEventListener("click", function(e) {
    let target = e.target;
    while (target && target !== document.body) {
      if (target.matches(".nav-list a[data-category]")) {
        e.preventDefault();
        const category = target.getAttribute("data-category");
        loadPosts(category);
        return;
      }
      target = target.parentNode;
    }
  });
}
