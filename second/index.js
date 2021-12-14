const getUser = callback =>
    setTimeout(
        () => callback(null, { id: 1, name: 'João', birthDate: new Date() }),
        1000
    );

const getPhone = (userId, callback) =>
    setTimeout(
        () => callback(null, { phone: 12345, userId }),
        2000
    );

const getAddress = (userId, callback) =>
    setTimeout(
        () => callback(null, { street: 'test street', userId }),
        1500
    );

getUser((error, user) => {
    if(error) throw new Error(error);

    const { id } = user;

    console.log(user);

    getPhone(id, (errorPhone, contact) => {
        if(errorPhone) throw new Error(errorPhone);

        console.log(contact.phone);

        getAddress(id, (errorAddress, address) => {
            if(errorAddress) throw new Error(errorAddress);

            console.log(address.street);
        });
    })
});
