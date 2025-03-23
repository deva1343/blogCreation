document.addEventListener("DOMContentLoaded", function() {
  // Load all posts on page load
  fetch("posts.json")
    .then(response => response.json())
    .then(data => displayPosts(data, 'all'))
    .catch(error => console.error("Error loading posts:", error));
});

function displayPosts(posts, category) {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  posts.forEach(post => {
    // Show all posts or only those matching the selected category
    if (category === 'all' || post.category === category) {
      const card = document.createElement("div");
      card.className = "post-card";
      
      // Create an image element if available
      let imageHtml = "";
      if (post.image) {
        imageHtml = `<img src="${post.image}" alt="${post.title}">`;
      }
      
      card.innerHTML = `
        ${imageHtml}
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

function filterPosts(category) {
  fetch("posts.json")
    .then(response => response.json())
    .then(data => displayPosts(data, category))
    .catch(error => console.error("Error filtering posts:", error));
}
