document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-blog');
    const editButtons = document.querySelectorAll('.edit-blog');
    const userID = document.querySelector('#user-id').getAttribute('data-user-id');

    deleteButtons.forEach(button => {
        const blogOwner = button.getAttribute('data-blog-owner');
        console.log('blogOwner', blogOwner)
        console.log('userID', userID)
        if (blogOwner === userID) {
            button.classList.remove('is-hidden');
        } else {
            button.classList.add('is-hidden');
        }
    });

    editButtons.forEach(button => {
        const blogOwner = button.getAttribute('data-blog-owner');
        console.log('blogOwner', blogOwner)
        console.log('userID', userID)
        if (blogOwner === userID) {
            button.classList.remove('is-hidden');
        } else {
            button.classList.add('is-hidden');
        }
    });
});

const deleteButtons = document.querySelectorAll('.delete-blog');
const editButtons = document.querySelectorAll('.edit-blog');
const viewButtons = document.querySelectorAll('.view-blog');

deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.stopPropagation();

        const blogID = event.target.getAttribute('data-blog-id');

        const response = await fetch(`/api/blog/${blogID}`, {
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

editButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.stopPropagation();

        const blogID = event.target.getAttribute('data-blog-id');

        document.location.replace(`/blogs/${blogID}`);

    });
});

viewButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.stopPropagation();

        const blogID = event.target.getAttribute('data-blog-id');

        document.location.replace(`/${blogID}`);

    });
});