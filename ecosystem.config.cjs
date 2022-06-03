module.exports = {
	apps: [
		{
			name: "jace-bot",
			script: "./index.js",
			instances: 1,
			exec_mode: "fork",
			stop_exit_codes: [0],
			exp_backoff_restart_delay: 100,
			env_production: {
				NODE_ENV: "production",
			},
			env_development: {
				NODE_ENV: "development",
			},
		},
	],
};
