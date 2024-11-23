import React from "react"
import {FlatList, Platform, Appearance, View, Text, SafeAreaView,
    StyleSheet, ScrollView, Image} from "react-native"
import {Colors} from "@/constants/Colors"
import Img from "@/assets/images/jjvtu.png"
const colorScheme = Appearance.getColorScheme()
const theme = colorScheme === "light" ? Colors.light : Colors.dark

function List() {

    const Container = Platform.OS === "web" ? ScrollView : SafeAreaView
    const data = [
            { id: '1', name: 'Apple' },
            { id: '2', name: 'Banana' },
            { id: '3', name: 'Cherry' },
            { id: '4', name: 'Date' },
            { id: '5', name: 'Elderberry' },
            { id: '1', name: 'Apple' },
            { id: '2', name: 'Banana' },
            { id: '3', name: 'Cherry' },
            { id: '4', name: 'Date' },
            { id: '5', name: 'Elderberry' },
    ];


    return (
        <Container>
        <FlatList
        style={style.id}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.id }
        renderItem={ ({item}) => (
            <View style={style.items}>

                <Text style={style.text}> {item.name} </Text>
                <Image style={style.img} source={Img} />
            </View>
            ) }
        />
        </Container>
    )
    }
const style = StyleSheet.create({
    items : {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.background,
        justifyContent: "space-evenly",
        margin: "10px",
        borderRadius: 20,
        width: "100%",
        height: 100,
        overflow: "hidden",
        marginHorizontal: "auto"
        },
    img: {
        borderStyle: "solid",
        borderWidth: 1,
        height: 100,
        width: 100,
        borderRadius: 50

        },
    text: {

        },
    id: {
        height: 250,
        overflow: "hidden",
        }
    })
export default List