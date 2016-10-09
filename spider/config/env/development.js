module.exports = {
	port: 3000,
	// mongodb: 'mongodb://localhost/spider',
	mongodb: 'mongodb://166.111.7.105:30017/bigsci',
	options: {
		db: { native_parser: true },
		server: { poolSize: 5 },
		replset: { rs_name: 'myReplicaSetName' },
		auth: 'MONGODB-CR',
		user: 'kegger_bigsci',
		pass: 'datiantian123!@#'
	},
	mysql:{
		host: '120.27.26.133',
		port: 3306,
		user: 'root',
		password: 'admin123',
		database: 'wechatData',
		connectionLimit: 50
	}
}