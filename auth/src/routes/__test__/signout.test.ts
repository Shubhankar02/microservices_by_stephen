import request from "supertest";
import {app} from "../../app";


it('should clears the cookie after sign out', async () => {
    await request(app)
        .post('/api/users/sign-up')
        .send({
            email: 'test@gmail.com',
            password: 'password'
        })
        .expect(201)

    await request(app)
        .post('/api/users/sign-out')
        .send({})
        .expect(200)
});