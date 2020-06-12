import request from "supertest";
import {app} from "../../app";


it('should return the current user with statusCode 200', async () => {
    const cookie = await global.signIn();
    const response = await request(app)
        .get('/api/users/current-user')
        .set("Cookie", cookie)
        .send({})
        .expect(200)
    expect(response.body.currentUser.email).toEqual('test@gmail.com')
});

it('should respond with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/current-user')
        .send()
        .expect(200)
    expect(response.body.currentUser).toEqual(null)
}); 