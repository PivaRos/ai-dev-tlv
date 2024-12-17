import Link from "next/link";

export default function Home() {
  return (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="text-5xl mb-4">AI Dev TLV <span className="font-bold">2024</span></h1>
          <div className="flex justify-center w-full max-w-md">
            <Link href={'/csr'}>CSR</Link>
            <span className="mx-4">|</span>
            <Link href={'/ssr'}>SSR</Link>
          </div>
        </div>
  );
}
