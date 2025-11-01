import { Button } from "@heroui/react";
import { memo, useState } from "react";
import { Category, CloseSquare } from "react-iconly";
import { SideBar } from "../../SideBar/SideBar";
import styles from "./NavBarMenuButton.module.css";
import { clsx } from "clsx";
import { useIsDarkTheme } from "../../../hooks/useIsDarkTheme";

const NavBarMenuButtonComponent = () => {
  const [opened, setOpened] = useState(false);

  const iconProps = { filled: true };
  const isDark = useIsDarkTheme();

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
