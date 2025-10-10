import { useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'

export default function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(
        {
            top: 0,
            behavior: 'smooth'
        }
    );
  }, [pathname]);

  return null;
}
