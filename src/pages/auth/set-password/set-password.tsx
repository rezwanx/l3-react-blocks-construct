import { Button } from '../../../components/ui/button';
import { SetpasswordForm } from '../../../features/auth/components/set-password';

import githubIcon from '../../../assets/images/social_media_github.png';
import linkedinIcon from '../../../assets/images/social_media_in.png';
import microsoftIcon from '../../../assets/images/social_media_ms.png';
import googleIcon from '../../../assets/images/social_media_google.png';

export function SetPasswordPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-2xl font-bold text-high-emphasis">Set your password</div>
        <div className="flex gap-1 mt-1">
          <div className="text-sm font-normal text-medium-emphasis">
            Secure your account with a strong password.
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-4">
        <div className="rounded-lg bg-success-background border border-success p-4">
          <p className="text-xs font-normal text-success-high-emphasis">
            Your email (demo@blocks.construct) has been verified successfully.
          </p>
        </div>
      </div>

      <SetpasswordForm />

      <div>
        <div className="flex items-center gap-4 mb-6 mt-23">
          <div className="flex-1">
            <hr className="h-[2px] bg-gray-200 border-0 rounded" />
          </div>
          <div className="text-base font-normal text-low-emphasis">Or continue with</div>
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
              <img src={microsoftIcon} width={20} height={20} alt="Microsoft Logo" />
            </Button>
            <Button variant="outline" className="w-[25%] h-12">
              <img src={linkedinIcon} width={20} height={20} alt="LinkedIn Logo" />
            </Button>
            <Button variant="outline" className="w-[25%] h-12">
              <img src={githubIcon} width={20} height={20} alt="GitHub Logo" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
