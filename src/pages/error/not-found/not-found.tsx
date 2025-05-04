import not_found from 'assets/images/not_found.svg';
import { Button } from 'components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col gap-12">
        <img src={not_found} />
        <div className="flex flex-col items-center">
          <h1 className="text-high-emphasis font-bold text-[32px] leading-[48px]">
            We couldn’t find what you were looking for.
          </h1>
          <p className="mt-3 mb-6 text-medium-emphasis font-semibold text-2xl">
            The page may have been moved or no longer exists.
          </p>
          <Button>
            Take me back
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
