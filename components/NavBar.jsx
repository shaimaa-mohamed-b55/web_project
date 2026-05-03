import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="navbar">
            <span className="brand">MyFinance</span>
            <ul className="nav-links">
                <li><Link href="/">Dashboard</Link></li>
                <li><Link href="/feed">Feed</Link></li>
                <li><Link href="/profile">Profile</Link></li>
                <li><Link href="/users">Users</Link></li>

            </ul>
        </nav>
    );
}
