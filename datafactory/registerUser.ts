import { request, expect } from '@playwright/test';

export async function registerNewUser(email: string, password: string) {
  const apiURL = process.env.API_URL ?? 'https://api.practicesoftwaretesting.com';

  const createRequestContext = await request.newContext();
  const { faker } = await import('@faker-js/faker');
  const response = await createRequestContext.post(`${apiURL}/users/register`, {
    data: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      dob: '1990-12-12',
      phone: '0000099999',
      email,
      password,
      address: {
        street: '18443 Dickinson Expressway',
        city: 'Greenholtland',
        state: 'WY',
        country: 'IN',
        postal_code: '90518',
      },
    },
  });
  expect(response.status()).toEqual(201);
  return response;
}


