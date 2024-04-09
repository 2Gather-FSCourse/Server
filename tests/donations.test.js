const request = require('supertest');
const app = require('../app/app');
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

    it('should return 404 if no donations found', async () => {
        donationsRepository.findDonations.mockResolvedValue([]);
        const response = await request(app).get('/donations');
        expect(response.status).toBe(404);
    });

    it('should return 500 if server error', async () => {
        donationsRepository.findDonations.mockRejectedValue(new ServerError());
        const response = await request(app).get('/donations');
        expect(response.status).toBe(500);
    });
});

describe('GET /donations/:donationId', () => {
    beforeEach(()=> jest.clearAllMocks());

    it('should return 200 and the donation', async () => {
        const mockDonation = {
            _id:"6605aa2fb1c97be899f8526b",
            campaignId:"660447a87061566700714e3a",
            userId:"6605781abca1af49c582a734",
            transactionId:"pi_3OzMqXDgt4I0wPiK18L5fkow",
            amount:100,
            confirmation:true,
            itemList:[]
        };
        donationsRepository.retrieveDonation.mockResolvedValue(mockDonation);
        const response = await request(app).get('/donations/6605aa2fb1c97be899f8526b');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockDonation);
    });

    it('should return 404 if no donation found', async () => {
        donationsRepository.retrieveDonation.mockResolvedValue(null);
        const response = await request(app).get('/donations/6605aa2fb1c97be899f8526b');
        expect(response.status).toBe(404);
    });

    it('should return 500 if server error', async () => {
        donationsRepository.retrieveDonation.mockRejectedValue(new ServerError());
        const response = await request(app).get('/donations/6605aa2fb1c97be899f8526b');
        expect(response.status).toBe(500);
    });

    it('should return 400 if invalid id', async () => {
        const response = await request(app).get('/donations/123');
        expect(response.status).toBe(400);
    });
});

describe('POST /donations', () => {
    beforeEach(()=> jest.clearAllMocks());

    it('should return 201 and the new donation', async () => {
        const newDonation = {
            _id:"6605aa2fb1c97be899f8526b",
            campaignId:"660447a87061566700714e3a",
            userId:"6605781abca1af49c582a734",
            transactionId:"pi_3OzMqXDgt4I0wPiK18L5fkow",
            amount:100,
            confirmation:true,
            itemList:[]
        };
        donationsRepository.createDonation.mockResolvedValue(newDonation);
        const response = await request(app).post('/donations').send(newDonation);
        expect(response.status).toBe(201);
    });

    it('should return 500 if server error', async () => {
        const newDonation = {
            campaignId:"660447a87061566700714e3a",
            userId:"6605781abca1af49c582a734",
            transactionId:"pi_3OzMqXDgt4I0wPiK18L5fkow",
            amount:100,
            confirmation:true,
            itemList:[]
        };
        donationsRepository.createDonation.mockRejectedValue(new ServerError());
        const response = await request(app).post('/donations').send(newDonation);
        expect(response.status).toBe(500);
    });

    it('should return 400 if missing parameters', async () => {
        const newDonation = {
            transactionId:"pi_3OzMqXDgt4I0wPiK18L5fkow",
            amount:100,
            confirmation:true,
            itemList:[]
        };
        donationsRepository.createDonation.mockResolvedValue(newDonation);
        const response = await request(app).post('/donations').send();
        expect(response.status).toBe(400);
    });
});

describe('PUT /donations/:donationId', () => {
    beforeEach(()=> jest.clearAllMocks());

    it('should return 200 and the updated donation', async () => {
        const updatedDonation = {
            _id:"6605aa2fb1c97be899f8526b",
            campaignId:"660447a87061566700714e3a",
            userId:"6605781abca1af49c582a734",
            transactionId:"pi_3OzMqXDgt4I0wPiK18L5fkow",
            amount:100,
            confirmation:true,
            itemList:[]
        };
        donationsRepository.updateDonation.mockResolvedValue(updatedDonation);
        const response = await request(app).put('/donations/6605aa2fb1c97be899f8526b').send(updatedDonation);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedDonation);
    });

    it('should return 404 if no donation found', async () => {
        donationsRepository.updateDonation.mockResolvedValue(null);
        const response = await request(app).put('/donations/6605aa2fb1c97be899f8526b').send();
        expect(response.status).toBe(404);
    });

    it('should return 500 if server error', async () => {
        donationsRepository.updateDonation.mockRejectedValue(new ServerError());
        const response = await request(app).put('/donations/6605aa2fb1c97be899f8526b').send();
        expect(response.status).toBe(500);
    });

    it('should return 400 if invalid id', async () => {
        donationsRepository.updateDonation.mockResolvedValue([]);
        const response = await request(app).put('/donations/123').send();
        expect(response.status).toBe(400);
    });
});

describe('DELETE /donations/:donationId', () => {
    beforeEach(()=> jest.clearAllMocks());

    it('should return 200 and the deleted donation', async () => {
        const deletedDonation = {
            _id:"6605aa2fb1c97be899f8526b",
            campaignId:"660447a87061566700714e3a",
            userId:"6605781abca1af49c582a734",
            transactionId:"pi_3OzMqXDgt4I0wPiK18L5fkow",
            amount:100,
            confirmation:true,
            itemList:[]
        };
        donationsRepository.deleteDonation.mockResolvedValue(deletedDonation);
        const response = await request(app).delete('/donations/6605aa2fb1c97be899f8526b');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(deletedDonation);
    });

    it('should return 404 if no donation found', async () => {
        donationsRepository.deleteDonation.mockResolvedValue(null);
        const response = await request(app).delete('/donations/6605aa2fb1c97be899f8526b');
        expect(response.status).toBe(404);
    });

    it('should return 500 if server error', async () => {
        donationsRepository.deleteDonation.mockRejectedValue(new ServerError());
        const response = await request(app).delete('/donations/6605aa2fb1c97be899f8526b');
        expect(response.status).toBe(500);
    });

    it('should return 400 if invalid id', async () => {
        donationsRepository.deleteDonation.mockResolvedValue([]);
        const response = await request(app).delete('/donations/123');
        expect(response.status).toBe(400);
    });
});
