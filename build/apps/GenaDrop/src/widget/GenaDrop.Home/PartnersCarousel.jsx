const partnersList = [
  {
    website: "https://www.herdrop.com/",
    imageSrc: "/static/media/herdao.18aa16e7.png",
  },
  {
    website: "https://proofofvibes.vercel.app/",
    imageSrc: "/static/media/proofofvibes.3ec1baec.svg",
  },
  {
    website: "https://www.bluntdao.com/",
    imageSrc: "/static/media/bluntdao.6154b86b.svg",
  },
  {
    website: "https://www.onboarddao.com/",
    imageSrc: "/static/media/onboarddao.3a02aa23.svg",
  },
  {
    website: "https://www.herdrop.com/",
    imageSrc: "/static/media/herdao.18aa16e7.png",
  },
  {
    website: "https://app.proofofvibes.com/",
    imageSrc: "/static/media/proofofvibes.3ec1baec.svg",
  },
  {
    website: "https://www.bluntdao.com/",
    imageSrc: "/static/media/bluntdao.6154b86b.svg",
  },
  {
    website: "http://twitter.com/AuroraNftClub/",
    imageSrc: "/static/media/auroranft.d651860a.png",
  },
  {
    website: "https://www.onboarddao.com/",
    imageSrc: "/static/media/onboarddao.3a02aa23.svg",
  },
  {
    website: "https://www.herdrop.com/",
    imageSrc: "/static/media/herdao.18aa16e7.png",
  },
  {
    website: "https://proofofvibes.vercel.app/",
    imageSrc: "/static/media/proofofvibes.3ec1baec.svg",
  },
  {
    website: "https://www.bluntdao.com/",
    imageSrc: "/static/media/bluntdao.6154b86b.svg",
  },
  {
    website: "https://www.onboarddao.com/",
    imageSrc: "/static/media/onboarddao.3a02aa23.svg",
  },
  {
    website: "https://www.herdrop.com/",
    imageSrc: "/static/media/herdao.18aa16e7.png",
  },
  {
    website: "https://app.proofofvibes.com/",
    imageSrc: "/static/media/proofofvibes.3ec1baec.svg",
  },
  {
    website: "https://www.bluntdao.com/",
    imageSrc: "/static/media/bluntdao.6154b86b.svg",
  },
  {
    website: "http://twitter.com/AuroraNftClub/",
    imageSrc: "/static/media/auroranft.d651860a.png",
  },
  {
    website: "https://www.onboarddao.com/",
    imageSrc: "/static/media/onboarddao.3a02aa23.svg",
  },
  {
    website: "https://app.proofofvibes.com/",
    imageSrc: "/static/media/proofofvibes.3ec1baec.svg",
  },
  {
    website: "https://www.bluntdao.com/",
    imageSrc: "/static/media/bluntdao.6154b86b.svg",
  },
  {
    website: "http://twitter.com/AuroraNftClub/",
    imageSrc: "/static/media/auroranft.d651860a.png",
  },
  {
    website: "https://www.onboarddao.com/",
    imageSrc: "/static/media/onboarddao.3a02aa23.svg",
  },
  {
    website: "https://www.herdrop.com/",
    imageSrc: "/static/media/herdao.18aa16e7.png",
  },
  {
    website: "https://proofofvibes.vercel.app/",
    imageSrc: "/static/media/proofofvibes.3ec1baec.svg",
  },
  {
    website: "https://www.bluntdao.com/",
    imageSrc: "/static/media/bluntdao.6154b86b.svg",
  },
  {
    website: "https://www.onboarddao.com/",
    imageSrc: "/static/media/onboarddao.3a02aa23.svg",
  },
  {
    website: "https://www.herdrop.com/",
    imageSrc: "/static/media/herdao.18aa16e7.png",
  },
  {
    website: "https://app.proofofvibes.com/",
    imageSrc: "/static/media/proofofvibes.3ec1baec.svg",
  },
  {
    website: "https://www.bluntdao.com/",
    imageSrc: "/static/media/bluntdao.6154b86b.svg",
  },
  {
    website: "http://twitter.com/AuroraNftClub/",
    imageSrc: "/static/media/auroranft.d651860a.png",
  },
  {
    website: "https://www.onboarddao.com/",
    imageSrc: "/static/media/onboarddao.3a02aa23.svg",
  },
];
const displayedPartnersList = partnersList.map((partner, index) => (
  <li
    className="splide__slide splide__slide--clone"
    id={`splide01-clone${index + 1 > 9 ? index + 1 : "0" + index + 1}`}
    role="group"
    aria-roledescription="slide"
    aria-label={`${index + 1} of ${partnersList.length}`}
    style={{ marginRight: "2rem" }}
    aria-hidden="true"
  >
    <div>
      <a
        href={partner.website}
        target="_blank"
        rel="noreferrer"
        className="MediaBar_slide"
        tabindex="-1"
      >
        <img
          src={`https://www.genadrop.io${partner.imageSrc}`}
          alt={partner.website}
        />
      </a>
    </div>
  </li>
));
const Partners = styled.div`
  .Partners_wrapper {
    width: 100%;
  }
  .Partners_container * {
    transition: max-width 0.3s;
  }
  .splide.is-initialized,
  .splide.is-rendered {
    visibility: visible;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
  }
  .splide__list {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    position: 0 -200px;
    height: 100%;
    width: 100%;
    margin: 0 !important;
    padding: 0 !important;
    animation: moveSlideshow 80s linear infinite;
    transform: translate3d(0, 0, 0);
    &:hover {
      animation-play-state: paused;
    }
  }
  li {
    list-style: none;
  }
  .MediaBar_slide {
    display: flex;
    position: relative;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    z-index: 2;
  }
  a {
    text-decoration: none;
    color: unset;
    cursor: pointer;
  }
  .MediaBar_slide img {
    height: 4rem;
    width: auto;
    aspect-ratio: 3/2;
    object-fit: contain;
    filter: gray;
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
    transition: all 0.3s;
  }
  .MediaBar_slide img:hover {
    filter: none;
    -webkit-filter: grayscale(0);
    filter: grayscale(0);
  }
  @keyframes moveSlideshow {
    100% {
      transform: translateX(-66.6666%);
    }
  }
`;
return (
  <Partners>
    <div className="Partners_wrapper">
      <div
        className="splide is-initialized splide--loop splide--ltr splide--draggable is-active"
        id="splide01"
        role="region"
        aria-roledescription="carousel"
      >
        <div
          className="splide__track splide__track--loop splide__track--ltr splide__track--draggable"
          id="splide01-track"
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
          aria-live="off"
          aria-relevant="additions"
        >
          <ul className="splide__list" id="splide01-list" role="presentation">
            {displayedPartnersList}
          </ul>
        </div>
      </div>
    </div>
  </Partners>
);
