import InfoImg from "./InfoImg";

const generateRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

interface ImgWithDescr {
  path: string;
  descr: string;
  width: number;
  height: number;
  top: number;
  left: number;
}
const checkIntersection = (newImage: ImgWithDescr, existingImages: ImgWithDescr[]) => {
  return existingImages.some((image) => {
    return !(
      newImage.left + newImage.width < image.left ||
      newImage.left > image.left + image.width ||
      newImage.top + newImage.height < image.top ||
      newImage.top > image.top + image.height
    );
  });
};

const Info = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const imagesData = [
    { path: "/node_js.png", descr: "This is Node JS" },
    { path: "/redis.svg", descr: "This is Redis" },
    { path: "/react_js.svg", descr: "This is React JS" },
    { path: "/nodemailer.jpg", descr: "This is Nodemailer" },
    { path: "/merkle_tree.jpg", descr: "This is Merkle Proof Tree" },
    { path: "/replay.jpg", descr: "This is Replay Attack Protection" },
    { path: "/cors_js.png", descr: "This is CORS" },
  ];

  const images: ImgWithDescr[] = [];

  imagesData.forEach((imageData) => {
    let newImage;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      newImage = {
        ...imageData,
        width: generateRandomValue(80, 256),
        height: generateRandomValue(80, 256),
        top: generateRandomValue(0, screenHeight - 256),
        left: generateRandomValue(0, screenWidth - 256),
      };
      attempts++;
    } while (checkIntersection(newImage, images) && attempts < maxAttempts);

    images.push(newImage);
  });

  return (
    <>
      {images.map((image, index) => (
        <InfoImg
          key={index}
          path={image.path}
          descr={image.descr}
          width={image.width}
          height={image.height}
          top={image.top}
          left={image.left}
        />
      ))}
    </>
  );
};

export default Info;
