import { Heading, Navbar } from "react-bulma-components";

export function AppHeader() {
    return (
        <header>
            <Navbar p={3}>
                <Navbar.Brand>
                    <Navbar.Item id="logo" href="/">
                        <Heading>SampleGraph</Heading>
                    </Navbar.Item>
                </Navbar.Brand>
            </Navbar>
        </header>
    );
}