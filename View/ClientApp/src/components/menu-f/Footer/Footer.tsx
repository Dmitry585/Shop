import * as React from "react";
import { Container } from '@material-ui/core';
import styles from "./Footer.module.css"

export default class Footer extends React.PureComponent<{}, {}> {
    render() {
        return (
            <footer className={styles.footer}>
                <Container maxWidth="lg">
                    <span className="text-muted">Footer content</span>
                </Container>
            </footer>
        );
    }
}
