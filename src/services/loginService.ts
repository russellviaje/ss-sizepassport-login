export default class LoginService {
    static atteptLogin (userData) {
        const { email, password } = userData;
        console.debug(`User login attempt --> email: ${email} | password: ${password}`);
        var auth = window.btoa(email + ':' + password);
        var xhttp = new XMLHttpRequest();
        var endpointURL = 'https://demo-eu02-suitsupplyworld.demandware.net/s/INT/dw/shop/v20_9/customers/auth?client_id=46f6e40b-b605-4bb2-a162-534b3fbba5e0';

        xhttp.open('POST', endpointURL);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.setRequestHeader('Authorization', 'Basic ' + auth);
        xhttp.send(JSON.stringify({ type: 'credentials' }));
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var token = xhttp.getResponseHeader('Authorization');
                var parsedToken = token.slice(7);

                if (parsedToken != null) {
                    var sessionURL = 'https://demo-eu02-suitsupplyworld.demandware.net/s/INT/dw/shop/v20_9/sessions';
                    xhttp.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 204) {
                            console.debug('You have successfully logged in');
                        }
                    };
                    xhttp.open('POST', sessionURL);
                    xhttp.setRequestHeader('Content-type', 'application/json');
                    xhttp.setRequestHeader('x-dw-client-id', '46f6e40b-b605-4bb2-a162-534b3fbba5e0');
                    xhttp.setRequestHeader('Authorization', 'Bearer ' + parsedToken);
                    xhttp.send();
                }
            } else {
                console.debug('Invalid username and password');
            }
        };
    }
}