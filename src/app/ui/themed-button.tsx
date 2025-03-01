import { MouseEventHandler } from "react";
import styles from "@/app/ui/themed-button.module.css"

export default function ThemedButton({
    children,
    classes,
    onClick,
    theme,
}: Readonly<{
    children: React.ReactNode;
    classes?: string,
    theme?: "primary" | "secondary" | "tertiary",
    onClick?: MouseEventHandler<HTMLButtonElement>,
}>) {
    let className = styles.plain;

    switch (theme) {
        case "primary":
            className = styles.primary
            break;
        case "secondary":
            className = styles.secondary
            break;
        case "tertiary":
            className = styles.tertiary
            break;
    }

    return (
        <button className={`text-base p-2 ${classes} ${styles.themedButton} ${className}`} onClick={onClick}>{children}</button>
    )
}
