import { useState } from 'react';
import cx from '@/utils/cx';
import Icon from '@/components/ui/Icon/Icon';
import styles from './Image.module.scss';

// <img> with lazy loading by default and a neutral placeholder when the
// file fails to load, so a broken image never leaves a hole in the layout.
export default function Image({ src, alt, eager = false, className, ...rest }) {
  // Remember which src failed, so a new src (e.g. gallery change) gets a fresh try.
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    return (
      <span
        className={cx(styles.fallback, className)}
        role={alt ? 'img' : undefined}
        aria-label={alt ? `${alt} (image unavailable)` : undefined}
        aria-hidden={alt ? undefined : 'true'}
      >
        <Icon name="image" size={28} />
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      onError={() => setFailedSrc(src)}
      {...rest}
    />
  );
}
