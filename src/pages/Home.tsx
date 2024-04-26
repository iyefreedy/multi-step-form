import heroImage from "@assets/images/hero-image.png";

const Home = () => {
    return (
        <main className="text-center">
            <img src={heroImage} alt="Hero image" className="inline-block" />
            <h1 className="text-xl font-bold">Create your own library</h1>
        </main>
    );
};

export default Home;
