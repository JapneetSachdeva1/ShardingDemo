import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('Customer registration UI', () => {
  test('registers a valid new user via UI', async ({ page }) => {
    // Arrange
    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    // Act
    await registerPage.registerValidRandomUser();

    // Assert
    await expect(page).toHaveURL(/\/auth\/login$/);
  });
});

