
    const postsContainer = document.getElementById("postsContainer");
    const searchInput = document.getElementById("search");
    let allPosts = [];

    async function fetchPosts() {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const data = await response.json();
        allPosts = data.posts;
        displayPosts(allPosts);
      } catch (error) {
        postsContainer.innerHTML = "<p> Failed to load posts.</p>";
      }
    }

    function displayPosts(posts) {
      postsContainer.innerHTML = posts.map(post => `
        <div class="post-card">
          <div class="post-title">${post.title}</div>
          <div class="post-body">${post.body.slice(0, 100)}...</div>
          <div class="tags">
            ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join("")}
          </div>
          <div class="meta">
            <span> ${post.reactions.likes || 0}</span>
            <span> ${post.views}</span>
          </div>
        </div>
      `).join("");
    }

    searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase();
      const filtered = allPosts.filter(
        p => p.title.toLowerCase().includes(keyword) || p.body.toLowerCase().includes(keyword)
      );
      displayPosts(filtered);
    });

    fetchPosts();
