import { useRef, useState } from 'react';
import Image from '@/components/ui/Image/Image';
import cx from '@/utils/cx';
import styles from './ProductGallery.module.scss';

// Main image plus thumbnail buttons. Arrow keys, Home and End move between
// thumbnails when one of them has focus.
export default function ProductGallery({ images = [], title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbRefs = useRef([]);

  const count = images.length;
  const index = Math.min(activeIndex, Math.max(0, count - 1));

  const handleKeyDown = (event) => {
    const moves = {
      ArrowRight: (index + 1) % count,
      ArrowLeft: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    };
    const next = moves[event.key];
    if (next === undefined) return;

    event.preventDefault();
    setActiveIndex(next);
    thumbRefs.current[next]?.focus();
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.stage}>
        <Image
          src={images[index]}
          alt={count > 1 ? `${title}, image ${index + 1} of ${count}` : title}
          width={600}
          height={600}
          eager
          className={styles.main}
        />
      </div>

      {count > 1 && (
        <ul className={styles.thumbs} role="list" aria-label="Product images" onKeyDown={handleKeyDown}>
          {images.map((src, i) => (
            // Index in the key: the API sometimes repeats an image URL.
            <li key={`${i}-${src}`}>
              <button
                type="button"
                ref={(element) => {
                  thumbRefs.current[i] = element;
                }}
                className={cx(styles.thumb, i === index && styles.active)}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setActiveIndex(i)}
              >
                <Image src={src} alt="" width={96} height={96} className={styles.thumbImage} />
                <span className="visually-hidden">
                  Show image {i + 1} of {count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
