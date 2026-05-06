import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40 py-10 text-sm text-mist/55">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} Muhammad Uzair Zia · Computer engineering & applied AI.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="mailto:uzairzia080@gmail.com" className="hover:text-mist">
            Email
          </Link>
          <Link
            href="https://github.com/uzairzia727"
            className="hover:text-mist"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/muhammad-uzair-6882aa303"
            className="hover:text-mist"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </Link>
          <Link href="#home" className="hover:text-mist">
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
