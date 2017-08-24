import superagent from 'superagent';

class API {
  constructor() {
    this.base_url = 'http://52.78.25.56:3000';
  }

  get(url, is_auth) {
    return new Promise((reslove, reject) => {
      const request = superagent.get(`${this.base_url}${url}`);

      if (is_auth) {
        request.set('token', localStorage.getItem('token'));
      }

      request.end((err, res) => {
        if (err) {
          console.log(res);
          if (res.status === 401) {
            localStorage.removeItem('token');
            return location.href = '/login';
          }
          console.log('ERROR Response:', res.body);
          reject(res.body[0]);
        } else {
          reslove(res.body);
        }
      });
    });
  }

  post(url, data, is_auth) {
    return new Promise((reslove, reject) => {
      const request = superagent.post(`${this.base_url}${url}`);

      if (is_auth) {
        request.set('token', localStorage.getItem('token'));
      }

      if (data) {
        request.send(data)
      }

      request.end((err, res) => {
        if (err) {
          if (res.status === 401) {
            localStorage.removeItem('token');
            return location.href = '/login';
          }
          console.log('ERROR Response:', res.body);
          reject(res.body[0]);
        } else {
          reslove(res.body);
        }
      });
    });
  }
}

const api = new API();

export default api;