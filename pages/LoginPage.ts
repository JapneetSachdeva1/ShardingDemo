import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly myAccountHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.getByLabel('Email address');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.myAccountHeading = this.page.getByRole('heading', { name: 'My account' });
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.myAccountHeading).toBeVisible();
  }
}

