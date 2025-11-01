import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { memo, useState } from "react";
import { Category, CloseSquare } from "react-iconly";
import { SideBar } from "../../SideBar/SideBar";
import styles from "./NavBarMenuButton.module.css";
import { clsx } from "clsx";

const NavBarMenuButtonComponent = () => {
  const [opened, setOpened] = useState(false);

  const iconProps = { filled: true };
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <Button
        isIconOnly
        variant="ghost"
        radius="full"
        onClick={() => setOpened((value) => !value)}
      >
        {opened ? <CloseSquare {...iconProps} /> : <Category {...iconProps} />}
      </Button>

      <nav
        className={clsx({
          [styles.mobileNavigationContainer]: true,
          [styles.opened]: opened,
          [styles.isDark]: isDark,
        })}
      >
        <ul className={styles.mobileNavigationWrapper}>
          <li>
            <SideBar />
          </li>
        </ul>
      </nav>
    </>
  );
};

export const NavBarMenuButton = memo(NavBarMenuButtonComponent);
