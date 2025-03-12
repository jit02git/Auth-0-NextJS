import { useUser } from '@auth0/nextjs-auth0';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error.message}</p>;

  const sendTokenToBackend = async () => {
    alert()
    if (!user) return;
    const response = await fetch('/api/auth/me');
    const data = await response.json();
    const accessToken = data?.accessToken;

    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/callback`, { token: accessToken });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {!user ? (
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Welcome</h1>
            <p className="text-gray-600 mb-6">Login to continue</p>
            <Link
              href="/api/auth/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full inline-block"
            >
              Login with Auth0
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-xl font-semibold mb-2">Hello, {user.name}</h1>
            <p className="text-gray-600 mb-6">{user.email}</p>
            <button
              onClick={sendTokenToBackend}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
            >
              Send Token to Backend
            </button>
            <Link href="/api/auth/logout" className="mt-4 text-red-500 inline-block hover:underline">
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
