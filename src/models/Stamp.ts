class Stamp {
    private model: string;
    private values: {};

    constructor(model = '') {
        this.model = model
        this.values = {}
    }

    setValue (key='', value='') {
        this.values[key] = value
    }

    render (){
        let model = this.model.toString()
        for (const key in this.values){
            model.replace(key, this.values[key])
        }
        return model
    }
}

export default Stamp