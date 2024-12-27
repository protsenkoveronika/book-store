const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../src/models/User');
const Book = require('../src/models/Book');
const Reservation = require('../src/models/Reservation');

const jwt = require('jsonwebtoken');

let userToken;
let userId;
let bookId;

beforeAll(async () => {
    await mongoose.connect(MONGO_URI);

    const user = new User({
        username: 'testuser1',
        email: 'testuser1@example.com',
        password: 'password123'
    });
    await user.save();
    userId = user._id;

    userToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
});

afterEach(async () => {
    await Book.deleteMany();
    await Reservation.deleteMany();
});

afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
});

describe('BookController', () => {
    it('should create a new book', async () => {
        const response = await request(app)
            .post('/new')
            .set('Authorization', `Bearer ${userToken}`)
            .field('name', 'Test Book')
            .field('author', 'Test Author')
            .field('location', 'Test Location')
            .field('description', 'Test Description')
            .field('contactPhone', '+380123456789')
            .attach('photo', Buffer.from('photo'), 'photo.jpg');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'Test Book');
        bookId = response.body._id;
    });

    it('should fetch all books', async () => {
        await Book.create({
            name: 'Sample Book',
            author: 'Sample Author',
            location: 'Sample Location',
            contactPhone: '123456789',
            photo: 'sample.jpg',
            owner: userId
        });

        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should fetch a book by ID', async () => {
        const book = await Book.create({
            name: 'Sample Book',
            author: 'Sample Author',
            location: 'Sample Location',
            contactPhone: '123456789',
            photo: 'sample.jpg',
            owner: userId
        });

        const response = await request(app).get(`/${book._id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Sample Book');
    });
});

describe('ReservationController', () => {
    it('should reserve a book', async () => {
        const book = await Book.create({
            name: 'Book to Reserve',
            author: 'Author',
            location: 'Location',
            contactPhone: '123456789',
            photo: 'photo.jpg',
            owner: userId
        });

        const response = await request(app)
            .post(`/reserve/${book._id}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                firstName: 'John',
                lastName: 'Doe',
                address: '123 Street',
                phoneNumber: '987654321'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('reservation');
    });

    it('should fetch reservation details by book ID', async () => {
        const book = await Book.create({
            name: 'Book to Fetch Reservation',
            author: 'Author',
            location: 'Location',
            contactPhone: '123456789',
            photo: 'photo.jpg',
            owner: userId
        });

        const reservation = await Reservation.create({
            book: book._id,
            reservedBy: userId,
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Street',
            phoneNumber: '987654321'
        });

        const response = await request(app)
            .get(`/reservation/${book._id}`)
            .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', reservation._id.toString());
    });
});

describe('AuthController', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/register')
            .send({
                username: 'newuser',
                email: 'newuser@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should log in a user', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'testuser1@example.com',
                password: 'password123'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should fetch user profile', async () => {
        const response = await request(app)
            .get('/profile')
            .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser1');
    });
});
