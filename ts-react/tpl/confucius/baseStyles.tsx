export const BaseStyles: { [key: string]: React.CSSProperties } = {
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '40px',
        marginTop: '30px',
        marginBottom: '15px',
    },
    content: {
        color: '#666666',
        position: 'relative',
    },
    item: {
        borderTop: '1px solid #e4e4e4',
        paddingBottom: '30px',
    },
    recommendedInstitutes: {
        first: {
            logo: {
                top: '120px',
            },
        },
        item: {
            logo: {
                position: 'absolute',
                top: '80px',
                left: '0',
                width: '100%',
                img: {
                    width: '80px',
                    background: '#fff',
                    borderRadius: '50%',
                    marginLeft: '20px',
                },
                textContent: {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '80px',
                    p: {
                        lineHeight: '40px',
                        paddingLeft: '110px',
                        fontSize: '14px',
                        color: '#666666',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    },
                },
            },
            description: {
                marginTop: '40px',
                marginBottom: '15px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'pre-line',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
            },
            btn: {
                position: 'absolute',
                right: '22px',
                top: '8px',
            },
        },

    },
};
