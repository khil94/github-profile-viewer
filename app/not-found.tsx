import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh]">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-lg mb-8">Could not find the requested page.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}
