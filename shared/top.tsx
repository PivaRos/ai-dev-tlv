import Link from "next/link";

type TopProps = {
  label: string;
}

export function Top({label}: TopProps) {
  return (
      <>
        <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center text-white text-2xl">
            ⬅
          </Link>
        </div>

        <div className="absolute top-4 right-4">
          <Link href="/" className="flex items-center text-white text-2xl">
            {label}
          </Link>
        </div>
      </>
  )
}
