import useInView from '../../hooks/useInView';

/** Fades + lifts its children into view on scroll. */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...props }) {
  const [ref, visible] = useInView();
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...props}>
      {children}
    </Tag>
  );
}
