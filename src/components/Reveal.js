// Fades children up as they scroll into view. Pure CSS (scroll-driven animation),
// so content is never hidden while waiting for JavaScript; browsers without
// support simply show it immediately.
export default function Reveal({ children, className = "", as: Tag = "div", ...props }) {
  return (
    <Tag className={`reveal ${className}`} {...props}>
      {children}
    </Tag>
  );
}
