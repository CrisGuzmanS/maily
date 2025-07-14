import { Mail } from '../dist/maily.esm.js';

Mail.from('test@example.com')
  .to('dest@example.com')
  .subject('Email test')
  .content('<h1>Testing email</h1>')
  .send();
