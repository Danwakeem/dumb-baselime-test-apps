import supertest from 'supertest';
import defaults from 'superagent-defaults';
import { getBaseUrl } from './getBaseUrl';

type SuperTestClient = supertest.SuperTest<supertest.Test>;

describe("Producer", () => {
  let request: SuperTestClient;
  beforeAll(async () => {
    const baseUrl = await getBaseUrl();
    console.log(baseUrl);
    request = defaults(supertest(baseUrl));
    request.set('Content-Type', 'application/json');
  });

  it('should return 200', async () => {
    await request
      .get('/')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: 'Event published!' });
      });
  });
});