/**
 * Use object destructuring to pick relevant properties from the data object.
 * References:
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 */

const buildImage = ({
  description,
  width,
  height,
  urls: { full, regular, small },
}) => {
  let srcset = `${full} ${width}w`;
  if (regular) {
    srcset = srcset + `, ${regular} 1080w`;
  }
  if (small) {
    srcset = srcset + `, ${small} 400w`;
  }

  const img = `
    <img
          srcset="${srcset}"
          sizes="(max-width: 450px) 400px, (max-width: 800) 1080px"
          src="${regular}"
          width="${width}"
          height="${height}"
          alt="${description}"
          loading="lazy"
        />
    `;
  return img;
};

const getDate = (imgData) => {
  const { created_at: createdDate } = imgData;
  const date = new Date(createdDate);
  const niceDate = date.toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return niceDate;
};

// De-structuring the JSON data in order to improve efficiency,
//  so we don't have to traverse the JSON tree every time we need
//  to access some data.
const Card = (imgData) => {
  const {
    description,
    user: { name },
    created_at: createdDate,
    links: { self },
  } = imgData;

  return `
    <figure class="image">
      ${buildImage(imgData)}
      <figcaption class="image__caption">
        <h3 class="image__title">${description}</h3>
        <div class="image__meta">
          <p>
            Photo by
            <span class="image__photog">${name}</span>.
          </p>
          <p>
            Uploaded on <time class="image__date" datetime="${createdDate}">${getDate(
    imgData
  )}</time>.
          </p>
          <p>
            <a href="${self}" class="image__link">
              View it on Unsplash.
            </a>
          </p>
        </div>
      </figcaption>
    </figure>
  `;
};

export default Card;
