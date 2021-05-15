const request = require('supertest');
const app = require('../../app');

it('returns a 201 on successful sign up', async () => {
  return request(app)
    .post('/api/auth/sign-up')
    .send({
      firstName: 'Vishnu',
      lastName: 'Vardhan',
      username: 'vvardhan',
      password: 'ilovemyself',
      dob: '02-Sep-1999',
      phoneNumber: '+918667375219',
    })
    .expect(201);
});