class Generation
{
    constructor(genNo, multiverseArray)
    {
        this.gen = genNo;
        this.multiverseArray = multiverseArray;
    }

    get genNo()
    {
        return this.gen;
    }

    get theMultiverseArray()
    {
        return this.multiverseArray;
    }

    setGen(no)
    {
        this.gen = no;
    }

    setMultiverse(multi)
    {
        this.multiverseArray = multi;
    }
}

module.exports.Generation = Generation;