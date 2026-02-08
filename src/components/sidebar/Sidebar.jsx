import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1445) {
        setShowText(false);
      } else {
        setShowText(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          bg-sidebar
          w-[260px] md:w-[72px] lg:w-[260px] 
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          flex flex-col
        `}
      >
        {/* LOGO */}
        <div className="h-[56px] flex items-center gap-2 px-4 shrink-0">
          <img
            src="/logo.png"
            alt="LegalGraph AI"
            className="h-8 w-8 object-contain"
          />

          {showText && (
            <span
              className="
        bg-[linear-gradient(90deg,#2C8ED5_0%,#1762AA_100%)]
        bg-clip-text
        text-transparent
        font-inter
        font-[600]
        text-[16px]
        whitespace-nowrap
      "
            >
              LegalGraph AI
            </span>
          )}
        </div>

        {/* NAV */}
        <nav className="mt-2 space-y-1 text-[14px] font-[500]">
          <NavItem label="Contract Vault" />
          <NavItem label="COI Dashboard" active />
          <NavItem label="Analysis Results" />
          <NavItem label="Setting" />
        </nav>
      </aside>

      {/* MOBILE TOGGLE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 h-[36px] w-[36px] rounded-md border bg-white"
      >
        ☰
      </button>
    </>
  );
}

export default Sidebar;

/* ---------- Helper ---------- */

function NavItem({ label, active }) {
  return (
    <div
      className={`
        flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer
        ${
          active
            ? "bg-sidebar-active text-primary"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      <span className="w-4 h-4 bg-gray-400 rounded shrink-0" />
      <span className="hidden lg:inline">{label}</span>
    </div>
  );
}
