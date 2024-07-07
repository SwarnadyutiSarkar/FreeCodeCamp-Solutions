document.addEventListener('DOMContentLoaded', () => {
    const forumPostsContainer = document.getElementById('forum-posts');
  
    async function fetchForumPosts() {
      try {
        const response = await fetch('https://forum-proxy.freecodecamp.rocks/latest');
        const data = await response.json();
        displayForumPosts(data.topic_list.topics);
      } catch (error) {
        console.error('Error fetching forum posts:', error);
      }
    }
  
    function displayForumPosts(posts) {
      forumPostsContainer.innerHTML = '';
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
  
        const postTitle = document.createElement('div');
        postTitle.classList.add('post-title');
        postTitle.textContent = post.title;
        postElement.appendChild(postTitle);
  
        const postInfo = document.createElement('div');
        postInfo.classList.add('post-info');
  
        const userLinks = document.createElement('div');
        userLinks.classList.add('user-links');
        post.posters.forEach(user => {
          const userLink = document.createElement('a');
          userLink.href = `https://forum.freecodecamp.org/u/${user.user_id}`;
          userLink.textContent = user.user_id;
          userLinks.appendChild(userLink);
        });
        postInfo.appendChild(userLinks);
  
        const postStats = document.createElement('div');
        postStats.innerHTML = `Replies: ${post.reply_count} | Views: ${post.views}`;
        postInfo.appendChild(postStats);
  
        const postTimestamp = document.createElement('div');
        postTimestamp.classList.add('timestamp');
        postTimestamp.textContent = `Last active: ${new Date(post.last_posted_at).toLocaleString()}`;
        postInfo.appendChild(postTimestamp);
  
        postElement.appendChild(postInfo);
        forumPostsContainer.appendChild(postElement);
      });
    }
  
    fetchForumPosts();
  });
  