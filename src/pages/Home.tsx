import { Link } from "react-router-dom";

import heroImage from "@assets/images/hero-image.png";

const Home = () => {
    return (
        <main className="text-center">
            <img src={heroImage} alt="Hero image" className="inline-block" />
            <h1 className="text-xl font-bold mb-4">Create your own library</h1>
            <Link
                to={"/categories"}
                className="py-2 px-4 bg-green-600 rounded-md shadow-md text-white"
            >
                Go
            </Link>
        </main>
    );
};

export default Home;
