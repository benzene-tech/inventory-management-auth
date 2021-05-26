const request = require('supertest');
const app = require('../../app');

it('returns a 200 on successful sign in', () => {
  return request(app)
    .post('/api/auth/sign-in')
    .send({
      username: 'vardhan',
      password: 'ilovemyself',
    })
    .expect(200);
});
