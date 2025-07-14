const { Mail } = require('../dist/maily.cjs.js');

Mail.from('test@example.com')
  .to('dest@example.com')
  .subject('Email test from CommonJS')
  .content('<h1>Test desde CommonJS</h1>')
  .send();
