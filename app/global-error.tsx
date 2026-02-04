'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to an error reporting service if you add one later.
    // Keeping it lightweight avoids issues during prerender/export.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md w-full space-y-5">
          <h1 className="text-3xl font-black">Ocurrió un error</h1>
          <p className="text-white/70">
            Algo salió mal renderizando esta página. Podés intentar recargar o
            volver al inicio.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-md bg-red-600 px-4 py-2 font-semibold hover:bg-red-500 transition-colors"
            >
              Reintentar
            </button>
            <Link
              href="/"
              className="rounded-md border border-white/20 px-4 py-2 font-semibold hover:border-white/40 transition-colors"
            >
              Ir al inicio
            </Link>
          </div>

          {process.env.NODE_ENV !== 'production' ? (
            <pre className="text-xs whitespace-pre-wrap rounded-md border border-white/10 bg-white/5 p-3 text-white/70">
              {String(error?.message || error)}
            </pre>
          ) : null}
        </div>
      </body>
    </html>
  );
}
