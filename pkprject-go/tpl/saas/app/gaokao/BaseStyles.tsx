export const BaseStyles = {
    pointer: {
        cursor: 'pointer',
    },
    title: {
        margin: '0 0 20px 0',
        fontSize: '18px',
        fontWeight: 800,
        title: {
            margin: '0 0 10px',
            fontSize: '16px',
            fontWeight: 400,
        },
    },
    describe: {
        margin: '10px 0 40px 0',
        fontSize: '14px',
        color: '#999999',
    },
    opStyle: {
        fontSize: '12px',
        marginRight: '15px',
    },
    option: {
        marginBottom: '20px',
        fc: {
            color: 'rgb(109, 106, 106)',
        },
        bb: {
            padding: '0 0 15px 0',
            borderBottom: '1px solid #e4e4e4',
        },
        span: {
            fontSize: '14px',
            width: '400px',
        },
        label: {
            fontSize: '14px',
            verticalAlign: 'top',
            width: '50px',
        },
        label2: {
            fontSize: '14px',
            verticalAlign: 'top',
            width: '100px',
        },
        label3: {
            verticalAlign: 'top',
            width: '80px',
        },
        mb: {
            marginBottom: '10px',
            display: 'block',
        },
        save: {
            display: 'inline-block',
            cursor: 'pointer',
            marginBottom: '40px',
            color: '#0099ff',
        },
        black: {
            cursor: 'pointer',
            color: '#fff',
            backgroundColor: '#0099ff',
            fontSize: '14px',
            textDecoration: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            position: 'absolute',
            right: '5px',
            top: '0px',
        },
        edit: {
            fontSize: '14px',
            verticalAlign: 'top',
            display: 'inline-block',
            cursor: 'pointer',
            marginLeft: '30px',
            color: '#0099ff',
        },
        edit2: {
            verticalAlign: 'top',
            display: 'inline-block',
            cursor: 'pointer',
            marginLeft: '30px',
            color: '#0099ff',
            fontSize: '12px',
            position: 'absolute',
            right: '5px',
            top: '0px',
            span: {
                marginRight: '5px',
            },
        },
        del: {
            verticalAlign: 'top',
            display: 'inline-block',
            cursor: 'pointer',
            marginLeft: '30px',
            marginTop: '10px',
            color: 'red',
        },
        input: {
            display: 'inline-block',
            leftInput: {
                width: '300px',
                marginRight: '10px',
            },
            rightInput: {
                width: '200px',
            },
        },
    },
    icon: {
        display: 'inline-block',
        marginRight: '3px',
    },
    con: {
        padding: '20px 0',
        overflow: 'hidden',
    },
    content: {
        backgroundColor: '#fff',
        border: '1px solid rgb(228, 228, 228)',
        padding: '20px 20px 30px',
        margin: '10px 0',
        overflow: 'hidden',
        width: '100%',
        m: {
            padding: '20px 20px',
        },
        of: {
            overflow: 'hidden',
        },
        left: {
            float: 'left',
            width: '50%',
        },
        right: {
            float: 'left',
            width: '50%',
        },
        gray: {
            backgroundColor: '#fafafa',
        },
    },
    multipleChoice: {
        margin: '40px 0',
        borderTop: '1px solid rgb(228, 228, 228)',
        borderLeft: '1px solid rgb(228, 228, 228)',
        borderRight: '1px solid rgb(228, 228, 228)',
        item: {
            borderBottom: '1px solid rgb(228, 228, 228)',
            backgroundColor: '#f4f4f4',
            minHeight: '50px',
            overflow: 'hidden',
            title: {
                float: 'left',
                width: '140px',
                height: '100%',
                lineHeight: '50px',
                textAlign: 'right',
                padding: '0 15px',
                verticalAlign: 'middle',
            },
            children: {
                backgroundColor: '#fff',
                verticalAlign: 'middle',
                minHeight: '50px',
                marginLeft: '120px',
                padding: '0 10px',
                overflow: 'hidden',
                item: {
                    lineHeight: '50px',
                    float: 'left',
                    marginRight: '10px',
                    lable: {
                        padding: '3px 10px',
                        color: '#666666',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        active: {
                            backgroundColor: '#108ee9',
                            color: '#fff',
                        },
                        ':hover': {
                            backgroundColor: '#108ee9',
                            color: '#fff',
                        },
                    },
                },
            },
        },
    },
    search: {
        item: {
            float: 'left',
            marginRight: '10px',
            span: {
                cursor: 'pointer',
                padding: '5px 10px',
                backgroundColor: '#f4f4f4',
                color: '#666666',
                active: {
                    backgroundColor: 'rgba(0, 153, 255, 0.25)',
                    color: 'rgba(0, 153, 255, 0.7)',
                },
                ':hover': {
                    backgroundColor: 'rgba(0, 153, 255, 0.25)',
                    color: 'rgba(0, 153, 255, 0.7)',
                },
            },
        },
    },
    institute: {
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#F9F9FB',
        },
        t: {
            borderBottom: '1px solid rgb(228, 228, 228)',
            padding: '0 0 10px',
            img: {
                width: '50px',
                height: '50px',
                float: 'left',
            },
            imgCenter: {
                width: '120px',
                height: '120px',
            },
            info: {
                marginLeft: '60px',
                content: {
                    title: {
                        color: '#428bca',
                        fontSize: '18px',
                    },
                    icon: {
                        fontSize: '14px',
                        margin: '0px 5px 0px 20px',
                    },
                    map: {},
                },
                kind: {
                    margin: '5px 0 10px 0',
                    span: {
                        fontSize: '14px',
                        color: '#666',
                        marginRight: '10px',
                    },
                },
                score: {
                    overflow: 'hidden',
                    left: {
                        padding: '5px 15px 0 0',
                        label: {},
                        span: {
                            padding: '0 10px',
                            borderRight: '3px solid rgb(228, 228, 228)',
                        },
                    },
                    right: {
                        padding: '0',
                    },
                },
            },
        },
        b: {
            padding: '30px 0 0',
            title: {
                float: 'left',
                width: '70px',
            },
            right: {
                overflow: 'hidden',
                marginLeft: '70px',
                span: {
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                },
            },
        },
    },
    instituteInfo: {
        margin: '10px 0',
        clr: {
            color: '#0099ff',
        },
        red: {
            color: 'red',
        },
        span: {
            padding: '0 10px',
        },
        icon: {
            marginRight: '5px',
            color: '#0099ff',
        },
        step: {
            textAlign: 'center',
            backgroundColor: '#0099ff',
            color: '#fff',
            padding: '10px 0',
            margin: '10px 0 0',
        },
        kind: {
            margin: '0 10px',
        },
        leftIndex: {
            index: {
                color: '#000',
                width: '70px',
                height: '70px',
                float: 'left',
                fontSize: '30px',
            },
            numberLine: {
                width: '33px',
                height: '0',
                borderBottom: '1px solid red',
                transform: 'translateY(-15px) translateX(29px) rotate(117deg)',
            },
        },
        garden: {
            position: 'absolute',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            po: {
                position: 'relative',
                margin: '20px auto',
            },
            wrap: {
                backgroundColor: '#eeeeee',
                clipAuto: {
                    clip: 'rect(auto, auto, auto, auto)',
                },
                circle: {
                    boxSizing: 'border-box',
                    border: '40px solid #eeeeee',
                    clip: 'rect(0,160px,160px,80px)',
                    percent: {
                        boxSizing: 'border-box',
                        top: '-40px',
                        left: '-40px',
                    },
                    left: {
                        transition: 'transform ease',
                        border: '40px solid #66cc66',
                        clip: 'rect(0,80px,160px,0)',
                    },
                    right: {
                        border: '40px solid #66cc66',
                        clip: 'rect(0,160px,160px,80px)',
                    },
                    wth0: {
                        width: 0,
                    },
                },
            },
            num: {
                position: 'absolute',
                boxSizing: 'border-box',
                width: '85px',
                height: '85px',
                lineHeight: '85px',
                textAlign: 'center',
                fontSize: '18px',
                color: '#66cc66',
                left: '28px',
                top: '28px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                zIndex: 1,
            },
        },
    },
};
