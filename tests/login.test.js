import http from 'k6/http';
import { sleep, check } from 'k6';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));

export const options = {
  iterations: 10,
  thresholds: {
    http_req_duration: ['p(90)<10', 'max<10'],
    http_req_failed: ['rate<0.05']
  }
};

export default function () {
  const url = 'http://localhost:3000/login';
  const payload = JSON.stringify(postLogin);

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  };

  const response = http.post(url, payload, params);
    check(response, {
        'is status code 200': (r) => r.status === 200,
        'token size is 169': (r) => r.json().token.length === 169,
    })

  sleep(1);
}