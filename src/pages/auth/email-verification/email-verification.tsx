import { Button } from '../../../components/ui/button';
import emailSentIcon from '../../../assets/images/email_sent.svg';

export function EmailVerification() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center align-center">
        <div className="w-32 h-14 mb-20 ">
          <img src={emailSentIcon} alt="emailSentIcon" />
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold text-high-emphasis mb-4">Email sent</div>
        <div className="flex gap-1 mt-1">
          <div className="text-base font-normal text-medium-emphasis leading-6">
            An email has been sent to your registered email address.Please, follow the link on the
            email to continue your sign up.
          </div>
        </div>
      </div>
      <Button className="font-extrabold" size="lg" type="submit">
        Log in
      </Button>
      <Button className="font-extrabold text-primary" size="lg" type="submit" variant="ghost">
        Change email address
      </Button>
    </div>
  );
}
