import { useState, useEffect } from 'react'
import { debounce } from '@utils/helpers'

export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const update = debounce(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }, 150)

    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return {
    ...size,
    isMobile: size.width < 640,
    isTablet: size.width >= 640 && size.width < 1024,
    isDesktop: size.width >= 1024,
  }
}
