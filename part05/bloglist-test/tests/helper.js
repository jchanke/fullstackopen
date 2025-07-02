const createUser = async (request, userDetails) => {
  await request.post('/api/users', { data: userDetails })
}

const loginWith = async (page, username, password) => {
  await page.locator('input[name="username"]').fill(username)
  await page.locator('input[name="password"]').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blogDetails) => {
  const { title, author, url } = blogDetails
  await page.getByRole('button', { name: 'new note' }).click();
  await page.locator('#title-input').fill(title);
  await page.locator('#author-input').fill(author);
  await page.locator('#url-input').fill(url);
  await page.getByRole('button', { name: 'create' }).click();
}

const logoutFrom = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click();
}

export { createUser, loginWith, createBlog, logoutFrom }