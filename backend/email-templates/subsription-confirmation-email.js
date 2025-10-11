module.exports.subscriptionConfirmationEmail = (
  userName,
  planType,
  validUntil
) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>WheelzLoop</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <div
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        font-size: 14px;
        color: #434343;
      "
    >
      <div style="word-spacing: normal; background-color: #fafafa">
        <div
          style="
            display: none;
            font-size: 1px;
            color: #ffffff;
            line-height: 1px;
            max-height: 0px;
            max-width: 0px;
            opacity: 0;
            overflow: hidden;
          "
        >
          Premium Plan Confirmation
        </div>
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tr>
            <td>
              <div style="margin: 0px auto; max-width: 600px">
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="width: 100%"
                >
                  <tr>
                    <td
                      style="
                        direction: ltr;
                        font-size: 0px;
                        padding: 16px;
                        text-align: center;
                      "
                    >
                      <div
                        style="
                          background: #ffffff;
                          border-radius: 8px;
                          max-width: 568px;
                          margin: 0 auto;
                        "
                      >
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          width="100%"
                          style="border-radius: 8px"
                        >
                          <tr>
                            <td
                              style="
                                direction: ltr;
                                font-size: 0px;
                                padding: 16px;
                                text-align: center;
                              "
                            >
                              <div
                                style="
                                  font-size: 0px;
                                  text-align: left;
                                  direction: ltr;
                                  display: inline-block;
                                  vertical-align: top;
                                  width: 100%;
                                "
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  width="100%"
                                >
                                  <tr>
                                    <td style="padding: 32px">
                                      <table width="100%">
                                        <tr>
                                          <td align="center" style="padding-bottom: 16px">
                                            <img
                                              alt="Logo"
                                              src="https://res.cloudinary.com/diunslxah/image/upload/v1749622864/logo_osgs8k.png"
                                              width="180"
                                              style="
                                                border: 0;
                                                display: block;
                                                height: auto;
                                                font-size: 13px;
                                              "
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center">
                                            <h1 style="margin: 16px 0; font-size: 22px">
                                              Welcome to WheelzLoop Premium!
                                            </h1>
                                            <p style="font-size: 14px">
                                              Hi, ${userName}, Your ${planType} Plan subscription has been successfully activated.
                                            </p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding: 24px 0">
                                            <div
                                              style="
                                                background-color: #adb2d487;
                                                border-radius: 8px;
                                                padding: 16px;
                                                font-size: 16px;
                                                font-weight: bold;
                                                text-align: center;
                                              "
                                            >
                                              <p style="margin: 0; font-size: 20px">Premium Plan: ACTIVE</p>
                                              <p style="margin: 4px 0 0; font-size: 14px">
                                                Valid Until: ${validUntil}
                                              </p>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding-top: 8px">
                                            <p style="color: #555555; font-size: 13px">
                                              Enjoy exclusive features like priority listings, detailed vehicle analytics, and enhanced visibility on our platform.
                                            </p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding-top: 16px">
                                          
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          WheelzLoop 
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343">
          Best Used Cars website in Kerala
        </p>
        <div style="margin: 0; margin-top: 16px">
          <a href="" target="_blank" style="display: inline-block">
            <img
              width="36px"
              alt="Facebook"
              src="https://res.cloudinary.com/diunslxah/image/upload/v1749623649/IMG-20250611-WA0001_duqjea.jpg"
            />
          </a>
          <a
            href="https://www.instagram.com/wheelz_loop/"
            target="_blank"
            style="display: inline-block; margin-left: 8px"
          >
            <img
              width="36px"
              alt="Instagram"
              src="https://res.cloudinary.com/diunslxah/image/upload/v1749623649/IMG-20250611-WA0002_djru8s.jpg"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/wheelzloop-used-car-selling-platform-baa71b352/?originalSubdomain=in"
            target="_blank"
            style="display: inline-block; margin-left: 8px"
          >
            <img
              width="36px"
              alt="Linkedin"
              src="https://res.cloudinary.com/diunslxah/image/upload/v1749623649/IMG-20250611-WA0000_xv9djg.jpg"
            />
          </a>
          <a
            href="https://www.youtube.com/@wheelzloop"
            target="_blank"
            style="display: inline-block; margin-left: 8px"
          >
            <img
              width="36px"
              alt="Youtube"
              src="https://res.cloudinary.com/diunslxah/image/upload/v1749623649/IMG-20250611-WA0003_ibz8nz.jpg"
            />
          </a>
        </div>
        <p style="margin: 0; margin-top: 16px; color: #434343">
          Copyright © 2025 WheelzLoop. All rights reserved.
        </p>
      </footer>
    </div>
  </div>
</html>
`;
};
