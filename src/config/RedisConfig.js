import {createClient} from 'redis';

const options = {
    socket: {
        host: '127.0.0.1',
        port: '15001',
        detect_buffers: true,
        retry_strategy: function (options) {
            if (options.error && options.error.code === "ECONNREFUSED") {
                // End reconnecting on a specific error and flush all commands with
                // a individual error
                return new Error('The server refused the connection');
            }
            if (options.total_retry_time > 1000 * 60 * 60) {
                // End reconnecting after a specific timeout and flush all commands
                // with a individual error
                return new Error('Retry time exhausted');
            }
            if (options.attempt > 10) {
                //End reconnecting with built in error
                return undefined;
            }
            // reconnect after
            return Math.min(options.attempt * 100, 3000);
        }
    },
    password: '123456'

}


const setValue = async (key, value, time) => {

    if (typeof value === undefined || value === '' || value === null) {
        return
    }
    const client = createClient(options);
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.connect();

    if (typeof value === 'string') {
        if (typeof time === "number") {
            await client.set(key, value, {
                EX: time
            });
        } else {
            await client.set(key, value);
        }

        client.quit()
    } else if (typeof value === "object") {
        Object.keys(value).forEach((item) => {
            client.hSet(key, item, value[item])
        })
        client.quit()
    }

}


const getValue = async (key) => {
    const client = createClient(options);
    client.on('error', (err) => console.log('Redis Client Error', err));
    client.connect();
    const value = await client.get(key)
    client.quit()
    return value


}
export {
    getValue,
    setValue
}
