export default (...promisesArr) => {
    const promises = Array.isArray(promisesArr[0]) ? promisesArr[0] : promisesArr;
    let responses = Array(promises.length);

    return new Promise((res, rej) => {
        const promiseReady = index => data => {
            responses[index] = data;

            if (responses.filter(Boolean).length === promises.length)
                res(responses);
        }

        promises.forEach((promise, i) => promise()
            .then(promiseReady(i))
            .catch(promiseReady(i)))
    });
}