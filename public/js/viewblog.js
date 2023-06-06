const commentFormHandler = async (event) => {
    console.log('commentFormHandler')
    event.preventDefault();

    // Collect values from the comment form
    const comment_body = document.querySelector('#new-comment').value.trim();
    if (comment_body) {
        const userID_El = document.querySelector('#user-id');
        const user_id = userID_El.getAttribute('data-user-id');;

        const postID_el = document.querySelector('#blog-title');
        var blog_id = postID_el.getAttribute('data-blog-id');

        // Send a POST request to the API endpoint
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({ comment_body, user_id, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, refresh to view comment
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);


const blogID = document.querySelector('#username').getAttribute('data-blog-owner');
const userID = document.querySelector('#delete-blog').getAttribute('data-user-id');

if (blogID === userID) {
    document.querySelector('#delete-blog').classList.remove('is-hidden');
    document.querySelector('#edit-blog').classList.remove('is-hidden');
} else {
    document.querySelector('#delete-blog').classList.add('is-hidden');
    document.querySelector('#edit-blog').classList.add('is-hidden');
}

document.querySelector('#delete-blog').addEventListener('click', async (event) => {

    event.preventDefault();

    const blogID = document.querySelector('#blog-title').getAttribute('data-blog-id');

    const response = await fetch(`/api/blog/${blogID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // If successful, refresh to view comment
            document.location.replace('/blogs');
    } else {
        alert(response.statusText);
    }
});

document.querySelector('#edit-blog').addEventListener('click', async (event) => {

    event.preventDefault();

    const blogID = document.querySelector('#blog-title').getAttribute('data-blog-id');

    
    document.location.replace(`/blogs/${blogID}`);

});

document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.comment-delete');
    const userID = document.querySelector('#delete-blog').getAttribute('data-user-id');

    deleteButtons.forEach(button => {
        const commentOwner = button.getAttribute('data-comment-user');
        console.log('commentOwner', commentOwner)
        console.log('userID', userID)
        if (commentOwner === userID) {
            button.classList.remove('is-hidden');
        } else {
            button.classList.add('is-hidden');
        }
    });
});

const deleteButtons = document.querySelectorAll('.comment-delete');

deleteButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    event.stopPropagation();

    const commentID = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comment/${commentID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  });
});