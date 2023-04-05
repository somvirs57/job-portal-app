import React from "react";
import Captcha from "react-numeric-captcha";

// eslint-disable-next-line react/display-name
const NumericCaptcha = React.forwardRef((props, ref) => {
  const { captchaChangeHandler } = props;

  const onCaptchaChange = (status) => {
    captchaChangeHandler(status);
  };

  return <Captcha ref={ref} onChange={onCaptchaChange} />;
});

export { NumericCaptcha };
