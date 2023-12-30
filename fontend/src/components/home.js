import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllProductsQuery } from "../features/producrsAPI";
import { addToCart } from "../features/cartSlice";

export function Home() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        Navigate("/cart")
    }

    const { data, error, isLoading } = useGetAllProductsQuery();

    return (
        <div className="container home-container">
            <h2>New Arrivals</h2>
            {
                isLoading ? <p>Loading...</p> : error ? <p>An Error Occured...</p> : (<div className="products">
                    {data.map(item => <div className="product-box" key={item.id}>
                        <h3>{item.name}</h3>
                        <img src={item.image} alt={item.name} />
                        <div className="details">
                            <p>{item.price}$</p>
                            <p>{item.desc}</p>
                        </div>
                        <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    </div>)}
                </div>)
            }
        </div>
    )
}