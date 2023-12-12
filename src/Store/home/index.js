import Navigation from "../navigation";
import img1 from "../../../src/productImages/1.jpg";
import img2 from "../../../src/productImages/2.jpg";
import img3 from "../../../src/productImages/3.jpg";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import * as itemClient from "../products/itemClient";

function Home() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        itemClient.findAllItems().then((items) =>
           setProducts(items)
        );
    }, []);

    return (
        <div>
            <Navigation />
            <header className="bg-primary-gradient">
                <div className="container pt-4 pt-xl-5">
                    <div className="row pt-5">
                        <div className="col-md-8 col-xl-6 text-center text-md-start mx-auto">
                            <div className="text-center">
                                <p className="fw-bold sage mb-2">Check out our products!</p>
                                <h1 className="fw-bold">All of your shopping needs in one place!</h1>
                            </div>
                        </div>
                        <div className="col-12 col-lg-10 mx-auto">
                            <div className="position-relative" style={{ display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                                {products ? <img className="img-fluid" src={products[0].images[0]} /> : <img className="img-fluid" src={img1} />}
                                {products? <img className="img-fluid" src={products[1].images[0]} /> : <img className="img-fluid" src={img2} />}
                                {products? <img className="img-fluid" src={products[2].images[0]} /> : <img className="img-fluid" src={img3} />}

                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="py-5"></section>
            <section></section>
            <section className="py-5 mt-5"></section>
            <footer className="bg-primary-gradient"></footer>
            <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            <script src="../assets/js/bs-init.js"></script>
            <script src="../assets/js/bold-and-bright.js"></script>
        </div>
    );
}

export default Home;