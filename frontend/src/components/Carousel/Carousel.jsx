import React from "react";

function Carousel() {
  return (
    <div className="container-fluid">
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div class="carousel-inner" style={{ maxHeight: "400px" }}>
          <div class="carousel-item active">
            <img
              src="https://t3.ftcdn.net/jpg/07/48/59/38/360_F_748593837_mWVU6MyzgP9yeAdDJW6UkReK7GGGTSbH.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://i.pinimg.com/736x/be/83/60/be83607be6a98648c47b8563b8b7edca.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item"></div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
