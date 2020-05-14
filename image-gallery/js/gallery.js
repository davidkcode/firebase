const storage = firebase.storage();
const imageRef = storage.ref("images");
const imageUrls = [];

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
      console.log(url);
    })
    .catch((error) => {
      console.log(error);
    });
};
