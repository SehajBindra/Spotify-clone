import { getProviders, signIn } from "next-Auth/react";

function Login({ providers }) {
  return (
    <div className="flex flex-col bg-black  min-h-screen items-center w-full justify-center">
      {" "}
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
      <>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className=" bg-[#18d860]  text-white p-5 rounded-lg"
              onClick={() => signIn(provider.id)}
            >
              LoginIn with {provider.name}
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
