import { Link } from 'react-router-dom';
import { getCategoryNote } from '@/data/categoryNotes';
import { formatMonthYear, getProductPolicy } from '@/utils/productFacts';
import styles from './ProductDetails.module.scss';

const formatCm = (value) => Number(value).toLocaleString('en-US', { maximumFractionDigits: 1 });

function getPackageSize(dimensions) {
  if (!dimensions) return null;
  const { width, height, depth } = dimensions;
  if ([width, height, depth].some((value) => value == null)) return null;
  return `${formatCm(width)} × ${formatCm(height)} × ${formatCm(depth)} cm (W × H × D)`;
}

// The longer read under the buy box: Halden's notes on the department,
// buying tips, tags that link back to the catalog, and a specification table.
export default function ProductDetails({ product, categoryName }) {
  const note = getCategoryNote(product.category);
  // De-duplicated: some products list the same tag twice.
  const tags = [...new Set(product.tags ?? [])];
  const policy = getProductPolicy(product);

  const specs = [
    ['Brand', product.brand],
    ['Department', categoryName],
    ['Availability', product.availabilityStatus],
    ['Customer rating', product.rating != null ? `${Number(product.rating).toFixed(1)} out of 5` : null],
    ['Package size', policy.showPackageSize ? getPackageSize(product.dimensions) : null],
    ['Delivery', policy.shipping],
    ['Returns', policy.returns],
    ['Warranty', policy.warranty],
    ['In our catalog since', formatMonthYear(product.meta?.createdAt)],
    ['Product code', product.sku],
    ['Barcode', product.meta?.barcode],
  ].filter(([, value]) => Boolean(value));

  return (
    <div className={styles.details}>
      <section aria-labelledby="about-heading">
        <h2 id="about-heading" className={styles.heading}>
          About this product
        </h2>

        <h3 className={styles.subheading}>Why we stock it</h3>
        <p className={styles.text}>{note.why}</p>

        <h3 className={styles.subheading}>How to choose</h3>
        <ul className={styles.tips}>
          {note.choose.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>

        <h3 className={styles.subheading}>Good to know</h3>
        <p className={styles.text}>{note.tip}</p>

        {tags.length > 0 && (
          <>
            <h3 className={styles.subheading}>Find similar products</h3>
            <ul className={styles.tags} role="list">
              {tags.map((tag) => (
                <li key={tag}>
                  <Link to={`/catalog?q=${encodeURIComponent(tag)}`} className={styles.tag}>
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section aria-labelledby="specs-heading">
        <h2 id="specs-heading" className={styles.heading}>
          Specifications
        </h2>
        <dl className={styles.table}>
          {specs.map(([term, value]) => (
            <div key={term} className={styles.row}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
