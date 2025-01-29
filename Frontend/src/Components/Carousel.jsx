export const Carousel = () => {
    return (
        <>
            <div id="carouselExampleFade" class="carousel slide carousel-fade carousel-custom" data-bs-interval="1000" style={{
                    width: "100vw", // 100% of the viewport width
                    height: "100vh", // 100% of the viewport height (optional for full screen height)
                    overflow: "hidden"
                }}>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="https://media.istockphoto.com/id/1158240566/photo/happy-black-woman-wearing-warm-clothes.jpg?s=2048x2048&w=is&k=20&c=9tBV7eXv_ElaYQxfRp7phgaPL7MYzeWvCzJmk5owR8M=" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                    <img src="https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?q=80&w=1979&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                    <img src="https://media.istockphoto.com/id/927561308/photo/young-man-wearing-winter-clothes-in-the-street.jpg?s=2048x2048&w=is&k=20&c=SEbMRm3xX4gzahFSXS4DnUrZyL89yECSTsdt4XCIuS0=" class="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}