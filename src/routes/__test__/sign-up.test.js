const request = require('supertest');
const app = require('../../app');

it('returns a 201 on successful sign up', async () => {
  return request(app)
    .post('/api/auth/sign-up')
    .send({
      firstName: 'Vishnu',
      lastName: 'Vardhan',
      username: 'vardhan6',
      password: 'ilovemyself',
      dob: '02-Sep-1999',
      phoneNumber: '+918667375219',
      storeId: '123',
      userType: 'user',
    })
    .expect(201);
});
