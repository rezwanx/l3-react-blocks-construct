import { ChevronDown } from 'lucide-react';
import { TEmail } from '../../types/email.types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import AvatarFrame from 'components/ui/avatar-frame';

interface EmailViewResponseTypeProps {
  selectedEmail: TEmail;
  isReply: boolean;
  setIsReply: (isReply: boolean) => void;
}

const EmailViewResponseType = ({ selectedEmail }: EmailViewResponseTypeProps) => {
  return (
    <>
      <div className="flex justify-start items-center gap-2 h-fit">
        <div className="flex justify-center items-center gap-4">
          <AvatarFrame
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg"
            alt="Profile avatar"
            height={48}
            width={48}
          />
          <div>
            <p className="text-high-emphasis">{selectedEmail.sender}</p>
            <div className="flex gap-1">
              <div className="text-sm text-medium-emphasis">
                to <span className="text-high-emphasis font-semibold">me</span> and{' '}
                <span className="text-high-emphasis font-semibold">2 others</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ChevronDown className="h-5 w-5 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[387px]">
                  <div className="py-2 ps-2 pe-4">
                    <div className="flex  text-sm gap-2">
                      <div className="flex gap-4">
                        <p className="w-10 h-[22px] text-right text-low-emphasis">from: </p>
                        <p className="text-high-emphasis">{selectedEmail.sender}</p>
                      </div>
                      <p className="text-medium-emphasis">{`<${selectedEmail.email}>`}</p>
                    </div>
                    <div className="flex  text-sm gap-2">
                      <div className="flex gap-4">
                        <p className="w-10 h-[22px] text-right text-low-emphasis">to: </p>
                        <p className="text-high-emphasis">Me</p>
                      </div>
                      <p className="text-medium-emphasis">{`<demo@blocks.construct>`}</p>
                    </div>
                    <div className="flex  text-sm gap-2">
                      <div className="flex gap-4">
                        <p className="w-10 h-[22px] text-right text-low-emphasis">cc: </p>
                        <p className="text-high-emphasis">Tchanman</p>
                      </div>
                      <p className="text-medium-emphasis">{`<tochanman@gmail.com>`}</p>
                    </div>
                    <div className="flex  text-sm gap-2">
                      <div className="flex gap-4">
                        <p className="w-10 h-[22px] text-right text-low-emphasis">date: </p>
                        <p className="text-high-emphasis">{`${new Date().toTimeString()}`}</p>
                      </div>
                    </div>
                    <div className="flex  text-sm gap-2">
                      <div className="flex gap-4">
                        <p className="w-10 h-[22px] text-right text-low-emphasis">subject: </p>
                        <p className="text-high-emphasis">Meeting Tomorrow</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailViewResponseType;
