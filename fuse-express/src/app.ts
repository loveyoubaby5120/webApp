import './style.scss';
console.log(process.env.NODE_ENV)
console.log(process.env.NODE_ENV2)

if (process.env.NODE_ENV === 'production') console.log('production!')
console.info(`client bundle is working :)`);
