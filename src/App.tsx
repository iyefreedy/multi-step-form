import { AuthProvider } from "./contexts/AuthContext";
import { Outlet } from "react-router-dom";

import Navbar from "@components/Navbar";

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <main className="p-8">
                <Outlet />
            </main>
        </AuthProvider>
    );
}

export default App;
