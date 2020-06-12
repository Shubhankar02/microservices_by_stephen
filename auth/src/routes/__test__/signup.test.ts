import request from "supertest";
import {app} from "../../app";
import {response} from "express";

it('should return a 201 on successful signUp', async () => {
    return request(app)
        .post('/api/users/sign-up')
        .send({
            email: 'test@gmail.com',
            password: 'password'
        })
        .expect(201)
});

it('should return a 400 on invalid email', async () => {
    return request(app)
        .post('/api/users/sign-up')
        .send({
            email: 'test@gmailcom',
            password: 'password'
        })
        .expect(400)
});

it('should return a 400 on invalid password', async () => {
    return request(app)
        .post('/api/users/sign-up')
        .send({
            email: 'test@gmailcom',
            password: 'p'
        })
        .expect(400)
});

it('should return a 400 on missing email or password', async () => {
    await request(app)
        .post('/api/users/sign-up')
        .send({
            email: 'test@gmailcom',
        })
        .expect(400)

    await request(app)
        .post('/api/users/sign-up')
        .send({
            password: 'test@gmailcom',
        })
        .expect(400)
});


it('should return a 400 on duplicate email', async () => {
    await request(app)
        .post('/api/users/sign-up')
        .send({
            email: 'test@gmail.com',
            password: 'password'
        })
        .expect(201)
    await request(app)
        .post('/api/users/sign-up')
        .send({
            email: 'test@gmail.com',
            password: 'password'
        })
        .expect(400)
});

it('should set a cookie', async () => {
    const response = await request(app)
        .post('/api/users/sign-up')
        .send({
            email: 'test@gmail.com',
            password: 'password'
        })
        .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
});