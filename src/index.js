export default (...promisesArr) => {
    const promises = Array.isArray(promisesArr[0]) ? promisesArr[0] : promisesArr;
    
    let responses = Array(promises.length);
    let promiseReadyCount = 0;
    return new Promise((res, rej) => {
        const promiseReady = index => response => {
            responses[index] = response;
            promiseReadyCount = promiseReadyCount + 1;

            if (promiseReadyCount === promises.length)
                res(responses);
        }

        promises.forEach((promise, i) => (typeof promise === 'function' ? promise() : promise)
            .then(promiseReady(i))
            .catch(promiseReady(i)))
    });
}