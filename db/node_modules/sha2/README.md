# A _Node.js_ module for SHA-2

 This Javascript module implements [the **SHA-2 (Secure Hash Algorithm 2)** cryptographic hash function family](https://en.wikipedia.org/wiki/SHA-2) designed by _the United States National Security Agency (NSA)_ ― **SHA-224**, **SHA-256**, **SHA-384**, **SHA-512**, and **SHA-512/t** (including **SHA-512/224** and **SHA-512/256**).
It makes use of [the `crypto` standard built-in module](https://github.com/nodejs/node/blob/master/lib/crypto.js) if the module is available, otherwise, an alternative Javascript implementation for SHA-2 that I developed is used.


## Installation ⤓

```
npm install sha2
```

 Note that this module works with [`Buffer`](https://nodejs.org/api/buffer.html)s. As for web browsers that don't have [`Buffer`](https://nodejs.org/api/buffer.html)s, you may use [_**SHA2.js** for web browsers_](https://github.com/wlzla000/SHA2.js) instead.


## Usage

### Importing

 Import the module with

```javascript
const SHA2 = require("sha2");
```

or if you want to take its methods only,

```javascript
const {SHA256, SHA384} = require("sha2");
```

### Method aliases

 Choose your preferred naming convention!

```javascript
const SHA2 = require("sha2");

const input = "Was touwaka ga knawa murfanare yor.";

// SHA-224
console.log(SHA2["SHA-224"](input));
console.log(SHA2.SHA_224(input));
console.log(SHA2.SHA224(input));
console.log(SHA2["sha-224"](input));
console.log(SHA2.sha_224(input));
console.log(SHA2.sha224(input));
// All of them give `<Buffer 0a 88 43 df 34 dd a2 45 be 30
// b6 36 65 8b d2 a1 08 7d 17 23 6e fd d8 8e cb 70 c0 08>`.

// SHA-512/80
console.log(SHA2["SHA-512/t"](80, input));
console.log(SHA2.SHA_512_t(80, input));
console.log(SHA2.SHA512_t(80, input));
console.log(SHA2.SHA_512t(80, input));
console.log(SHA2.SHA512t(80, input));
console.log(SHA2["sha-512/t"](80, input));
console.log(SHA2.sha_512_t(80, input));
console.log(SHA2.sha512_t(80, input));
console.log(SHA2.sha_512t(80, input));
console.log(SHA2.sha512t(80, input));
// All of them give `<Buffer de 24 91 60 e0 1c a5 a0 01 ef>`.
```

### Available input types

 They basically take a [`Buffer`](https://nodejs.org/api/buffer.html). Everything other than a [`Buffer`](https://nodejs.org/api/buffer.html) as their input turns into a [`Buffer`](https://nodejs.org/api/buffer.html) with `Buffer.from()` internally. Reading these would help you understand it:

- [`Buffer.from(string[, encoding])`](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_string_encoding)
- [`Buffer.from(arrayBuffer[, byteOffset[, length]])`](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length)
- [`Buffer.from(array)`](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_array)
- [`Buffer.from(object[, offsetOrEncoding[, length]])`](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_object_offsetorencoding_length)

```javascript
// SHA-384
const {SHA384} = require("sha2");

// Input: "Green chá" in UTF-8.
console.log(SHA384("Green chá"));
console.log(SHA384("Green chá", "utf8"));
console.log(SHA384("477265656e206368c3A1", "hex"));
console.log(SHA384("R3JlZW4gY2jDoQ==", "base64"));
console.log(SHA384([
	0x47, 0x72, 0x65, 0x65, 0x6E, 0x20, 0x63, 0x68, 0xC3, 0xA1
]));
// All of them give `<Buffer 63 f2 63 3f f2 bc 1e 24 77 76
// 12 9b 76 97 66 0a 70 13 34 7f 8b ad e2 e5 c1 2c 5a e8 e0
// 53 13 e5 9e 7b 74 84 68 c9 ba ab 37 8f 79 5b 03 42 85 c2>`.

// Input: 0xC0FFEE.
console.log(SHA384(Buffer.from([0xC0, 0xFF, 0xEE])));
console.log(SHA384((new Uint8Array([0xC0, 0xFF, 0xEE])).buffer));
console.log(SHA384(
	(new Uint8Array([0xC0, 0x01, 0xC0, 0xFF, 0xEE])).buffer,
	2
));
console.log(SHA384("C0ffee", "hex"));
console.log(SHA384("wP/u", "base64"));
console.log(SHA384([0xC0, 0xFF, 0xEE]));
// All of them give `<Buffer 01 1f 36 0d b6 36 cf a4 c7 a6
// 17 68 ad 91 7f e3 d9 5a 6b d8 8a 79 68 ce 43 7b 00 b6 3a
// 32 b0 da 91 13 29 48 8b 85 71 22 4e 42 45 25 0b 62 ba 86>`.
```

### Working with the outputs

 They return a `Buffer`, so you can do what you can do with a `Buffer`.

```javascript
// SHA-256
const {SHA256} = require("sha2");

const nyanbuffer = SHA256(`
░░░░░░░▄▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄░░░░░░
░░░░░░█░░▄▀▀▀▀▀▀▀▀▀▀▀▀▀▄░░█░░░░░
░░░░░░█░█░▀░░░░░▀░░▀░░░░█░█░░░░░
░░░░░░█░█░░░░░░░░▄▀▀▄░▀░█░█▄▀▀▄░
█▀▀█▄░█░█░░▀░░░░░█░░░▀▄▄█▄▀░░░█░
▀▄▄░▀██░█▄░▀░░░▄▄▀░░░░░░░░░░░░▀▄
░░▀█▄▄█░█░░░░▄░░█░░░▄█░░░▄░▄█░░█
░░░░░▀█░▀▄▀░░░░░█░██░▄░░▄░░▄░███
░░░░░▄█▄░░▀▀▀▀▀▀▀▀▄░░▀▀▀▀▀▀▀░▄▀░
░░░░█░░▄█▀█▀▀█▀▀▀▀▀▀█▀▀█▀█▀▀█░░░
░░░░▀▀▀▀░░▀▀▀░░░░░░░░▀▀▀░░▀▀░░░░
`);
// <Buffer 91 7a f1 59 e6 a8 7a 2b 3d 3c d1 6c d5 f1 a7
// 89 b7 ec 90 07 75 ad d0 52 16 73 05 d3 97 e9 85 f2>

console.log(nyanbuffer.toString("hex"));
// "917af159e6a87a2b3d3cd16cd5f1a789b7ec900775add052167305d397e985f2"

console.log(nyanbuffer.toString("base64"));
// "kXrxWeaoeis9PNFs1fGnibfskAd1rdBSFnMF05fphfI="

console.log(Array.from(nyanbuffer));
// [145, 122, 241, 89, 230, 168, 122, 43, 61, 60, 209,
// 108, 213, 241, 167, 137, 183, 236, 144, 7, 117, 173,
// 208, 82, 22, 115, 5, 211, 151, 233, 133, 242]

console.log(nyanbuffer.equals(nyanbuffer));
// true
```


## Methods ⚙️

- For **SHA-224**
  - `SHA2["SHA-224"](......)`
  - `SHA2.SHA_224(......)`
  - `SHA2.SHA224(......)`
  - `SHA2["sha-224"](......)`
  - `SHA2.sha_224(......)`
  - `SHA2.sha224(......)`
- For **SHA-256**
  - `SHA2["SHA-256"](......)`
  - And so on.
- For **SHA-384**
  - `SHA2["SHA-384"](......)`
  - And so on.
- For **SHA-512**
  - `SHA2["SHA-512"](......)`
  - And so on.
- For **SHA-512/t** <sub>(_t_ must satisfy 1 ≤ _t_ ≤ 511 and _t_ ≠ 384. And only _t_ that is a multiple of 8 is supported.)</sub>
  - `SHA2["SHA-512/t"](t, ......)`
  - `SHA2.SHA_512_t(t, ......)`
  - `SHA2.SHA512_t(t, ......)`
  - `SHA2.SHA_512t(t, ......)`
  - `SHA2.SHA512t(t, ......)`
  - `SHA2["sha-512/t"](t, ......)`
  - `SHA2.sha_512_t(t, ......)`
  - `SHA2.sha512_t(t, ......)`
  - `SHA2.sha_512t(t, ......)`
  - `SHA2.sha512t(t, ......)`
- For **SHA-512/224**
  - `SHA2["SHA-512/224"](......)`
  - And so on.
  - You may also use the method for the SHA-512/t.
- For **SHA-512/256**
  - `SHA2["SHA-512/256"](......)`
  - And so on.
  - You may also use the method for the SHA-512/t.


## Warning ⚠️

### Hashing passwords

 Making a hash of a password with one of the algorithms of the SHA-2 family and keeping it, is **not recommended**.
For that purpose, use slow hash functions which are slow by design such as [PBKDF2](http://en.wikipedia.org/wiki/PBKDF2), [bcrypt](https://en.wikipedia.org/wiki/bcrypt), and [scrypt](http://www.tarsnap.com/scrypt.html), instead.

- [How to securely hash passwords? <sub>(_Information security Stack Exchange_)</sub>](https://security.stackexchange.com/a/31846/135187)
- [Salted Password Hashing - Doing it Right <sub>(_CrackStation_)</sub>](https://crackstation.net/hashing-security.htm)
- [How To Safely Store A Password <sub>(_Coda Hale_)</sub>](https://codahale.com/how-to-safely-store-a-password/)

### Hashing huge data

 [This module is not appropriate for hashing huge binary data](https://stackoverflow.com/questions/8974375/whats-the-maximum-size-of-a-node-js-buffer), such as that of a 1 GB file.


## Specification reference 📖

### [Request for Comments #6234<sup>(RFC 6234)</sup> <sub>‘US Secure Hash Algorithms (SHA and SHA-based HMAC and HKDF)’</sub>](https://tools.ietf.org/html/rfc6234)

- **§1**: Overview of Contents.
- **§2**: Notation for Bit Strings and Integers.
- **§3**: Operations on Words.
- **§4**: Message Padding and Parsing.
- **§5**: Functions and Constants Used.
- **§6**: Computing the Message Digest.

written by _Donald E. Eastlake 3rd_, and _Tony Hansen_ in May 2011.

### [Federal Information Processing Standards Publication 180-4<sup>(FIPS PUB 180-4)</sup> <sub>‘Secure Hash Standard (SHS)’</sub>](http://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf)

- **§5.3.6**: SHA-512/t.

published by _National Institute of Standards and Technology (NIST)_ in August 2015.


## License 📜

 This Javascript module has been licensed under **the MIT license**:

```javascript
// 80
////////////////////////////////////////////////////////////////////////////////

/*
        SHA2.js
        (A Javascript implementation of
        the United States of America (USA)
        Federal Information Processing Standard (FIPS)
        Secure Hash Algorithm 2 (SHA-2))

                developed
                        by K. (https://github.com/wlzla000)
                        on January 16-22 and 26, 2018,

                licensed under


                the MIT license

                Copyright (c) 2018 K.

                 Permission is hereby granted, free of charge, to any person
                obtaining a copy of this software and associated documentation
                files (the "Software"), to deal in the Software without
                restriction, including without limitation the rights to use,
                copy, modify, merge, publish, distribute, sublicense, and/or
                sell copies of the Software, and to permit persons to whom the
                Software is furnished to do so, subject to the following
                conditions:

                 The above copyright notice and this permission notice shall be
                included in all copies or substantial portions of the Software.

                 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                OTHER DEALINGS IN THE SOFTWARE.
*/

////////////////////////////////////////////////////////////////////////////////

/*
        SHA2-Node.js
        (A Node.js module implementation of
        the United States of America (USA)
        Federal Information Processing Standard (FIPS)
        Secure Hash Algorithm 2 (SHA-2))

                developed
                        by K. (https://github.com/wlzla000)
                        on January 23-26, 2018,

                licensed under


                the MIT license

                Copyright (c) 2018 K.

                 Permission is hereby granted, free of charge, to any person
                obtaining a copy of this software and associated documentation
                files (the "Software"), to deal in the Software without
                restriction, including without limitation the rights to use,
                copy, modify, merge, publish, distribute, sublicense, and/or
                sell copies of the Software, and to permit persons to whom the
                Software is furnished to do so, subject to the following
                conditions:

                 The above copyright notice and this permission notice shall be
                included in all copies or substantial portions of the Software.

                 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                OTHER DEALINGS IN THE SOFTWARE.
*/
```

, and its dependency [`crypto` also has **the MIT license**](https://github.com/nodejs/node/blob/master/lib/crypto.js#L1-L21).


## Special thanks

 Thank you for providing [a great piece of music for programming](https://www.youtube.com/watch?v=jJHe4i90Ua0),
[_Nick Kaelar_](https://www.youtube.com/user/varienofficial) and [_Team Salvato_](https://www.youtube.com/channel/UC41-En1dwTQ6SRtDH0oY8bw)!
