var fs = require('fs');
var ejs = require('ejs');

// Contains mandrill connection keys, new client instantiation, and scott's sendEmail() code
var sendEmail = require('./mandrill');

module.exports = createAndSendEmail;

//********************************************************
// Loops through all db subscribers, rendered email template
//  and invokes .sendEmail();
// @params: array of recipients (only email addresses),
//          array of stories
//********************************************************
function createAndSendEmail(order, emailText) {
    console.log('create and send email was called')
  var template = fs.readFileSync('./mailer/html_template.ejs', 'utf8');
  var customizedTemplate = ejs.render(template, {
      greeting: emailText.greeting,
      body: emailText.body,
      goodbye: emailText.goodbye,
      message: emailText.message,
      order: order
    });
  console.log(customizedTemplate);
    sendEmail(order.user.email, order.user.email, 'fsMotors', 'fsMotors@gmail.com', 'Update to your order', customizedTemplate);
}
