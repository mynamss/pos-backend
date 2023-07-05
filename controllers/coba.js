// async function sleep(time = 1) {
// 	const sleepMilliseconds = time * 1000

// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve(`Slept for: ${sleepMilliseconds}ms`)
// 		}, sleepMilliseconds)
// 	})
// }

// async function main() {
// 	// 1.
// 	console.time('main')

// 	// 2.
// 	const [firstCall, secondCall, thirdCall] = await Promise.all([
// 		sleep(2),
// 		sleep(2),
// 		sleep(3)
// 	])

// 	console.log(`First call: ${firstCall}`)
// 	console.log(`Second call: ${secondCall}`)
// 	console.log(`Third call: ${thirdCall}`)

// 	// 3.
// 	console.timeEnd('main')
// }

// ---------------------------
// Synchronous example
// ---------------------------

// async function main() {
// 	// 1.
// 	console.time('main')

// 	// 2.
// 	console.log(await sleep(1))
// 	console.log(await sleep(1))
// 	console.log(await sleep(0))

// 	// 3.
// 	console.timeEnd('main')
// }

// main()

function checkDataType(obj) {
  for (let prop in obj) {
    const value = obj[prop]; // "John"
    console.log("valuenya : ", value);
    if (typeof value === "object") {
      console.log(value + " itu object");
      checkDataType(value);
    } else if (value == null) {
      console.log("Nilai " + value);
    } else {
      console.log(prop + " is " + typeof value);
    }
  }
}

const person = {
  //   name: "John",
  //   age: 30,
  //   isMarried: false,
  hobbies
  //   address: {
  //     city: "New York",
  //     state: "NY",
  //     zipCode: "10001",
  //   },
};
checkDataType(person);
