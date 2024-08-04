import { render } from "@react-email/render";
import { VerifyOTP } from "../emails/VerifyOTP";

/**
 * The function renders a React component called VerifyOTP with a validation code as a prop and returns
 * the HTML output.
 * @param {number} otp - The `otp` parameter is a number representing the validation code that will be
 * passed as a prop to the `VerifyOTP` component.
 * @returns The function `renderVerifyOTP` returns an HTML string that is generated by rendering the
 * `VerifyOTP` component with the `validationCode` prop set to the `otp` parameter passed to the
 * function. The HTML string is generated using the `render` function from `@react-email/render`.
 */
export const renderVerifyOTP = (otp: number) => {
  const html = render(<VerifyOTP validationCode={otp} />, {
    pretty: true,
  });

  return html;
};