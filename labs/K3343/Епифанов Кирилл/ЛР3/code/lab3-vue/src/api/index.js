import AuthApi from "@/api/auth"
import ChatApi from "@/api/chat"
import instance from "@/api/instance"
import PropertiesApi from "@/api/properties"

const propertiesApi = new PropertiesApi(instance)
const chatApi = new ChatApi(instance)
const authApi = new AuthApi(instance)

export {
    authApi, chatApi, propertiesApi
}
