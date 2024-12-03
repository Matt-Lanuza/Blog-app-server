# Workout API


## Team Member:
- **Matt Lanuza**

---

## User Credentials
### Dummy Users
- **email**: admin@blog.com  
- **password**: admin1234


### Dummy User
- **email**: dummy@blog.com  
- **password**: dummy1234 <br><br>

---

## Features and Routes:

### User Management:
- **User Registration**  
  - **Route**: `POST /users/register`  
  - **Description**: Allows new users to register.  
- **User Login**  
  - **Route**: `POST /users/login`  
  - **Description**: Authenticates users and returns a token.
- **Get User Details**  
  - **Route**: `GET /users/details`  
  - **Description**: Returns the user's details.

---

### **Blog Post Resources**

- **Create a New Blog Post (authenticated user)**  
  - **Route**: `POST /posts/createPost`  
  - **Description**: Allows authenticated users to add a new blog post.

- **Get All Blog Posts (all users)**  
  - **Route**: `GET /posts/getAllPosts`  
  - **Description**: Fetches all blog posts.

- **Get a Blog Post by ID (all users)**  
  - **Route**: `GET /posts/getPost/:id`  
  - **Description**: Fetches a specific blog post by its ID.

- **Get All My Blog Posts (authenticated user)**  
  - **Route**: `GET /posts/getMyPosts`  
  - **Description**: Fetches all blog posts of the authenticated user.

- **Edit a Blog Post by ID (authenticated user)**  
  - **Route**: `PUT /posts/editPost/:id`  
  - **Description**: Updates a blog post's details by its ID. Only accessible to the post's owner.

- **Delete a Blog Post by ID (authenticated user)**  
  - **Route**: `DELETE /posts/deletePost/:id`  
  - **Description**: Deletes a specific blog post by its ID. Only accessible to the post's owner.

- **Delete Any Blog Post by ID (admin user)**  
  - **Route**: `DELETE /posts/adminDeletePost/:id`  
  - **Description**: Allows admin users to delete any blog post by its ID.

- **Add a Comment to a Blog Post (authenticated user)**  
  - **Route**: `PATCH /posts/addComment/:id`  
  - **Description**: Adds a comment to a blog post by its ID. Only accessible to authenticated users.

- **Get All Comments for a Blog Post (all users)**  
  - **Route**: `GET /posts/getComments/:id`  
  - **Description**: Fetches all comments for a specific blog post by its ID.

- **Delete Any Comments on a Blog Post by ID (admin user)**  
  - **Route**: `DELETE /posts/adminDeleteComment/:id`  
  - **Description**: Deletes all comments for a specific blog post by its ID. Only accessible to admin users.