function fetchInfo() {
    const accessToken = document.getElementById("api-token").value.trim();
    if (!accessToken) {
        alert("Please enter your API token!");
        return;
    }

    fetch(`https://graph.facebook.com/me?fields=id,name,birthday,email,gender,age_range,picture,location,posts.limit(100){message, created_time, full_picture, type, permalink_url,reactions.summary(total_count).limit(0), comments.summary(total_count).limit(3){message,from,created_time}, shares, attachments{media,type,url}},friends&access_token=${accessToken}`)
    .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error.message);
                return;
            }

        let postsHtml = '';
        if (data.posts && data.posts.data.length > 0) {

            const friendsCount = data.friends ? data.friends.summary.total_count : 'Not available';
            postsHtml = `<div class="post-header">
                        <h3>Recent Posts:</h3>
                        <p class="friends">${friendsCount} <span>(friends)</span></p>
                        </div>`;
            data.posts.data.forEach(post => {
                let postImage = '';

                if (post.full_picture) {
                    postImage = `
                      <img src="${post.full_picture}">
                    `;
                } 
                else if (post.attachments && post.attachments.data[0]?.media?.image?.src) {
                    postImage = `<img src="${post.attachments.data[0].media.image.src}">`;
                }

                const reactionsCount = post.reactions ? post.reactions.summary.total_count : 0;
                const commentsCount = post.comments ? post.comments.summary.total_count : 0;
                const sharesCount = post.shares ? post.shares.count : 0;

                const postLink = post.permalink_url ? `<a href="${post.permalink_url}" target="_blank" class="viewFB">View on Facebook</a>` : '';

                postsHtml += `
                    <div class="post-card">
                        <div class="post-owner">
                            <p class="email">${data.email || 'Not available'}</p>
                            <p class="date">${new Date(post.created_time).toLocaleString()}</p>
                        </div>
                        <div class="post-content">
                            <p class="message">${post.message || ''}</p>

                            <div class="image">
                              ${postImage}
                            </div>
                            
                            <p class="others">like: ${reactionsCount} | comment: ${commentsCount} | shared post: ${sharesCount} | ${postLink}</p>
                        </div>
                    </div>
                `;
            });
        } else {
            postsHtml = '<p>No posts available.</p>';
        }

            document.getElementById("user-info").innerHTML = `
                <img src="${data.picture.data.url}" width="120">
                    <p class="name">${data.name}</p>
                    <p class="id">${data.id}</p>
                    <p class="location">${data.location ? data.location.name : 'Not available'}</p>
                <div class="about">
                    <p class="birthday">${data.birthday || 'Not available'}</p>
                    <p class="gender">${data.gender || 'Not available'}</p>
                    <p class="age">${data.age_range ? data.age_range.min : 'Not available'}</p>
                </div>
            `;

            document.getElementById("posts").innerHTML =`
                ${postsHtml}
            `
        })
        .catch(err => console.error(err));
}