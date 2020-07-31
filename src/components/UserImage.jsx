import React, { useState, useEffect } from 'react';
import { getFirebase, getStorage, downloadImage } from '../firebase/firebase.js';
import './user-image.css'

export const UserImage = () => {
  const [image ,setImage] = useState()
  const [imageUrl ,setImageUrl] = useState()
  const [allImages, setAllImages] = useState([])

  const handleImage = event => {
    const image = event.target.files[0];
    setImage(image);
  }

  const onSubmit = event => {
    event.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません")
    }

    const uploadTask = getStorage().ref(`/images/${image.name}`).put(image);

    const next = snapshot => {
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percent + "% done");
      console.log(snapshot);
    }

    const error = error => {
      console.log(error);
    }

    const complete = () => {
      downloadImage(image.name)
      .then(fireBaseUrl => {
        setImageUrl(fireBaseUrl)
      })
    }

    uploadTask.on(
      getFirebase().storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  }



  useEffect(() => {
    getStorage().ref('images').listAll().then(function (res) {
        console.log(res.items[0].location)
        res.items.map((item) => {
            downloadImage(item.location.path.slice(6)).then((url) => {
                setAllImages(prev => ([...prev, url]))
            })
        })
    }).catch(console.error)
  }, [])


  return (
    <div>
      <h5>画像アップロード</h5>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleImage} />
        <button>登録</button>
      </form>
      {imageUrl ? <img className="image" src={imageUrl} alt="uploaded" /> : null}
      <div className="profiles">
        {allImages.map((image, i) => {
          if (i >= 2) {
            return null
          }

          return (
            <div className="profile" key={image}>
              <p>ユーザ {i + 1}: {i == 0 ? "X" : "O"}</p>
              <img className="image" src={image} alt={`uploaded${i}`} />
            </div>
          );
        })}
      </div>
    </div>
  )
}