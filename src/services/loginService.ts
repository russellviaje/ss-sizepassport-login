export default class LoginService {
    static atteptLogin (userData) {
        const { email, password, sessionURL, customerAuthURL, clientID } = userData;
        console.debug(`
            User login attempt --> 
            email: ${email},
            password: ${password},
            sessionURL: ${sessionURL},
            customerAuthURL: ${customerAuthURL},
            clientID: ${clientID}
        `);

        var auth = window.btoa(email + ':' + password);
        var xhttp = new XMLHttpRequest();

        xhttp.open('POST', customerAuthURL);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.setRequestHeader('Authorization', 'Basic ' + auth);
        xhttp.send(JSON.stringify({ type: 'credentials' }));
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var token = xhttp.getResponseHeader('Authorization');
                var parsedToken = token.slice(7);

                if (parsedToken != null) {
                    xhttp.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 204) {
                            console.debug('You have successfully logged in');
                        }
                    };
                    xhttp.open('POST', sessionURL);
                    xhttp.setRequestHeader('Content-type', 'application/json');
                    xhttp.setRequestHeader('x-dw-client-id', clientID);
                    xhttp.setRequestHeader('Authorization', 'Bearer ' + parsedToken);
                    xhttp.send();
                }
            } else {
                console.debug('Invalid username and password');
            }
        };
    }
}