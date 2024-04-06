const request = require('supertest');
const app = require('../app');
const donationsRepository = require('../repositories/donationsRepository');
const { ServerError } = require('../errors/errors');

jest.mock('../repositories/donationsRepository');
