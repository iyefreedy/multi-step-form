import { Link } from "react-router-dom";

import heroImage from "@assets/images/hero-image.png";

const Home = () => {
    return (
        <main className="text-center">
            <img src={heroImage} alt="Hero image" className="inline-block" />
            <h1 className="mb-4 text-xl font-bold">Create your own library</h1>
            <Link
                to={"/categories"}
                className="rounded-md bg-green-600 px-4 py-2 text-white shadow-md"
            >
                Go
            </Link>
        </main>
    );
};

export default Home;
