import conn from './conn.js'

export async function registerUser (username, password_md5, email) {
  const sql = 'INSERT INTO users (username, password_md5, email) VALUES ($1,MD5($2),$3)'
  await conn.query(sql, [username, password_md5, email])
  return true
}

export async function loginUser (username, password_md5) {
  const sql =
    'SELECT id, username, email, role FROM users WHERE username = $1 AND password_md5 = MD5($2)'
  const result = await conn.query(sql, [username, password_md5])
  return result.rows[0]
}

export async function getUserById (id) {
  const sql = 'SELECT * FROM users WHERE id = $1'
  const result = await conn.query(sql, [id])
  return result.rows[0].length > 0 ? 'No user found.' : result.rows
}

export async function getPosts () {
  const result = await conn.query('SELECT * FROM blog_posts')
  return result.rows.length > 0 ? result.rows : 'No posts found.'
}

export async function getPostByID (id) {
  const sql = 'SELECT * FROM blog_posts WHERE id = $1'
  const result = await conn.query(sql, [id])
  return result.rows[0] > 0 ? 'No post found.' : result.rows[0]
}

export async function createPost (title, information, author_id, author_name, family, diet, funfact) {
  const sql =
    'INSERT INTO blog_posts (title, information, author_id, author_name, family, diet,funfact) VALUES ($1, $2, $3, $4, $5, $6, $7)'
  await conn.query(sql, [title, information, author_id, author_name, family, diet, funfact])
  return true
}
export async function updatePost (id, title, information, family, diet, funfact) {
  const sql =
    'UPDATE blog_posts SET title = $1, information = $2, family = $3, diet = $4, funfact = $7 WHERE id = $5'
  await conn.query(sql, [title, information, family, diet, id, funfact])
  return true
}

export async function deletePost (id) {
  const sql = 'DELETE FROM blog_posts WHERE id = $1'
  const result = await conn.query(sql, [id])
  return result.affectedRows > 0
    ? 'Post with ID ${id} not found or already deleted!'
    : 'Post with ID ${id} has been deleted!'
}
