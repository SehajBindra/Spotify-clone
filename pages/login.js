import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";

function Login({ providers }) {
  return (
    <div className="flex flex-col bg-black  min-h-screen items-center w-full justify-center">
      <Head>
        <title>Spotify-clone - Login</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png"
        />
      </Head>{" "}
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
      <div className="my-20 mx-auto  text-white/90">
        <p className="max-w-sm text-justify capitalize text-[16px] md:text-xl">
          This is not a real web app it is build for educational purposes only
          all the rights reserved to Spotify © {new Date().getFullYear()} .....{" "}
        </p>
      </div>
      <>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className=" bg-[#18d860] font-semibold  text-black py-3 px-6 rounded-lg"
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
