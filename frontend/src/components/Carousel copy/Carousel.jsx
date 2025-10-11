import React from "react";

function Carousel() {
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cars-for-rent-banner-design-template-e872bee7c23f3964960d1d96528c87cd_screen.jpg?ts=1671506576"
              class="d-block w-100"
              alt="..."
              style={{ height: "240px" }}
              loading="lazy"
              title="carousel-im"
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cars-for-rent-banner-design-template-e872bee7c23f3964960d1d96528c87cd_screen.jpg?ts=1671506576"
              class="d-block w-100"
              alt="..."
              style={{ height: "240px" }}
              loading="lazy"
              title="carousel-im"
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cars-for-rent-banner-design-template-e872bee7c23f3964960d1d96528c87cd_screen.jpg?ts=1671506576"
              class="d-block w-100"
              alt="..."
              style={{ height: "240px" }}
              loading="lazy"
              title="carousel-im"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-target="#carouselExampleIndicators"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-target="#carouselExampleIndicators"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
