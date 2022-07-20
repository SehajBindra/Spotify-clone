import styles from "../styles/Home.module.css";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sidebar />
        {/* center */}
      </main>

      <div>{/* footer */}</div>
    </div>
  );
}
