class PropertiesApi {
    constructor(instance) {
        this.API = instance
    }

    getAll = async () => {
        return this.API({
            method: 'GET',
            url: '/properties'
        })
    }
}

export default PropertiesApi