const request = require('supertest');
const app = require('../app');
const donationsRepository = require('../repositories/donationsRepository');
const { ServerError } = require('../errors/errors');

jest.mock('../repositories/donationsRepository');

describe('GET /donations', () => {
    beforeEach(()=> jest.clearAllMocks());

    it('should return 200 and all donations', async () => {
        const mockDonations = [{
            _id:"6605aa2fb1c97be899f8526b",
            campaignId:"660447a87061566700714e3a",
            userId:"6605781abca1af49c582a734",
            transactionId:"pi_3OzMqXDgt4I0wPiK18L5fkow",
            amount:100,
            confirmation:true,
            itemList:[]
        },{
            _id:"6615433ca2089270235760a5",
            campaignId:"661545026d0c1f83daad54df",
            userId:"6613f10831cf830e508cf0e9",
            transactionId:"pi_3OzMqXDgt4I0wPiK18L5fkow",
            amount:100,
            confirmation:true,
            itemList:[],
            transactionDate:"09/04/2024",
        }];
        donationsRepository.findDonations.mockResolvedValue(mockDonations);
        const response = await request(app).get('/donations');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockDonations);
    });
}
