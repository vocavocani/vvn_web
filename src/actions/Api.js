import request from 'superagent';

class API {
  constructor() {
    this.BaseURL = 'http://localhost:3000';
  }

  get(url, is_auth) {
    return new Promise ((reslove, reject) => {
      request
      .get(`${this.BaseURL}${url}`)
      .end((err, res) => {
        if (err) {
          console.log('ERROR Response:', res.body);
          reject(res.body[0]);
        } else {
          reslove(res.body[0]);
        }
      });
    });
  }

  post(url, data, is_auth) {
    return new Promise ((reslove, reject) => {
      request
      .post(`${this.BaseURL}${url}`)
      .send(data)
      .end((err, res) => {
        if (err) {
          console.log('ERROR Response:', res.body);
          reject(res.body[0]);
        } else {
          reslove(res.body[0]);
        }
      });
    });
  }
}

const api = new API();

export default api;