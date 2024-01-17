import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Hello, Provider!</h1>
          <p className="py-6">
            Welcome to EZHOUZE! Sign up as a provider and start offering your
            services to homeowners.
          </p>
        </div>

        <SignUp />
      </div>
    </div>
  );
}
