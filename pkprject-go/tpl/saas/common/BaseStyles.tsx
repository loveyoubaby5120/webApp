export const BaseStyles = {
  confirm: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: '999',
    box: {
      width: '400px',
      maxHeight: '300px',
      position: 'absolute',
      left: '-200px',
      margin: '20% 50% 0',
      padding: '20px 20px 20px',
      borderRadius: '5px',
    },
    title: {
      margin: '0 0 10px',
      fontSize: '16px',
      fontWeight: 400,
    },
    opStyle: {
      fontSize: '12px',
      marginRight: '15px',
    },
  },
  content: {
    backgroundColor: '#fff',
    border: '1px solid rgb(228, 228, 228)',
    padding: '20px 20px 30px',
    margin: '10px 0',
    overflow: 'hidden',
    width: '100%',
  },
};
