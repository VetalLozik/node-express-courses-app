const keys = require('../keys')

module.exports = function(email, token){
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Recovery password',
        html: `
            <h1>You forgot password?</h1>
            <p>If not, please ignore this message</p>
            <p>Otherwise click the link below:</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Recovery password</a></p>
            <hr />
            <p>Follow the link below to go to the main page</p>
            <a href="${keys.BASE_URL}">Courses of shop</a>
        `
    }
}