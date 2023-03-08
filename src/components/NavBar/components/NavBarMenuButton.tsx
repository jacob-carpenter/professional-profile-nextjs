import { Button, useTheme } from "@nextui-org/react";
import { memo, useState } from "react";
import { Category, CloseSquare } from "react-iconly";
import { SideBar } from "../../SideBar/SideBar";
import styles from "./NavBarMenuButton.module.css";
import { clsx } from "clsx";

const NavBarMenuButtonComponent = () => {
  const [opened, setOpened] = useState(false);

  const iconProps = { filled: true };
  const { isDark } = useTheme();

  return (
    <>
      <Button
        auto
        ghost
        rounded
        icon={
          opened ? <CloseSquare {...iconProps} /> : <Category {...iconProps} />
        }
        onClick={() => setOpened((value) => !value)}
      />

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
