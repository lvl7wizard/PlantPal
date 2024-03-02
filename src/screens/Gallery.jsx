import { View, Text, StyleSheet, Image, Pressable, Modal, ScrollView} from "react-native";
import { useState} from "react";
import { useRoute } from "@react-navigation/native"
import GradientBackground from "../Components/GradientBackround.jsx";


export default function Gallery({navigation}) {
  const route = useRoute()
  const [plant, setPlant] = useState(route.params.plant)

  const [modalVisible, setModalVisible] = useState(false)
  const [currentModalImage, setCurrentModalImage] = useState(0)




  return (
    <GradientBackground>    
    {/* ---------------GALLERY----------------------- */}
      <ScrollView>
        <View style={[styles.gallery]}>
          {modalVisible ? (
            //---------------SLIDESHOW VIEW OF GALLERY----------------------- //
            <Modal onRequestClose={() => setModalVisible(false)}>
            <GradientBackground>    
              <Pressable onPress={() => setModalVisible(false)}>
                <Image source={{ uri: plant.images[currentModalImage] }} style={[styles.galleryImage, { margin: 2, width: '99%' }]} />
              </Pressable>
              {/* <Pressable style={styles.button} onPress={() => {setCurrentModalImage((currentModalImage-1) % plant.images.length)}}>
                <Text>Previous</Text>
                </Pressable> */}
              <Pressable style={styles.confirmationButton} onPress={() => {setCurrentModalImage((currentModalImage+1) % plant.images.length)}}>
                <Text>Next</Text>
                </Pressable>
                </GradientBackground>
            </Modal>
          ) : (
            /* ---------------IMAGE CARD VIEW OF GALLERY----------------------- */
            plant.images.map((image, index) => (
              <>
                <Pressable key={index} onPress={() => { setModalVisible(true), setCurrentModalImage(index) }}>
                  <Image source={{ uri: image }} style={[styles.galleryImage, { width: 125 }]} />
                </Pressable>
              </>
            ))
          )}
        </View>

    </ScrollView>
    </GradientBackground>
  )
};

const styles = StyleSheet.create({
  changePhoto: {
    position: 'absolute',
    left: 50,
    right: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '50%',
  },
  main: {
    display: 'flex',
    alignItems: 'center',
  },
  galleryImage: {
    aspectRatio: 1,
  },
  gallery: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 2,
    marginLeft: 8,
    marginTop: 8,
  },
  blockText: {
    marginVertical: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: 'limegreen',
    width: 'min-content',
    padding: 10,
    margin: 70,
  },
  text: {
    color: 'black',
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  confirmationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    left: "20%",
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    width: 200,
    height: 40,
    paddingBottom: 10,
    paddingTop: 7,
    borderWidth: 1,
    borderRadius: 6,
  }
});
