import Sidebar from './Sidebar';
import '../admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Wrap children in a fresh layout devoid of the main public Navbar
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main fade-in">
        {children}
      </main>
    </div>
  );
}
