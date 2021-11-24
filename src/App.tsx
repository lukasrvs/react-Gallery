import { useState, useEffect, FormEvent } from 'react';
import * as Component from './App.styles';
import * as Photos  from './services/photos';
import { PhotoItem } from './components/PhotoItem';
import { Photo } from './types/Photo';
const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  useEffect(()=>{
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, []);
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;
    if(file && file.size > 0){
      setUploading(true);
        let result = await Photos.Insert(file);
      setUploading(false);
      if(result instanceof Error){
        alert(`${result.name} - ${result.message}`)
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  }
  return(
    <Component.Container>
      <Component.Area>
        <Component.Header>Gallery</Component.Header>
        <Component.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input className="button" type="submit" value="Send"/>
          {uploading && "Sending..."}
        </Component.UploadForm>
          {loading &&
            <Component.ScreenWarning>
              <div className="emoji">⛔️</div>
              <div>Loading...</div>
            </Component.ScreenWarning>
          }
          {!loading && photos.length > 0 &&
            <Component.PhotoList>
              {photos.map((item, index)=>(
                <PhotoItem key={index} url={item.url} name={item.name} />
              ))}
            </Component.PhotoList>
          }
          {!loading && photos.length === 0 &&
            <Component.ScreenWarning>
            <div className="emoji">☹️</div>
            <div>No photos were sent.</div>
          </Component.ScreenWarning>
          }
      </Component.Area>
    </Component.Container>
  );
}
export default App;