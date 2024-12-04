import Link from "next/link";

export default function AccountActivationPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" p-10 shadow">
        <div className="text-primary text-center">
          <h2 className="text-3xl">Activation Successful! 🎉</h2>
          <h1 className="text-3xl font-bold">Your account is now active</h1>
          <p className="text-black dark:text-white">
            Please{" "}
            <Link href="/signin" className="font-bold underline text-primary">
              login
            </Link>{" "}
            to access your account and start exploring our features.
          </p>
        </div>
      </div>
    </div>
  );
}
