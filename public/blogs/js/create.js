const postFormHandler = async (event) => {
    console.log('postFormHandler')
    event.preventDefault();

    // Collect values from the comment form
    const title = document.querySelector('#new-title').value.trim();
    const body = document.querySelector('#new-body').value.trim();
    const user_id = document.querySelector('#user-id').getAttribute('data-user-id');

    if (title && body) {

        const pageTitle = document.querySelector('#user-id').textContent;
        console.log('pageTitle', pageTitle  )
        if(pageTitle === 'Edit your blog!') {

            const blogID = document.querySelector('#blog-create').getAttribute('data-blog-id');
            const response = await fetch(`/api/blog/${blogID}`, {
                method: 'PUT',
                body: JSON.stringify({ title, body, user_id}),
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('response', response    )
            if (response.ok) {
                // If successful, refresh to view
                document.location.replace('/blogs');
            } else {
                alert(response.statusText);
            }

        } else {
            const response = await fetch('/api/blog/', {
                method: 'POST',
                body: JSON.stringify({ title, body, user_id}),
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('response', response    )
            if (response.ok) {
                // If successful, refresh to view
                document.location.replace('/blogs');
            } else {
                alert(response.statusText);
            }
        }

    }
};

document
    .querySelector('.post-form')
    .addEventListener('submit', postFormHandler);