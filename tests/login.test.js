import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  iterations: 10,
};

export default function () {
  const url = 'http://localhost:3000/login';
  const payload = JSON.stringify({
    username: 'julio.lima',
    senha: '123456',
  });

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