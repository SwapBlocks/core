module.exports = {
    "@arkecosystem/core-event-emitter": {},
    "@arkecosystem/core-logger-winston": {
        transports: {
            console: {
                options: {
                    level: process.env.CORE_LOG_LEVEL || "debug",
                },
            },
            dailyRotate: {
                options: {
                    level: process.env.CORE_LOG_LEVEL || "debug",
                },
            },
        },
    },
    "@arkecosystem/core-database-postgres": {
        connection: {
            host: process.env.CORE_DB_HOST || "localhost",
            port: process.env.CORE_DB_PORT || 5432,
            database: process.env.CORE_DB_DATABASE || `${process.env.CORE_TOKEN}_unitnet`,
            user: process.env.CORE_DB_USERNAME || "sbx",
            password: process.env.CORE_DB_PASSWORD || "password",
        },
    },
    "@arkecosystem/core-transaction-pool": {
        enabled: !process.env.CORE_TRANSACTION_POOL_DISABLED,
        maxTransactionsPerSender: process.env.CORE_TRANSACTION_POOL_MAX_PER_SENDER || 300,
        allowedSenders: [],
        // 100+ years in the future to avoid our hardcoded transactions used in the
        // tests to expire immediately
        maxTransactionAge: 4036608000,
        dynamicFees: {
            minFeePool: 1000,
            minFeeBroadcast: 1000,
        },
    },
    "@arkecosystem/core-p2p": {
        host: process.env.CORE_P2P_HOST || "0.0.0.0",
        port: process.env.CORE_P2P_PORT || 4000,
        minimumVersion: ">=2.0.0",
        minimumNetworkReach: 5,
        coldStart: 5,
    },
    "@arkecosystem/core-blockchain": {
        fastRebuild: false,
    },
    "@arkecosystem/core-api": {
        enabled: !process.env.CORE_API_DISABLED,
        host: process.env.CORE_API_HOST || "0.0.0.0",
        port: process.env.CORE_API_PORT || 4003,
        whitelist: ["*"],
    },
    "@arkecosystem/core-webhooks": {
        enabled: process.env.CORE_WEBHOOKS_ENABLED,
        server: {
            enabled: process.env.CORE_WEBHOOKS_API_ENABLED,
            host: process.env.CORE_WEBHOOKS_HOST || "0.0.0.0",
            port: process.env.CORE_WEBHOOKS_PORT || 4004,
            whitelist: ["127.0.0.1", "::ffff:127.0.0.1"],
        },
    },
    "@arkecosystem/core-graphql": {
        enabled: process.env.CORE_GRAPHQL_ENABLED,
        host: process.env.CORE_GRAPHQL_HOST || "0.0.0.0",
        port: process.env.CORE_GRAPHQL_PORT || 4005,
    },
    "@arkecosystem/core-forger": {
        hosts: [`http://127.0.0.1:${process.env.CORE_P2P_PORT || 4000}`],
    },
    "@arkecosystem/core-json-rpc": {
        enabled: process.env.CORE_JSON_RPC_ENABLED,
        host: process.env.CORE_JSON_RPC_HOST || "0.0.0.0",
        port: process.env.CORE_JSON_RPC_PORT || 8080,
        allowRemote: false,
        whitelist: ["127.0.0.1", "::ffff:127.0.0.1"],
    },
};
