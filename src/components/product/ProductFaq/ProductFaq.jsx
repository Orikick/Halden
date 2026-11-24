import { getProductFaq } from '@/utils/productFacts';
import styles from './ProductFaq.module.scss';

// Common buyer questions as native disclosure widgets (<details>), which are
// keyboard and screen-reader accessible without any script.
export default function ProductFaq({ product }) {
  const faq = getProductFaq(product);

  return (
    <section className={styles.faq} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={styles.heading}>
        Questions about this product
      </h2>
      <div className={styles.list}>
        {faq.map(({ question, answer }, index) => (
          <details key={question} className={styles.item} open={index === 0}>
            <summary className={styles.question}>{question}</summary>
            <p className={styles.answer}>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
