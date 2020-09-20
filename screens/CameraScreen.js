import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CameraRoll from '@react-native-community/cameraroll';

const landmarkSize = 2;

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

async function hasAndroidPermission() {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    await PermissionsAndroid.request(permission);
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
}

async function savePicture(data) {
  console.log('log1');
  if (!(await hasAndroidPermission())) {
    return;
  }

  CameraRoll.save(data.uri, 'photo')
    .then(onfulfilled => {
      console.log('log3');
      ToastAndroid.show(onfulfilled, ToastAndroid.SHORT);
    })
    .catch(error => {
      console.log('log4');
      ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
    });
}

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    photoId: 1,
    showGallery: false,
    photos: [],
    //faces: [],
  };

  getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  setRatio(ratio) {
    this.setState({
      ratio,
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync().then(data => {
        console.log('data: ', data);
        //save photo
        hasAndroidPermission();
        savePicture(data);
      });
    }
  };

  // onFacesDetected = ({faces}) => this.setState({faces});
  // onFaceDetectionError = state => console.warn('Faces detection error:', state);

  // renderLandmarksOfFace(face) {
  //   const renderLandmark = position =>
  //     position && (
  //       <View
  //         style={[
  //           styles.landmark,
  //           {
  //             left: position.x - landmarkSize / 2,
  //             top: position.y - landmarkSize / 2,
  //           },
  //         ]}
  //       />
  //     );
  //   return (
  //     <View key={`landmarks-${face.faceID}`}>
  //       {renderLandmark(face.leftEyePosition)}
  //       {renderLandmark(face.rightEyePosition)}
  //       {renderLandmark(face.leftEarPosition)}
  //       {renderLandmark(face.rightEarPosition)}
  //       {renderLandmark(face.leftCheekPosition)}
  //       {renderLandmark(face.rightCheekPosition)}
  //       {renderLandmark(face.leftMouthPosition)}
  //       {renderLandmark(face.mouthPosition)}
  //       {renderLandmark(face.rightMouthPosition)}
  //       {renderLandmark(face.noseBasePosition)}
  //       {renderLandmark(face.bottomMouthPosition)}
  //     </View>
  //   );
  // }

  // renderFaces() {
  //   return (
  //     <View style={styles.facesContainer} pointerEvents="none">
  //       {this.state.faces.map(this.renderFace)}
  //     </View>
  //   );
  // }

  // renderLandmarks() {
  //   return (
  //     <View style={styles.facesContainer} pointerEvents="none">
  //       {this.state.faces.map(this.renderLandmarksOfFace)}
  //     </View>
  //   );
  // }

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={this.onFacesDetected}
        onFaceDetectionError={this.onFaceDetectionError}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={
          'We need your permission to use your camera phone'
        }>
        {/* Flash White_Balance */}
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <View
            style={
              ([styles.flipButton],
              {flex: 0.4, flexDirection: 'row', justifyContent: 'space-around'})
            }>
            {/* zoomIn             */}
            <TouchableOpacity
              style={[styles.flipButton]}
              onPress={this.zoomIn.bind(this)}>
              <Text style={styles.flipText}> + </Text>
            </TouchableOpacity>
            {/* zoomOut           */}
            <TouchableOpacity
              style={[styles.flipButton]}
              onPress={this.zoomOut.bind(this)}>
              <Text style={styles.flipText}> - </Text>
            </TouchableOpacity>
          </View>

          {/* autoFocus           */}
          <TouchableOpacity
            style={[styles.flipButton]}
            onPress={this.toggleFocus.bind(this)}>
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flipButton}
            onPress={this.toggleFlash.bind(this)}>
            <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flipButton}
            onPress={this.toggleWB.bind(this)}>
            <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 25,
          }}>
          {/* FlipTheCamera */}
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
            onPress={this.toggleFacing.bind(this)}>
            <MaterialCommunityIcons
              name="camera-switch"
              style={{color: '#fff', fontSize: 50}}
            />
          </TouchableOpacity>
          {/* takePictureButton */}
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
            onPress={this.takePicture.bind(this)}>
            <FontAwesome name="camera" style={{color: '#fff', fontSize: 50}} />
          </TouchableOpacity>
          {/* galleryButton */}
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}
            onPress={this.toggleView.bind(this)}>
            <FontAwesome name="image" style={{color: '#fff', fontSize: 50}} />
          </TouchableOpacity>
        </View>

        {/* {this.renderLandmarks()} */}
      </RNCamera>
    );
  }
  renderImage() {
    return (
      <View>
        <Image source={{uri: this.state.path}} style={styles.preview} />
        <Text style={styles.cancel} onPress={() => this.setState({path: null})}>
          Cancel
        </Text>
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'transparent',
  },
  galleryButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
});
