import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="flex flex-col bg-black  min-h-screen items-center w-full justify-center">
      {" "}
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
      <div className="my-20 mx-auto  text-white/90">
        <p className="max-w-sm text-justify capitalize text-[16px] md:text-xl">
          This is not a real web app it is build for educational purposes all
          the rights reserved to spotify{" "}
        </p>
      </div>
      <>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className=" bg-[#18d860] font-semibold  text-white p-5 rounded-lg"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Login with {provider.name}
              </button>
            </div>
          ))}
      </>
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
