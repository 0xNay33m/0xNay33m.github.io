import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AmbientBackground } from '../components/Backgrounds';
import { useAccent } from '../lib/accent';
import { useTitle } from '../lib/useTitle';
export default function NotFound() {
  useAccent('offensive');
  useTitle('404');
  return (
    <>
      <AmbientBackground />
      <div className="container-x grid min-h-[80vh] place-items-center pt-24 text-center">
        <div>
          <p className="font-mono text-sm text-accent">HTTP/1.1 404 Not Found</p>
          <h1 className="mt-4 text-6xl font-semibold sm:text-8xl">404</h1>
          <p className="mt-4 text-slate-400">This path was enumerated, and nothing was found.</p>
          <Link to="/" className="btn-accent mt-8">
            <ArrowLeft size={16} /> Back home
          </Link>
        </div>
      </div>
    </>
  );
}
