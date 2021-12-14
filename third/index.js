const WITHOUT_ID = 'Without id';

const getUser = () =>
    new Promise(
        resolve =>
            setTimeout(
                () => resolve({ id: 1, name: 'João', birthDate: new Date() }),
                1000
            )
    );

const getPhone = userId =>
    new Promise(
        (resolve, reject) =>
            setTimeout(
                () => {
                    if(!userId) reject(WITHOUT_ID);

                    resolve({ phone: 12345, userId })
                },
                2000
            )
    );

const getAddress = userId =>
    new Promise(
        (resolve, reject) =>
            setTimeout(
                () => {
                    if(!userId) reject(WITHOUT_ID);

                    resolve({ street: 'test street', userId })
                },
                1500
            )
    );

const main = async () => {
    try {
        const user = await getUser();
        const userId = user.id;
        const results = await Promise.all([getPhone(userId), getAddress(userId)]);
        const contact = results[0];
        const address = results[1];

        console.log(user, contact, address);
    } catch(error){
        throw new Error(error);
    }
};

main();
