export default class LoginService {
    static atteptLogin (userData) {
        const { email, password } = userData;
        console.debug(`User login attempt --> email: ${email} | password: ${password}`);
    }
}