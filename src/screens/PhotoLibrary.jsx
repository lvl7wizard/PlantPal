import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native';

export default function PhotoLibrary() {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
      <Button title="Choose a photo" onPress={pickImageAsync} />
  );
}