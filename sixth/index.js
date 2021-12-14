const { get } = require('./service');
const FOR_TIME = 'for-time';
const FOR_IN_TIME = 'for-in-time';
const FOR_OF_TIME = 'for-of-time';
const MAP_TIME = 'map-time';
const FOR_EACH_TIME = 'for-each-time';
const RANDOM_TIME = 'random-time';
const FILTER_TIME = 'filter-time';
const REDUCE_TIME = 'reduce-time';

Array.prototype.random = function(callback){
    const list = [];

    for(const index in this){
        const item = this[index];

        list.push({
            index,
            property: callback(item, index)
        })
    }

    return list;
}

const main = async () => {
    try{
        const list = await get(1);
        let titles = [];

        // console.time(FOR_TIME);
        // for(let index = 0; index < list.length; index++) titles.push(list[index].title);
        // console.timeEnd(FOR_TIME);

        // console.time(FOR_IN_TIME);
        // for(const index in list) titles.push(list[index].title);
        // console.timeEnd(FOR_IN_TIME);

        // console.time(FOR_OF_TIME);
        // for(const item of list) titles.push(item.title);
        // console.timeEnd(FOR_OF_TIME);

        // console.time(MAP_TIME);
        // list.map(item => titles.push(item.title));
        // console.timeEnd(MAP_TIME);

        // console.time(FOR_EACH_TIME);
        // list.forEach(item => titles.push(item.title));
        // console.timeEnd(FOR_EACH_TIME);

        // console.time(RANDOM_TIME);
        // list.random((item, index) => item.userId * index);
        // console.timeEnd(RANDOM_TIME);

        // console.time(FILTER_TIME);
        // titles = list.filter(item => item.title.includes('provident'));
        // console.timeEnd(FILTER_TIME);

        console.time(REDUCE_TIME);
        titles = list.reduce((accumulator, current) => accumulator += ` | ${current.title}`, '');
        console.timeEnd(REDUCE_TIME);

        // console.log(titles);
    } catch(error){
        console.log(error);
    }
};

main();
