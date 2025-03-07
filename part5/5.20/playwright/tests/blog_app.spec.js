const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  const user = {
    name: 'Daniel Dondo',
    username: 'minisx',
    password: '123456789'
  }

  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {data: user})
    
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible()
    await expect(page.getByText('log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {

      await page.getByTestId('username').fill(user.username)
      await page.getByTestId('password').fill(user.password)
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      
      await page.getByTestId('username').fill(user.username.concat('a'))
      await page.getByTestId('password').fill(user.password.concat('a'))
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill(user.username)
      await page.getByTestId('password').fill(user.password)
      await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('title')
      await textboxes[1].fill('author')
      await textboxes[2].fill('url')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('title author')).toBeVisible()
    })

    
    test('blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()

      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('title')
      await textboxes[1].fill('author')
      await textboxes[2].fill('url')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name : 'view' }).click()
      await page.getByRole('button', { name : 'like' }).click()

      await expect(page.locator('.extra_content')).toContainText('1')
    })

  })
})