import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { useFonts } from "expo-font";

const TelaInicial = () => {
  // const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    "Mitr_regular": require('../assets/fonts/Mitr.ttf')
  })
  if (!fontsLoaded) {
    return null;
  }
    
  return (
    <View style={styles.telaInicial}>
      <Text style={styles.colaborafarma}>ColaboraFarma</Text>
      <Pressable
        style={[styles.telaInicialChild, styles.telaPosition]}
        // onPress={() => navigation.navigate("TelaDeLogin")}
      />
      <Pressable
        style={styles.telaPosition}
        // onPress={() => navigation.navigate("TelaDeLogin")}
      >
        <Text style={[styles.entrar1, styles.entrar1Typo]}>Entrar</Text>
      </Pressable>

      <Pressable style={styles.telaPosition}>
        <Text style={[styles.criarConta, styles.entrar1Typo]}>Criar conta</Text>
      </Pressable>
      
      <Text style={[styles.produzidoPor, styles.cFlexBox]}>Produzido por</Text>
      <Image
        style={[styles.logoUfprAzulFormatoPng1Icon, styles.telaPosition]}
        resizeMode="cover"
        source={require("../assets/ufpr-logo.png")}
      />
      <Image
        style={[
          styles.pxInstitutoFederalCatarinenIcon,
          styles.institutoIconPosition,
        ]}
        resizeMode="cover"
        source={require("../assets/ifsc-logo.png")}
      />
      <Image
        style={[
          styles.pxInstitutoFederalGoianoIcon,
          styles.institutoIconPosition,
        ]}
        resizeMode="cover"
        source={require("../assets/ifgo-logo.png")}
      />
      {/* <Image
        style={[styles.telaInicialItem, styles.telaPosition]}
        resizeMode="cover"
        source={require("../assets/ellipse-3.png")}
      /> */}
      <Text style={[styles.c, styles.cFlexBox]}>C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  telaPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  entrar1Typo: {
    width: 141,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  },
  cFlexBox: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.white,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  institutoIconPosition: {
    height: 50,
    width: 59,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  colaborafarma: {
    marginTop: -117,
    marginLeft: -121,
    fontSize: 32,
    width: 250,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.mitrRegular,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  telaInicialChild: {
    marginTop: -24,
    marginLeft: -114,
    borderRadius: Border.br_sm,
    backgroundColor: Color.white,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: 237,
    height: 58,
  },
  entrar1: {
    marginTop: -8,
    marginLeft: -66,
    color: Color.skyblue,
    height: 100,
  },
  criarConta: {
    marginTop: 60,
    marginLeft: -70,
    textDecoration: "underline",
    height: 100,
    color: Color.white,
    width: 141,
    fontSize: FontSize.size_base,
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  produzidoPor: {
    marginTop: 220,
    marginLeft: -90,
    fontSize: 20,
    width: 181,
    fontFamily: FontFamily.montserratMedium,
    fontWeight: "500",
    height: 23,
  },
  logoUfprAzulFormatoPng1Icon: {
    marginTop: 298,
    marginLeft: -45,
    width: 91,
    height: 44,
  },
  pxInstitutoFederalCatarinenIcon: {
    marginTop: 292,
    marginLeft: -134,
  },
  pxInstitutoFederalGoianoIcon: {
    marginTop: 295,
    marginLeft: 75,
  },
  telaInicialItem: {
    marginTop: -221,
    marginLeft: -28,
    width: 65,
    height: 65,
  },
  c: {
    marginTop: -200,
    marginLeft: -14,
    fontSize: FontSize.size_xl,
    width: 36,
    height: 23,
    fontFamily: FontFamily.mitrRegular,
  },
  telaInicial: {
    backgroundColor: Color.skyblue,
    flex: 1,
    width: "100%",
    height: 900,
    overflow: "hidden",
  },
});

export default TelaInicial;
