let bikes;

async function renderBikes(filter) {
  const bikesWrapper = document.querySelector(".bikes");

  bikesWrapper.classList += ' bikes__loading'

  if(!bikes) {
    bikes = await getBikes();
  }

  bikesWrapper.classList.remove('bikes__loading');

  if (filter === "LOW_TO_HIGH") {
    bikes.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    bikes.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    bikes.sort((a, b) => b.rating - a.rating);
  }

  const bikesHTML = bikes
    .map((bike) => {
      return `<div class="bike">
              <figure class="bike__img--wrapper">
                <img class="bike__img" src="${bike.url}" alt="">
              </figure>
              <div class="bike__title">
                ${bike.title}
              </div>
              <div class="bike__ratings">
                ${ratingsHTML(bike.rating)}
              </div>
              <div class="bike__price">
                ${priceHTML(bike.originalPrice, bike.salePrice)}
              </div>
            </div>`;
    })
    .join("");

  bikesWrapper.innerHTML = bikesHTML;
}

function filterBikes(event) {
  renderBikes(event.target.value);
}

function ratingsHTML(rating) {
  let ratingHTML = "";

  for (let i = 0; i < Math.floor(rating); i++) {
    ratingHTML += `<i class="fas fa-star"></i>\n`;
  }

  if (!Number.isInteger(rating)) {
    ratingHTML += `<i class="fas fa-star-half-alt"></i>\n`;
  }

  return ratingHTML;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`;
  }

  return `<span class="bike__price--normal">$${originalPrice.toFixed(
    2
  )}</span> $${salePrice.toFixed(2)}`;
}

window.onload = () => {
    renderBikes();
  };  

function getBikes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Rockhopper Sport",
          url: "./assets/Rockhopper.webp",
          originalPrice: 750,
          salePrice: 700,
          rating: 5,
        },
        {
          id: 2,
          title: "S-Works Stumpjumper EVO",
          url: "./assets/Stumpjumper.webp",
          originalPrice: 11500,
          salePrice: 6499.99,
          rating: 4.5,
        },
        {
          id: 3,
          title: "Chisel Hardtail",
          url: "./assets/Chisel.webp",
          originalPrice: 1800,
          salePrice: 1349.99,
          rating: 4.5,
        },
        {
          id: 4,
          title: "Fuse 27.5",
          url: "./assets/Fuse.webp",
          originalPrice: 1500,
          salePrice: 949.99,
          rating: 4,
        },
        {
          id: 5,
          title: "S-Works Epic World Cup LTD",
          url: "./assets/worldcupltd.webp",
          originalPrice: 14000,
          salePrice: 12999.99,
          rating: 3.5,
        },
        {
          id: 6,
          title: "STATUS 2 170",
          url: "./assets/status.webp",
          originalPrice: 3500,
          salePrice: null,
          rating: 4,
        },
        {
          id: 7,
          title: "P.1 Trail",
          url: "./assets/p1trail.webp",
          originalPrice: 1000,
          salePrice: 899.99,
          rating: 3,
        },
        {
          id: 8,
          title: "P.2 Trail",
          url: "./assets/p2trail.webp",
          originalPrice: 1500,
          salePrice: 1399.99,
          rating: 3.5,
        },
        {
          id: 9,
          title: "STATUS 2 170 DH",
          url: "./assets/status2.webp",
          originalPrice: 4500,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 10,
          title: "Epic 8 EVO Expert",
          url: "./assets/epic8.webp",
          originalPrice: 7000,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 11,
          title: "Turbo Levo Comp Alloy",
          url: "./assets/turbo.webp",
          originalPrice: 7000,
          salePrice: null,
          rating: 4,
        },
        {
          id: 12,
          title: "Demo Race",
          url: "./assets/demorace.webp",
          originalPrice: 7100,
          salePrice: null,
          rating: 4.5,
        },
      ]);
    }, 1000);
  });
}
