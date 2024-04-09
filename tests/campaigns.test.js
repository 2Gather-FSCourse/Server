const request = require('supertest');
const app = require('../app/app');
const campaignsRepository = require('../repositories/campaignsRepository');
const { ServerError } = require('../errors/errors');

jest.mock('../repositories/campaignsRepository');

describe('GET /campaigns', () => {
    beforeEach(()=> jest.clearAllMocks());

    it('should return 200 and all campaigns', async () => {
        const mockCampaigns = [{
            _id:"6605aa2fb1c97be899f8526b",
            founderId:"660447a87061566700714e3a",
            title:"title",
            orgId:"6605781abca1af49c582a734",
            startDate:"09/04/2024",
            endDate:"09/04/2024",
            goal:100,
            campaignType:"campaignType",
            campaignCategory:"campaignCategory",
        },{
            _id:"6615433ca2089270235760a5",
            founderId:"661545026d0c1f83daad54df",
            title:"title",
            orgId:"6613f10831cf830e508cf0e9",
            startDate:"09/04/2024",
            endDate:"09/04/2024",
            goal:100,
            campaignType:"campaignType",
            campaignCategory:"campaignCategory",
        }];
        campaignsRepository.fetchCampaigns.mockResolvedValue(mockCampaigns);
        const response = await request(app).get('/campaigns');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCampaigns);
    });

    it('should return 404 if no campaigns found', async () => {
        campaignsRepository.fetchCampaigns.mockResolvedValue([]);
        const response = await request(app).get('/campaigns');
        expect(response.status).toBe(404);
    });

    it('should return 500 if server error', async () => {
        campaignsRepository.fetchCampaigns.mockRejectedValue(new ServerError());
        const response = await request(app).get('/campaigns');
        expect(response.status).toBe(500);
    });
});

describe('GET /campaigns/:campaignId', () => {
    beforeEach(()=> jest.clearAllMocks());

    it('should return 200 and the campaign', async () => {
        const mockCampaign = {
            _id:"6605aa2fb1c97be899f8526b",
            founderId:"660447a87061566700714e3a",
            title:"title",
            orgId:"6605781abca1af49c582a734",
            startDate:"09/04/2024",
            endDate:"09/04/2024",
            goal:100,
            campaignType:"campaignType",
            campaignCategory:"campaignCategory",
        };

        campaignsRepository.retrieveCampaignById.mockResolvedValue(mockCampaign);
        const response = await request(app).get('/campaigns/6605aa2fb1c97be899f8526b');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCampaign);
    });

    it('should return 404 if no campaign found', async () => {
        campaignsRepository.retrieveCampaignById.mockResolvedValue(null);
        const response = await request(app).get('/campaigns/6605aa2fb1c97be899f8526b');
        expect(response.status).toBe(404);
    });

    it('should return 500 if server error', async () => {
        campaignsRepository.retrieveCampaignById.mockRejectedValue(new ServerError());
        const response = await request(app).get('/campaigns/6605aa2fb1c97be899f8526b');
        expect(response.status).toBe(500);
    });
});

describe('POST /campaigns', () => {
    beforeEach(()=> jest.clearAllMocks());

    it('should return 200 and the new campaign', async () => {
        const mockCampaign = {
            _id:"6605aa2fb1c97be899f8526b",
            founderId:"660447a87061566700714e3a",
            title:"title",
            orgId:"6605781abca1af49c582a734",
            startDate:"09/04/2024",
            endDate:"09/04/2024",
            goal:100,
            campaignType:"campaignType",
            campaignCategory:"campaignCategory",
        };

        campaignsRepository.newCampaign.mockResolvedValue(mockCampaign);
        const response = await request(app).post('/campaigns').send(mockCampaign);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCampaign);
    });

    it('should return 500 if server error', async () => {
        campaignsRepository.newCampaign.mockRejectedValue(new ServerError());
        const response = await request(app).post('/campaigns');
        expect(response.status).toBe(500);
    });
});

describe('PUT /campaigns/:campaignId', () => {
    beforeEach(()=> jest.clearAllMocks());

    it('should return 200 and the updated campaign', async () => {
        const mockCampaign = {
            _id:"6605aa2fb1c97be899f8526b",
            founderId:"660447a87061566700714e3a",
            title:"title",
            orgId:"6605781abca1af49c582a734",
            startDate:"09/04/2024",
            endDate:"09/04/2024",
            goal:100,
            campaignType:"campaignType",
            campaignCategory:"campaignCategory",
        };

        campaignsRepository.putCampaign.mockResolvedValue(mockCampaign);
        const response = await request(app).put('/campaigns/6605aa2fb1c97be899f8526b').send(mockCampaign);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCampaign);
    });

    it('should return 404 if no campaign found', async () => {
        campaignsRepository.putCampaign.mockResolvedValue(null);
        const response = await request(app).put('/campaigns/6605aa2fb1c97be899f8526b');
        expect(response.status).toBe(404);
    });

    it('should return 500 if server error', async () => {
        campaignsRepository.putCampaign.mockRejectedValue(new ServerError());
        const response = await request(app).put('/campaigns/6605aa2fb1c97be899f8526b');
        expect(response.status).toBe(500);
    });
});

