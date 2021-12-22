import {getValue} from "../config/RedisConfig";

const checkCode = async (key, value) => {
    let code = ''

    await getValue(key).then((res) => {
        code = res
    })
    if (code !== null) {
        if (code.toLowerCase() === value.toLowerCase()) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }

}

export {
    checkCode
}
