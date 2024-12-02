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

- **Create a New Blog Post**  
  - **Route:** `POST /posts/addBlogPost`  
  - **Description:** Allows users to add a new blog post.  
- **Get All Blog Posts**  
  - **Route:** `GET /posts/getAllBlogPosts`  
  - **Description:** Fetches all blog posts.  
- **Get a Blog Post by ID**  
  - **Route:** `GET /posts/getBlogPost/:id`  
  - **Description:** Fetches a single blog post by its ID.  
- **Update a Blog Post by ID**  
  - **Route:** `PUT /posts/updateBlogPost/:id`  
  - **Description:** Updates the details of a blog post by its ID.  
- **Delete a Blog Post by ID**  
  - **Route:** `DELETE /posts/deleteBlogPost/:id`  
  - **Description:** Deletes a specific blog post using its ID.  
- **Add a Comment to a Blog Post**  
  - **Route:** `PATCH /posts/addComment/:id`  
  - **Description:** Adds a comment to a blog post by its ID.  
- **Get All Comments for a Blog Post**  
  - **Route:** `GET /posts/getComments/:id`  
  - **Description:** Fetches all comments for a specific blog post by its ID.  
