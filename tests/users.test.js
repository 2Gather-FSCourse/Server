const request = require('supertest');
const app = require('../app/app');
const usersRepository = require('../repositories/usersRepository');
const { ServerError } = require('../errors/errors');

jest.mock('../repositories/usersRepository');

describe('GET /users', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should return all users', async () => {
        const mockUsers = [{
            _id: '660546e46f3571b6de2d623d',
            userType: 'Donor',
            age: 42,
            phone: '123-456-7890'
        },
            {
                _id: '66054a6850ba7ffe51d68cb3',
                userType: 'Organization',
                orgId: '9876543210fedcba87654321',
                name: 'chipichipichapachapa',
                age: 27,
                phone: '050-555-1234',
            }];

        usersRepository.findUsers.mockResolvedValue(mockUsers);
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUsers);
    });

    it('should return a 404 if no users are found', async () => {
        usersRepository.findUsers.mockResolvedValue([]);
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(404);
    });

    it('should return a 500 if an error occurs', async () => {
        usersRepository.findUsers.mockRejectedValue(new ServerError());
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(500);
    });
});

describe('GET /users/:userId', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should return a user with specific _id', async () => {
        const mockUser = {
            _id: '660546e46f3571b6de2d623d',
            userType: 'Donor',
            age: 42,
            phone: '123-456-7890'
        };

        usersRepository.retrieveUser.mockResolvedValue(mockUser);
        const res = await request(app).get('/users/660546e46f3571b6de2d623d');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUser);
    });

    it('should return a 404 if no user is found', async () => {
        usersRepository.retrieveUser.mockResolvedValue(null);
        const res = await request(app).get('/users/660546e46f3571b6de2d623d');
        expect(res.statusCode).toEqual(404);
    });

    it('should return a 500 if an error occurs', async () => {
        usersRepository.retrieveUser.mockRejectedValue(new ServerError());
        const res = await request(app).get('/users/660546e46f3571b6de2d623d');
        expect(res.statusCode).toEqual(500);
    });

    it('should return a 400 when id is invalid', async () => {
        usersRepository.retrieveUser.mockResolvedValue([]);
        const res = await request(app).get('/users/123');
        expect(res.statusCode).toEqual(400);
    });
});

describe('POST /users', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should create a new user', async () => {
        const mockUser = {
            userType: 'Donor',
            age: 42,
            phone: '123-456-7890'
        };

        usersRepository.createUser.mockResolvedValue(mockUser);
        const res = await request(app).post('/users').send(mockUser);
        expect(res.statusCode).toEqual(201);
    });

    it('should return 400 when missing arguments', async () => {
        const mockUser = {
            age: 42,
            phone: '123-456-7890'
        };

        usersRepository.createUser.mockResolvedValue(mockUser);
        const res = await request(app).post('/users').send(mockUser);
        expect(res.statusCode).toEqual(400);
    });

    it('should return 400 when missing arguments', async () => {
        usersRepository.createUser.mockResolvedValue([]);
        const res = await request(app).post('/users').send();
        expect(res.statusCode).toEqual(400);
    });

    it('should return a 500 if an error occurs', async () => {
        const mockUser = {
            userType: 'Donor',
            age: 42,
            phone: '123-456-7890'
        };
        usersRepository.createUser.mockRejectedValue(new ServerError());
        const res = await request(app).post('/users').send(mockUser);
        expect(res.statusCode).toEqual(500);
    });
});

describe('PUT /users/:userId', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should update a user with specific _id', async () => {
        const mockUser = {
            _id: '660546e46f3571b6de2d623d',
            userType: 'Donor',
            age: 42,
            phone: '123-456-7890'
        };

        usersRepository.updateUser.mockResolvedValue(mockUser);
        const res = await request(app).put('/users/660546e46f3571b6de2d623d').send(mockUser);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUser);
    });

    it('should return a 404 if no user is found', async () => {
        const mockUser = {
            _id: '660546e46f3571b6de2d623d',
            userType: 'Donor',
            age: 42,
            phone: '123-456-7890'
        };
        usersRepository.updateUser.mockResolvedValue([]);
        const res = await request(app).put('/users/660546e46f3571b6de2d623d').send(mockUser);
        expect(res.statusCode).toEqual(404);
    });

    it('should return a 500 if an error occurs', async () => {
        const mockUser = {
            _id: '660546e46f3571b6de2d623d',
            userType: 'Donor',
            age: 42,
            phone: '123-456-7890'
        };
        usersRepository.updateUser.mockRejectedValue(new ServerError());
        const res = await request(app).put('/users/660546e46f3571b6de2d623d').send(mockUser);
        expect(res.statusCode).toEqual(500);
    });

    it('should return a 400 when id is invalid', async () => {
        usersRepository.updateUser.mockResolvedValue([]);
        const res = await request(app).put('/users/123').send([]);
        expect(res.statusCode).toEqual(400);
    });
});


describe('DELETE /users/:userId', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should delete a user with specific _id', async () => {
        const mockUser = {
            _id: '660546e46f3571b6de2d623d',
            userType: 'Donor',
            age: 42,
            phone: '123-456-7890'
        };

        usersRepository.deleteUser.mockResolvedValue(mockUser);
        const res = await request(app).delete('/users/660546e46f3571b6de2d623d');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUser);
    });

    it('should return a 404 if no user is found', async () => {
        usersRepository.deleteUser.mockResolvedValue([]);
        const res = await request(app).delete('/users/660546e46f3571b6de2d623d');
        expect(res.statusCode).toEqual(404);
    });

    it('should return a 500 if an error occurs', async () => {
        usersRepository.deleteUser.mockRejectedValue(new ServerError());
        const res = await request(app).delete('/users/660546e46f3571b6de2d623d');
        expect(res.statusCode).toEqual(500);
    });

    it('should return a 400 when id is invalid', async () => {
        usersRepository.deleteUser.mockResolvedValue([]);
        const res = await request(app).delete('/users/123');
        expect(res.statusCode).toEqual(400);
    });
});
