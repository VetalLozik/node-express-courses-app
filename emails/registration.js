const keys = require('../keys')

module.exports = function(email){
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Account was created',
        html: `
            <h1>Welcome to our shop</h1>
            <p>You have successfully created an account with email - ${email}</p>
            <hr />
            <p>Follow the link below to go to the main page</p>
            <a href="${keys.BASE_URL}">Courses of shop</a>
        `
    }
}