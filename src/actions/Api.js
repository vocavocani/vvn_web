import superagent from 'superagent';

class API {
  constructor() {
    this.base_url = 'http://52.78.25.56:3000';
  }

  get(url, is_auth) {
    return new Promise((resolve, reject) => {
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
          console.error('ERROR Response:', res.body);
          reject(res.body);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  post(url, data, is_auth) {
    return new Promise((resolve, reject) => {
      const request = superagent.post(`${this.base_url}${url}`);

      if (is_auth) {
        request.set('token', localStorage.getItem('token'));
      }

      if (data) {
        request.send(data);
      }

      request.end((err, res) => {
        if (err) {
          if (res.status === 401) {
            localStorage.removeItem('token');
            return location.href = '/login';
          }
          console.error('ERROR Response:', res.body);
          reject(res.body[0]);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  post(url, data, files, is_auth) {
    return new Promise((resolve, reject) => {
      const request = superagent.post(`${this.base_url}${url}`);

      if (is_auth) {
        request.set('token', localStorage.getItem('token'));
      }

      if (data) {
        const keys = Object.keys(data);

        keys.forEach((key) => {
          request.field(key, data[key]);
        });
      }

      if (files) {
        const keys = Object.keys(files);

        keys.forEach((key) => {
          request.attach(key, files[key]);
        });
      }

      request.end((err, res) => {
        if (err) {
          if (res.status === 401) {
            localStorage.removeItem('token');
            return location.href = '/login';
          }
          console.error('ERROR Response:', res.body);
          reject(res.body[0]);
        } else {
          resolve(res.body);
        }
      });
    });
  }
}

const api = new API();

export default api;