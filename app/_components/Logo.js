import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* Specifying the image this way needs us to set the height & width */}

      {/* <Image src="/logo.png" height="50" width="50" alt="The Calm Den logo" /> */}

      <Image
        src={logo}
        height="50"
        width="50"
        quality={100}
        alt="The Calm Den logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Calm Den
      </span>
    </Link>
  );
}

export default Logo;
