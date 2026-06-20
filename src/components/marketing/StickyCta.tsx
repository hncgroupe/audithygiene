'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/** Barre d'appel à l'action fixe en bas, sur mobile, après le hero. */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Link href="/#configurateur" className="btn-primary w-full">
        Configurer mon audit · dès 690 €
      </Link>
    </div>
  );
}
