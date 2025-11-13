// app/components/Sidebar.tsx
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#001e5f] flex flex-col shrink-0">
    <nav className="p-4 space-y-2 grow">
        <div className="text-center" data-i18n-key="product_services">Products And Services</div>
        <Link href="/" className="block px-4 py-2.5  hover:bg-blue-500/50 text-white font-semibold">Home</Link>
    </nav>
</aside>
  );
}