import { MouseEventHandler } from "react";
import styles from "@/app/ui/themed-button.module.css"

export default function ThemedButton({
    text,
    theme,
    handler,
}: Readonly<{
    text: string,
    theme?: "primary" | "secondary" | "tertiary",
    handler?: MouseEventHandler<HTMLButtonElement>,
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
        <button className={`text-base p-2 ${styles.themedButton} ${className}`} onClick={handler}>{text}</button>
    )
}
