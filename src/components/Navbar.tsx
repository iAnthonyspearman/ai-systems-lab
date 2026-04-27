export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6">
      <a href="/" className="text-xl font-bold tracking-tight">
        AI Systems Lab
      </a>

      <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
        <a href="#systems" className="hover:text-white">
          Systems
        </a>
        <a href="#projects" className="hover:text-white">
          Projects
        </a>
        <a href="#contact" className="hover:text-white">
          Contact
        </a>
      </div>

      <a
        href="#contact"
        className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white md:inline-flex"
      >
        Start a Build
      </a>
    </nav>
  );
}