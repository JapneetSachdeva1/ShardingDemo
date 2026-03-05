import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { LoginPage } from '../pages/LoginPage';
import { registerNewUser } from '../datafactory/registerUser';


test.describe('Customer login', () => {
  test('logs in a valid user and saves storage state', async ({ page }) => {
    // Arrange
    const email = `user_${Date.now()}@example.com`;
    const password = 'Aa1@testPwd';
    await registerNewUser(email, password);

    const credentials = { email, password };

    const credentialsPath = path.resolve(__dirname, '..', '.auth', 'credentials.json');
    await fs.mkdir(path.dirname(credentialsPath), { recursive: true });
    await fs.writeFile(credentialsPath, JSON.stringify(credentials, null, 2), 'utf-8');

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login(credentials.email, credentials.password);

    // Assert
    await expect(page).toHaveURL(/\/account$/);
    //https://practicesoftwaretesting.com/account

    const storageStatePath = path.resolve(__dirname, '..', '.auth', 'storageState.json');
    await fs.mkdir(path.dirname(storageStatePath), { recursive: true });
    await page.context().storageState({ path: storageStatePath });
  });
});

