const utils = require('./utils');
const app = require('../app');

it('should add two numbers', () => {
  const res = utils.add(33, 11);
  if (res !== 44) {
    throw new Error(`Expected 44, but get ${res}`);
  }
});

it('should square the number', () => {
  const res = utils.square(3);
  if (res !== 9) {
    throw new Error(`Expected 9, but get ${res}`);
  }
});

describe('app testing', () => {
  
})
