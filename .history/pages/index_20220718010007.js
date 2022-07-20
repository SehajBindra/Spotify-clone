import styles from "../styles/Home.module.css";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import Player from "../components/Player";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../components/Loader";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "authenticated") {
    return (
      <div>
        <Head>
          <title>Spotify</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-black h-screen overflow-hidden">
          <main className=" flex ">
            <Sidebar />
            <Center />
          </main>

          <div className=" sticky  bottom-0">
            <Player />
          </div>
        </div>
      </div>
    );
  }
  return;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
