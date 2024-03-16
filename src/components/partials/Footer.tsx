import Logo from "@/src/components/Logo";
import Social from "@/src/components/Social";
import config from "@/src/config/config.json";
import menu from "@/src/config/menu.json";
import social from "@/src/config/social.json";
import { markdownify } from "@/src/lib/utils/textConverter";
import Link from "next/link";
import { NavigationLink } from "../../types/NavigationLink";

const Footer = () => {
  const { footer }: { footer: NavigationLink[] } = menu;
  const { copyright } = config.params;

  return (
    <footer className="bg-theme-light dark:bg-darkmode-theme-light">
      <div className="container">
        <div className="row items-center py-10">
          <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:text-left">
            <Logo className="max-w-[80vw] m-auto w-auto max-h-16 lg:h-12" />
          </div>
          <div className="mb-8 text-center lg:col-6 lg:mb-0">
            {menu.footer.length > 0 && (
              <ul>
                {footer.map((menu) => (
                  <li className="m-3 inline-block" key={menu.name}>
                    <Link href={menu.url}>{menu.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:mt-0 lg:text-right">
            <Social source={social.main} className="social-icons" />
          </div>
        </div>
      </div>
      <div className="border-t border-border py-7 dark:border-darkmode-border">
        <div className="container text-center text-light dark:text-darkmode-light">
          <div dangerouslySetInnerHTML={markdownify(copyright)} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
