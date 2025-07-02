const { test, expect, beforeEach, describe } = require('@playwright/test')
const testHelper = require('./helper')

describe('Blog app', () => {
  const blogs = [
    {
      title: 'this blog is created by playwright',
      author: 'Matti Luukkainen',
      url: 'http://mattisblog.com',
    },
    {
      title: 'a seconnd test blog',
      author: 'Alan Turing',
      url: 'http://alansblog.com',
    },
    {
      title: 'a third blog',
      author: 'Alonzo Church',
      url: 'http://alonzosblog.com',
    },
  ]

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await testHelper.createUser(request, {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    })
    await testHelper.createUser(request, {
      name: 'Juha Tauriainen',
      username: 'jtauriai',
      password: 'juhataur',
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
    const username = page.locator('input[name="username"]')
    const password = page.locator('input[name="password"]')
    await expect(username).toBeVisible()
    await expect(username).toBeEmpty()
    await expect(password).toBeVisible()
    await expect(password).toBeEmpty()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await testHelper.loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByRole('heading')).toContainText('blogs')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'new note' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await testHelper.loginWith(page, 'mluukkai', 'BAD_PASSWORD')

      const notifDiv = page.locator('.notification')
      await expect(notifDiv).toContainText('wrong username or password')
      await expect(notifDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(notifDiv).toHaveCSS('border-style', 'solid')

      await expect(page.getByText('Matti Lukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await testHelper.loginWith(page, 'mluukkai', 'salainen')
    })

    test('the user can log out', async ({ page }) => {
      await testHelper.logoutFrom(page)
      await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
    })

    test('a new blog can be created and becomes visible', async ({ page }) => {
      const blog = blogs[0]

      // blog is not visible
      let blogDiv = page.getByText(`${blog.title} ${blog.author}`)
      await expect(blogDiv).toBeHidden();

      // a new blog can be created; afterward, form is no longer visible
      await testHelper.createBlog(page, blog)
      await expect(page.locator('#title-input')).toBeHidden();
      await expect(page.locator('#author-input')).toBeHidden();
      await expect(page.locator('#url-input')).toBeHidden();

      const notifDiv = page.locator('.notification')
      await expect(notifDiv).toContainText(`a new blog ${blog.title} by ${blog.author}`)

      // now it's visible
      blogDiv = page.getByText(`${blog.title} ${blog.author}`)
      await expect(blogDiv).toBeVisible();
    })

    describe('when a blog is created and expanded', () => {
      beforeEach(async ({ page }) => {
        const blog = blogs[0]
        await testHelper.createBlog(page, blog)
        await page.getByRole('button', { name: 'view' }).click();
      })

      test('the blog can then be viewed, and hidden again', async ({ page }) => {
        // after clicking 'view', they're visible
        await expect(page.getByText('likes 0')).toBeVisible();
        await expect(page.getByText('http://mattisblog.com')).toBeVisible();
        await expect(page.getByText('Matti Luukkainen', { exact: true })).toBeVisible();

        // after clicking 'hide', they're invisible again
        await page.getByRole('button', { name: 'hide' }).click();
        await expect(page.getByText('likes 0')).toBeHidden();
        await expect(page.getByText('http://mattisblog.com')).toBeHidden();
        await expect(page.getByText('Matti Luukkainen', { exact: true })).toBeHidden();
      })

      test('the blog can be liked', async ({ page }) => {
        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 2')).toBeVisible()
      })

      test('the blog can be deleted by its creator', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())

        // the blog is there
        await expect(page.getByText('likes 0')).toBeVisible();
        await expect(page.getByText('http://mattisblog.com')).toBeVisible();
        await expect(page.getByText('Matti Luukkainen', { exact: true })).toBeVisible();

        const deleteButton = page.getByRole('button', { name: 'remove' })
        await expect(deleteButton).toBeVisible()
        await deleteButton.click();

        // after a while, it's not there anymore
        await expect(page.getByText('likes 0')).not.toBeVisible();
        await expect(page.getByText('http://mattisblog.com')).not.toBeVisible();
        await expect(page.getByText('Matti Luukkainen', { exact: true })).not.toBeVisible();
      })

      test('the \'delete\' button doens\'t appear if it\'s someone else', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())

        // log-out and log-in as someone else
        await testHelper.logoutFrom(page)
        await testHelper.loginWith(page, 'jtauriai', 'juhataur')
        await page.getByRole('button', { name: 'view' }).click();

        // the blog is there
        await expect(page.getByText('likes 0')).toBeVisible();
        await expect(page.getByText('http://mattisblog.com')).toBeVisible();
        await expect(page.getByText('Matti Luukkainen', { exact: true })).toBeVisible();

        // but the delete button doesn't appear
        expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    describe('and when there are multiple blogs', () => {
      beforeEach(async ({ page }) => {
        for (let i = 0; i < blogs.length; i++) {
          const blog = blogs[i]
          await testHelper.createBlog(page, blog)
          const blogDiv = page.locator('.blog').filter({ hasText: blog.title })
          await blogDiv.getByRole('button', { name: 'view' }).click()
          for (let j = 0; j < i + 2; j++) {
            await blogDiv.getByRole('button', { name: 'like' }).click()
            await expect(blogDiv).toContainText(`likes ${j + 1}`)
          }
        }
      })

      test('blogs are sorted by likes, in desc order', async ({ page }) => {
        // get the like counts from each blog
        const blogs = await page.locator('.blog').all()
        const likes = await Promise.all(
          blogs.map(async (blog) => {
            const text = await blog.innerText()
            const match = text.match(/likes (\d+)/)
            return match ? parseInt(match[1], 10) : -1
          })
        )

        // assert they are in descending order
        const sorted = [...likes].sort((a, b) => b - a)
        expect(likes).toEqual(sorted)
      })
    })
  })
})