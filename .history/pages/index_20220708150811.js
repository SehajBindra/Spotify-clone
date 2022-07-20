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

      <h1 className="text-left"> lets build spotify 2.0</h1>

      <main>
        <Sidebar />
        {/* center */}
      </main>

      <div>{/* footer */}</div>
    </div>
  );
}
