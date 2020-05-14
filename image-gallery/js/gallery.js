const storage = firebase.storage();
const imageRef = storage.ref("images");
const imageContainer = document.querySelector(".imagesContainer");

imageRef
  .listAll()
  .then((res) => {
    res.items.forEach((imageRef) => {
      displayImage(imageRef);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const displayImage = (imageRef) => {
  imageRef
    .getDownloadURL()
    .then((url) => {
      createImageDiv(url);
    })
    .catch((error) => {
      console.log(error);
    });
};

const createImageDiv = (url) => {
  let div = document.createElement("div");
  div.setAttribute("style", "height: 200px");
  let img = document.createElement("img");
  img.src = url;
  img.setAttribute(
    "style",
    "width: 100%; height: 100%; object-fit: cover; object-position: center"
  );
  div.appendChild(img);
  imageContainer.appendChild(div);
};
