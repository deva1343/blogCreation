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
    // Filter posts based on category or show all when 'all' is selected
    if (category === 'all' || post.category === category) {
      const card = document.createElement("div");
      card.className = "post-card";
      
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
