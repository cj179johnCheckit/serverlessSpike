const DEFAULT_CODE = 200;
const DEFAULT_HEADER = {
  'content-type': 'application/json'
};

class Response {
  constructor() {
    this.code = DEFAULT_CODE;
    this.header = DEFAULT_HEADER;
  }

  setBody(body) {
    this.body = body;
    return this;
  }

  getResponse() {
    return {
      code: this.code,
      header: this.header,
      body: this.body
    };
  }
}

module.exports = Response;