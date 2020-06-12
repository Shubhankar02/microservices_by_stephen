import request from "supertest";
import {app} from "../../app";
import {response} from "express";

it('should return a 400 if email does not exists', async () => {
    return request(app)
        .post('/api/users/sign-in')
        .send({
            email: 'test@gmail.com',
            password: 'password'
        })
        .expect(400)
});

it('should return a 400 on incorrect password', async () => {
    await request(app)
        .post('/api/users/sign-up')
        .send({
            email: 'test@gmail.com',
            password: 'password'
        })
        .expect(201)

    await request(app)
        .post('/api/users/sign-in')
        .send({
            email: 'test@gmail.com',
            password: 'password123'
        })
        .expect(400)
});

it('should return a 200 on successful sign in and set the cookie', async () => {
    await request(app)
        .post('/api/users/sign-up')
        .send({
            email: 'test@gmail.com',
            password: 'password'
        })
        .expect(201)

    const response = await request(app)
        .post('/api/users/sign-in')
        .send({
            email: 'test@gmail.com',
            password: 'password'
        })
        .expect(200)
    expect(response.get('Set-Cookie')).toBeDefined()
});