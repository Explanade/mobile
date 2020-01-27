"use strict";

import React, { PureComponent } from "react";
import {
    StyleSheet,
    FlatList,
    Image,
    View,
    Text,
    TouchableOpacity,
    CheckBox,
    Linking,
    TouchableHighlight,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';


const defaultCircleSize = 16;
const defaultCircleColor = "#007AFF";
const defaultLineWidth = 2;
const defaultLineColor = "#007AFF";
const defaultTimeTextColor = "black";
const defaultDotColor = "white";
const defaultInnerCircle = "none";

export default class Timeline extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this._renderItem = this._renderItem.bind(this);
        this.renderTime = (this.props.renderTime
            ? this.props.renderTime
            : this._renderTime
        ).bind(this);
        this.renderDetail = (this.props.renderDetail
            ? this.props.renderDetail
            : this._renderDetail
        ).bind(this);
        this.renderCircle = (this.props.renderCircle
            ? this.props.renderCircle
            : this._renderCircle
        ).bind(this);
        this.renderEvent = this._renderEvent.bind(this);

        this.state = {
            data: this.props.data,
            x: 0,
            width: 0
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.data) {
            return {
                data: nextProps.data
            };
        }

        return null;
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={[styles.listview, this.props.listViewStyle]}
                    contentContainerStyle={this.props.listViewContainerStyle}
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index + ""}
                    {...this.props.options}
                />
            </View>
        );
    }

    _renderItem({ item, index }) {
        let content = null;
        switch (this.props.columnFormat) {
            case "single-column-left":
                content = (
                    <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
                        {this.renderTime(item, index)}
                        {this.renderEvent(item, index)}
                        {this.renderCircle(item, index)}
                    </View>
                );
                break;
            case "single-column-right":
                content = (
                    <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
                        {this.renderEvent(item, index)}
                        {this.renderTime(item, index)}
                        {this.renderCircle(item, index)}
                    </View>
                );
                break;
            case "two-column":
                content =
                    (item.position && item.position == "right") || (!item.position && index % 2 == 0) ? (
                        <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
                            {this.renderTime(item, index)}
                            {this.renderEvent(item, index)}
                            {this.renderCircle(item, index)}
                        </View>
                    ) : (
                            <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
                                {this.renderEvent(item, index)}
                                {this.renderTime(item, index)}
                                {this.renderCircle(item, index)}
                            </View>
                        );
                break;
        }
        return <View key={index}>{content}</View>;
    }

    _renderTime(rowData, rowID) {
        if (!this.props.showTime) {
            return null;
        }
        var timeWrapper = null;
        switch (this.props.columnFormat) {
            case "single-column-left":
                timeWrapper = {
                    alignItems: "flex-end"
                };
                break;
            case "single-column-right":
                timeWrapper = {
                    alignItems: "flex-start"
                };
                break;
            case "two-column":
                timeWrapper = {
                    flex: 1,
                    alignItems: (rowData.position && rowData.position == "right") || (!rowData.position && rowID % 2 == 0) ? "flex-end" : "flex-start"
                };
                break;
        }

        const getDirection = (url) => {
            Linking.canOpenURL(url)
                .then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                })
                .catch(err =>
                    console.error('An error occurred', err
                    ));
        }


        return (
            <View style={timeWrapper}>
                <View style={[styles.timeContainer, this.props.timeContainerStyle]}>
                    <Text style={[styles.time, this.props.timeStyle]}>
                        {rowData.order}
                    </Text>
                </View>

                {
                    rowData.photo
                        ? (
                            <View style={styles.shadowContainer}>
                                <Image
                                    source={{ uri: rowData.photo }}
                                    style={styles.imageContainer}
                                    resizeMode={'cover'}
                                />
                            </View>
                        )
                        : (
                            <View>
                            </View>
                        )
                }
                <TouchableHighlight
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginVertical: 15
                    }}
                    onPress={() => getDirection(`https://www.google.com/maps/dir/?api=1&destination=${rowData.lat},${rowData.lng}&dir_action=navigate`)}
                >
                    <View style={{
                        alignItems: "center",
                        borderRadius: 12,
                        paddingHorizontal: 7,
                        paddingVertical: 2,
                        alignItems: "center",
                        backgroundColor: '#f8d879'
                    }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 8,
                                fontFamily: 'Poppins-Medium',
                                textAlign: "center",
                            }} >
                            Get Directions</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    _renderEvent(rowData, rowID) {
        const lineWidth = rowData.lineWidth
            ? rowData.lineWidth
            : this.props.lineWidth;
        const isLast = this.props.renderFullLine
            ? !this.props.renderFullLine
            : this.state.data.slice(-1)[0] === rowData;
        const lineColor = isLast
            ? "rgba(0,0,0,0)"
            : rowData.lineColor ? rowData.lineColor : this.props.lineColor;
        let opStyle = null;

        switch (this.props.columnFormat) {
            case "single-column-left":
                opStyle = {
                    borderColor: lineColor,
                    borderLeftWidth: lineWidth,
                    borderRightWidth: 0,
                    marginLeft: 20,
                    paddingLeft: 20
                };
                break;
            case "single-column-right":
                opStyle = {
                    borderColor: lineColor,
                    borderLeftWidth: 0,
                    borderRightWidth: lineWidth,
                    marginRight: 20,
                    paddingRight: 20
                };
                break;
            case "two-column":
                opStyle =
                    (rowData.position && rowData.position == "right") || (!rowData.position && rowID % 2 == 0)
                        ? {
                            borderColor: lineColor,
                            borderLeftWidth: lineWidth,
                            borderRightWidth: 0,
                            marginLeft: 20,
                            paddingLeft: 20
                        }
                        : {
                            borderColor: lineColor,
                            borderLeftWidth: 0,
                            borderRightWidth: lineWidth,
                            marginRight: 20,
                            paddingRight: 20
                        };
                break;
        }

        return (
            <View
                style={[styles.details, opStyle, this.props.eventContainerStyle]}
                onLayout={evt => {
                    if (!this.state.x && !this.state.width) {
                        const { x, width } = evt.nativeEvent.layout;
                        this.setState({ x, width });
                    }
                }}
            >
                <TouchableOpacity
                    disabled={this.props.onEventPress == null}
                    style={[this.props.detailContainerStyle]}
                    onPress={() =>
                        this.props.onEventPress ? this.props.onEventPress(rowData) : null
                    }
                >
                    <View style={styles.detail}>
                        {this.renderDetail(rowData, rowID)}
                    </View>
                    {this._renderSeparator()}
                </TouchableOpacity>
            </View>
        );
    }

    _renderDetail(rowData, rowID) {
        let description;
        if (typeof rowData.formatted_address === 'string') {
            description = (
                <Text style={[styles.description, this.props.descriptionStyle, rowData.descriptionStyle]}>
                    {rowData.formatted_address}
                </Text>
            );
        } else if (typeof rowData.formatted_address === 'object') {
            description = rowData.formatted_address;
        }

        return (
            <View style={styles.container}>
                <Text style={[styles.title, this.props.titleStyle, rowData.titleStyle]}>
                    {rowData.title}
                </Text>
                <Text
                    style={{
                        fontSize: 9,
                        marginVertical: 5,
                        fontFamily: 'Poppins-Medium'
                    }}
                >{description} </Text>
                {/* <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}> */}
                <FontAwesome name={'star'} style={{ fontSize: 12, color: '#f9b517' }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 11,
                            fontFamily: 'Poppins-Medium'
                        }}
                    > {rowData.rating}</Text>
                </FontAwesome>
                <View style={{ flexDirection: 'row', alignItems: "center", marginLeft: -7 }}>
                    <CheckBox
                        // style={{ width: 5 }}
                        checked={this.state.checked}
                        value={rowData.status}
                        onValueChange={() => this.setState({ checked: !this.state.checked })}
                    />
                    <Text style={{
                        color: !this.state.checked ? 'grey' : '#154036',
                        fontSize: 10,
                        fontFamily: 'Poppins-Medium'
                    }}> complete</Text>
                </View>
                {/* </View> */}
            </View >
        );
    }

    _renderCircle(rowData, rowID) {
        var circleSize = rowData.circleSize
            ? rowData.circleSize
            : this.props.circleSize ? this.props.circleSize : defaultCircleSize;
        var circleColor = rowData.circleColor
            ? rowData.circleColor
            : this.props.circleColor ? this.props.circleColor : defaultCircleColor;
        var lineWidth = rowData.lineWidth
            ? rowData.lineWidth
            : this.props.lineWidth ? this.props.lineWidth : defaultLineWidth;

        var circleStyle = null;

        switch (this.props.columnFormat) {
            case "single-column-left":
                circleStyle = {
                    width: this.state.x ? circleSize : 0,
                    height: this.state.x ? circleSize : 0,
                    borderRadius: circleSize / 2,
                    backgroundColor: circleColor,
                    left: this.state.x - circleSize / 2 + (lineWidth - 1) / 2
                };
                break;
            case "single-column-right":
                circleStyle = {
                    width: this.state.width ? circleSize : 0,
                    height: this.state.width ? circleSize : 0,
                    borderRadius: circleSize / 2,
                    backgroundColor: circleColor,
                    left: this.state.width - circleSize / 2 - (lineWidth - 1) / 2
                };
                break;
            case "two-column":
                circleStyle = {
                    width: this.state.width ? circleSize : 0,
                    height: this.state.width ? circleSize : 0,
                    borderRadius: circleSize / 2,
                    backgroundColor: circleColor,
                    left: this.state.width - circleSize / 2 - (lineWidth - 1)
                };
                break;
        }

        var innerCircle = null;
        switch (this.props.innerCircle) {
            case "icon":
                let iconDefault = rowData.iconDefault ? rowData.iconDefault : this.props.iconDefault;
                let iconSource = rowData.icon ? rowData.icon : iconDefault;
                if (rowData.icon) iconSource = rowData.icon.constructor === String ? { uri: rowData.icon } : rowData.icon
                let iconStyle = {
                    height: circleSize,
                    width: circleSize
                };
                innerCircle = (
                    <Image
                        source={iconSource}
                        defaultSource={iconDefault}
                        style={[iconStyle, this.props.iconStyle]}
                    />
                );
                break;
            case "dot":
                let dotStyle = {
                    height: circleSize / 2,
                    width: circleSize / 2,
                    borderRadius: circleSize / 4,
                    backgroundColor: rowData.dotColor
                        ? rowData.dotColor
                        : this.props.dotColor ? this.props.dotColor : defaultDotColor
                };
                innerCircle = <View style={[styles.dot, dotStyle]} />;
                break;
            case "element":
                innerCircle = rowData.icon;
                break;
        }
        return (
            <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
                {innerCircle}
            </View>
        );
    }

    _renderSeparator() {
        if (!this.props.separator) {
            return null;
        }
        return <View style={[styles.separator, this.props.separatorStyle]} />;
    }
}

Timeline.defaultProps = {
    circleSize: defaultCircleSize,
    circleColor: defaultCircleColor,
    lineWidth: defaultLineWidth,
    lineColor: defaultLineColor,
    innerCircle: defaultInnerCircle,
    columnFormat: "single-column-left",
    separator: false,
    showTime: true
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listview: {
        flex: 1
    },
    sectionHeader: {
        marginBottom: 15,
        backgroundColor: "#007AFF",
        height: 40,
        justifyContent: "center"
    },
    sectionHeaderText: {
        color: "#FFF",
        fontSize: 18,
        alignSelf: "center"
    },
    rowContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center"
    },
    timeContainer: {
        minWidth: 45,
        borderRadius: 50 / 2
    },
    time: {
        textAlign: 'center',
        textAlign: "right",
        color: defaultTimeTextColor,
        overflow: "hidden",
        fontFamily: 'Poppins-Medium',
        borderRadius: 50 / 2
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 10,
        zIndex: 1,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        borderColor: '#3a3d3d',
        borderWidth: 1
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 4,
        backgroundColor: defaultDotColor,
        borderColor: '#3a3d3d',
        borderWidth: 1
    },
    title: {
        fontSize: 12,
        fontWeight: "bold",
        fontFamily: 'Poppins-Medium',
        marginTop: 15
    },
    details: {
        borderLeftWidth: defaultLineWidth,
        flexDirection: "column",
        flex: 1,
    },
    detail: { paddingTop: 10, paddingBottom: 10 },
    description: {
        marginTop: 10,
        fontSize: 9,
        fontFamily: 'Poppins-Medium'
    },
    separator: {
        height: 1,
        backgroundColor: "#aaa",
        marginTop: 10,
        marginBottom: 10
    },
    shadowContainer: {
        width: 153,
        height: 103,
        borderRadius: 12,
        marginTop: 10,
        elevation: 8,
        shadowOffset: { height: 9 },
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        width: 150,
        height: 100,
        marginTop: 3,
        borderRadius: 12
    }
});
