const nodemailer = require('nodemailer')
var config = require('./config/config')
var emailTemplate = require('./emailTemplate.js')
var sgTransport = require('nodemailer-sendgrid-transport');


var optionsSendG = {
  auth: {
    api_user: config.senGridUserName,
    api_key: config.senGridPassword
  }
}
var client = nodemailer.createTransport(sgTransport(optionsSendG));


module.exports = {
  async cancelSubscription (ctx, user, subscription) {
    let body = `
      <div>Hello ${user.firstName} ${user.lastName}</div>

        <div>Your subscription has been cancelled.
           ${ctx.request.headers.origin}
        </div>
    `
    var mailOptions = {
      to: user.email,
      from: config.fromEmail,
      subject: 'Cancel subscription - NachoNacho',
      html: emailTemplate.template(ctx, body)
    }
    return this.sendMail(mailOptions)
  },
  async sendNewOrderEmail (ctx, user, order) {
    let body = `
        <div>Hello ${user.firstName} ${user.lastName}</div>
        <div>Welcome to NachoNacho</div>
          <div>Please find a new order on your account.
             ${ctx.request.headers.origin}
          </div>
      `
    var mailOptions = {
      to: user.email,
      from: config.fromEmail,
      subject: 'New Order - NachoNacho',
      html: emailTemplate.template(ctx, body)

    }
    return this.sendMail(mailOptions)
  },
  async sendWelcomeEmail (user, ctx) {
    let body = `
      <div>Hello ${user.firstName} ${user.lastName}</div>
      <div>Welcome to NachoNacho</div>
        <div>Please find link to validate your email.
           ${ctx.request.headers.origin}/validateEmail?validateEmailToken=${user.validateEmailToken}
        </div>
    `
    var mailOptions = {
      to: user.email,
      from: config.fromEmail,
      subject: 'Welcome to NachoNacho',
      html: emailTemplate.template(ctx, body)

    }
    return this.sendMail(mailOptions)
  },
  sendForgetPassword (uniqueId, user, ctx) {
    let body = `
      <div>hello</div>
      <div>Please find link to reset your password.
         ${ctx.request.headers.origin}/resetPassword?resetPasswordToken=${uniqueId}
      </div>
    `
    var mailOptions = {
      to: user.email,
      from: config.fromEmail,
      subject: 'Forget Password - NachoNacho',
      html: emailTemplate.template(ctx, body)
    }
    return this.sendMail(mailOptions)
  },
  sendMagicLink (uniqueId, user, ctx) {
    let body = `
      <div>hello</div>
      <div>Please find link to Sign in. This link is available 1h only!
         ${ctx.request.headers.origin}/magicLinkLogin?magicLinkToken=${uniqueId}
      </div>
    `
    var mailOptions = {
      to: user.email,
      from: config.fromEmail,
      subject: 'Sign In - NachoNacho',
      html: emailTemplate.template(ctx, body)
    }
    return this.sendMail(mailOptions)
  },
  sendMail(mailOptions) {
    return client.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Mail sent to: ' + mailOptions.to)
      }
    })
  }
}
