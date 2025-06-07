module.exports.createExpirationEmail = (userName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #606cbc;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
            }
            .header h1 {
                color: white;
                margin: 0;
            }
            .content {
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 0 0 5px 5px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #606cbc;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                text-align: center;
                color: #777;
            }
            a {
                text-decoration: none
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>WheelzLoop</h1>
        </div>
        <div class="content">
            <h2>Dear ${userName},</h2>
            <p>Your WheelzLoop dealer subscription plan is expiring today. To continue enjoying premium benefits and showcasing your vehicles to thousands of potential buyers, please renew your subscription.</p>
            
            <p>As a premium dealer on WheelzLoop, you benefit from:</p>
            <ul>
                <li>Increased visibility for your vehicles</li>
                <li>Priority placement in search results</li>
                <li>Advanced analytics for your listings</li>
                <li>And much more!</li>
            </ul>
            
            <center>
                <a href="https://www.wheelzloop.com/premium-plans" class="button">Renew Your Subscription</a>
            </center>
            
            <p>If you have any questions about our premium plans or need assistance, please don't hesitate to contact our support team.</p>
            
            <p>Thank you for being a valued WheelzLoop dealer!</p>
            
            <p>Best regards,<br>The WheelzLoop Team</p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} WheelzLoop. All rights reserved.</p>
            <p><a href="https://www.wheelzloop.com" style="color: #606cbc;">Visit our website</a></p>
        </div>
    </body>
    </html>
    `;
};
