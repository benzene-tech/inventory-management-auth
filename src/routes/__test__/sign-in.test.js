const request = require('supertest');
const app = require('../../app');

it('returns a 200 on successful sign in', async () => {
  return request(app)
    .post('/api/auth/sign-in')
    .send({
      username: 'vvardhan',
      password: 'ilovemyself'
    })
    .expect(200);
});
