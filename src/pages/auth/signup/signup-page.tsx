import { Button } from '../../../components/ui/button';
import githubIcon from '../../../assets/images/social_media_github.png';
import linkedinIcon from '../../../assets/images/social_media_in.png';
import microsoftIcon from '../../../assets/images/social_media_ms.png';
import googleIcon from '../../../assets/images/social_media_google.png';
import { SignupForm } from 'features/auth/components/signup-form';
import { UCheckbox } from 'components/core/uCheckbox';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/selise_Blocks_logo.svg';

export function SignupPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-32 h-14 mb-2">
        <img src={logo} alt="logo" />
      </div>
      <div>
        <div className="text-2xl font-bold text-high-emphasis">
          Sign up to get access to our open source services
        </div>
        <div className="flex gap-1 mt-4">
          <div className="text-sm font-normal text-medium-emphasis">Already have an account?</div>
          <Link to={'/signin'}>
            <div className="text-sm font-normal text-primary">Log in</div>
          </Link>
        </div>
      </div>
      <SignupForm />
      <div>
        <div className="flex items-center gap-4 mb-6 mt-23">
          <div className="flex-1">
            <hr className="h-[2px] bg-gray-200 border-0 rounded" />
          </div>
          <div className="text-base font-normal text-low-emphasis">Or</div>
          <div className="flex-1">
            <hr className="h-[2px] bg-gray-200 border-0 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex w-full items-center gap-4">
            <Button variant="outline" className="w-[25%] h-12">
              <img src={googleIcon} width={20} height={20} alt="Google Logo" />
            </Button>
            <Button variant="outline" className="w-[25%] h-12">
              <img src={microsoftIcon} width={20} height={20} alt="microsoft Logo" />
            </Button>
            <Button variant="outline" className="w-[25%] h-12">
              <img src={linkedinIcon} width={20} height={20} alt="linkedin Logo" />
            </Button>

            <Button variant="outline" className="w-[25%] h-12">
              <img src={githubIcon} width={20} height={20} alt="github Logo" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <UCheckbox
            label={
              <>
                I agree to the <span className="text-primary underline">Terms of Services</span> and
                acknowledge that I have read the{' '}
                <span className="text-primary underline">Privacy policy</span>.
              </>
            }
            labelClassName="text-medium-emphasis font-normal mt-4 leading-5"
          />
        </div>
      </div>
    </div>
  );
}
