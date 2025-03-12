const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createNewBlog } = require('./helper')

describe('Blog app', () => {
  const user = {
    name: 'Daniel Dondo',
    username: 'minisx',
    password: '123456789'
  }

  beforeEach(async ({ page, request }) => {
    // it was await request.post('http://localhost:3001/api/testing/reset'), but in frontend we have redirect to 3001 when /api is used
    // so http://localhost:5173/api redirects to localhost:3001

    // we could also remove the localhost from here, because we defined it in playwright.config.js
    await request.post('/api/testing/reset')
    await request.post('/api/users', {data: user})
    
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible()
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, user.username, user.password)
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, user.username.concat('a'), user.password.concat('a'))
      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, user.username, user.password)
    })
  
    test('a new blog can be created', async ({ page }) => {
      createNewBlog(page, 'title', 'author', 'url')
      await expect(page.getByText('title author')).toBeVisible()
    })

    
    test('blog can be liked', async ({ page }) => {
      await createNewBlog(page, 'title', 'author', 'url')
      await page.getByRole('button', { name : 'view' }).click()
      await page.getByRole('button', { name : 'like' }).click()

      await expect(page.locator('.extra_content')).toContainText('1')
    })

    test('a new blog can be deleted', async ({ page }) =>{
      await createNewBlog(page, 'title', 'author', 'url')
      await page.getByRole('button', { name : 'view' }).click()

      await expect(page.getByText('title author')).toBeVisible()

      // Handle the confirmation dialog
      page.once('dialog', async (dialog) => {
          expect(dialog.type()).toBe('confirm');
          await dialog.accept();
      });

      await page.getByRole('button', { name : 'remove' }).click()
      await expect(page.getByText('title author')).not.toBeVisible()
    })

    
    test('only the user who added the blog sees the delete button', async ({ page, request }) => {
      await createNewBlog(page, 'title', 'author', 'url')
      await page.getByRole('button', {name : 'logout' }).click()

      const user2 = {
        name: 'Daniel Dondo2',
        username: 'minisx2',
        password: '123456789'
      }
    
      await request.post('/api/users', {data: user2})
      await login(page, user2.username, user2.password)
      await createNewBlog(page, 'title2', 'author2', 'url2')
      await page.getByText('title2 author2').waitFor()

      const viewButton = await page.getByRole('button', { name : 'view' }).first()
      const viewButton2 = await page.getByRole('button', { name : 'view' }).last()

      await viewButton.click()
      await viewButton2.click()

      const deleteButtons = await page.getByRole('button', { name : 'remove' }).all()
      expect(deleteButtons).toHaveLength(1);
    })
  })
})