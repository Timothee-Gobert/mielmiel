import Header from "@/components/header/Header";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <link rel="icon" href="http://localhost:3000/favicon.ico" />
        <title>Miels Gobert</title>
        <meta name="description" content="Site officiel des Miels Gobert" />
      </Head>
      <Header />
      {children}
    </>
  );
}
