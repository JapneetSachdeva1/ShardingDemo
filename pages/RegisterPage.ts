import { Page,Locator } from '@playwright/test';

export type RegisteredUserCredentials = {
  email: string;
  password: string;
};

export class RegisterPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly streetInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countrySelect: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = this.page.getByLabel('First name');
    this.lastNameInput = this.page.getByLabel('Last name');
    this.dateOfBirthInput = this.page.getByLabel('Date of Birth *');
    this.streetInput = this.page.getByLabel('Street');
    this.postalCodeInput = this.page.getByLabel('Postal code');
    this.cityInput = this.page.getByLabel('City');
    this.stateInput = this.page.getByLabel('State');
    this.countrySelect = this.page.getByRole('combobox', { name: 'Country' });
    this.phoneInput = this.page.getByLabel('Phone');
    this.emailInput = this.page.getByLabel('Email address');
    this.passwordInput = this.page.getByLabel('Password');
    this.registerButton = this.page.getByRole('button', { name: 'Register' });
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/register');
  }

  async registerValidRandomUser(): Promise<RegisteredUserCredentials> {
    const { faker } = await import('@faker-js/faker');
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const street = faker.location.streetAddress();
    const postalCode = faker.location.zipCode();
    const city = faker.location.city();
    const state = faker.location.state();
    const phone = '15551234567';
    const email = faker.internet.email({ firstName, lastName });
    const password = 'Aa1@testPwd';
    const dateOfBirth = '1990-01-01';

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.dateOfBirthInput.fill(dateOfBirth);
    await this.streetInput.fill(street);
    await this.postalCodeInput.fill(postalCode);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.countrySelect.selectOption({ label: 'United States of America (the)' });
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.registerButton.click();

    return { email, password };
  }
}

