'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 md:px-6 pt-28 pb-16">
      <div className="mx-auto max-w-2xl space-y-5">
        <h1 className="text-4xl md:text-5xl font-black">Ups…</h1>
        <p className="text-muted-foreground">
          Ocurrió un error en esta ruta. Podés reintentar o volver al inicio.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground"
          >
            Reintentar
          </button>
          <Link href="/" className="underline underline-offset-4">
            Ir al inicio
          </Link>
        </div>

        {process.env.NODE_ENV !== 'production' ? (
          <pre className="text-xs whitespace-pre-wrap rounded-md border border-border/50 bg-card/50 p-3 text-muted-foreground">
            {String(error?.message || error)}
          </pre>
        ) : null}
      </div>
    </main>
  );
}
