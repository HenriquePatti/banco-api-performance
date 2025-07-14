import http from "k6/http";
import { sleep, check } from "k6";
import { obterToken } from "../helpers/autenticacao.js";

export const options = {
  interations: 1,
};

export default function () {
  const token = obterToken();

  const url = "http://localhost:3000/login";
  const payload = JSON.stringify({
    contaOrigem: 1,
    contaDestino: 2,
    valor: 100,
    token: "",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };

  const response = http.post(url, payload, params);
  check(response, {
    "is status code 201": (r) => r.status === 201,
  });

  sleep(1);
}
