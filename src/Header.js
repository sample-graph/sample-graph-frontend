import { Heading, Navbar } from "react-bulma-components";

export function AppHeader() {
    return (
        <header>
            <Navbar p={3}>
                <Navbar.Brand>
                    <Heading>
                        <Navbar.Item id="logo" href="/">SampleGraph</Navbar.Item>
                    </Heading>
                </Navbar.Brand>
            </Navbar>
        </header>
    );
}