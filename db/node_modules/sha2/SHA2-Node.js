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

"use strict";

class SHA2
{
	//  SHA-2 (Secure Hash Algorithm 2) is a set of cryptographic hash
	// functions designed by the United States National Security Agency
	// (NSA). SHA-2 includes significant changes from its predecessor,
	// SHA-1. The SHA-2 family consists of six hash functions with digests
	// (hash values) that are 224, 256, 384 or 512 bits: SHA-224, SHA-256,
	// SHA-384, SHA-512, SHA-512/224, SHA-512/256.

	// Specification reference:
	/*
		https://tools.ietf.org/html/rfc6234

		[Request for Comments #6234 (RFC 6234)]

		US Secure Hash Algorithms (SHA and SHA-based HMAC and HKDF)

		§1	Overview of Contents
		§2	Notation for Bit Strings and Integers
		§3	Operations on Words
		§4	Message Padding and Parsing
		§5	Functions and Constants Used
		§6	Computing the Message Digest

		written by
			Donald E. Eastlake 3rd,
			Tony Hansen
		in
			May 2011.
	*/
	/*
		http://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf

		[Federal Information Processing Standards Publication 180-4
		(FIPS PUB 180-4)]

		Secure Hash Standard (SHS)

		§5.3.6	SHA-512/t

		published by
			National Institute of Standards and Technology (NIST)
		in
			August 2015.
	*/

	////////////////////////////////////////////////////////////////////////
	// 1.  Overview of Contents
	//
	// 	 When a message of any length < 2^64 bits (for SHA-224 and
	// 	SHA-256) or < 2^128 bits (for SHA-384 and SHA-512) is input to
	// 	one of these algorithms, the result is an output called a
	// 	message digest. The message digests range in length from 224 to
	// 	512 bits, depending on the algorithm.

	////////////////////////////////////////////////////////////////////////
	// 2.  Notation for Bit Strings and Integers
	//
	// 	 Throughout this document, the "big-endian" convention is used
	// 	when expressing both 32-bit and 64-bit words, so that within
	// 	each word the most significant bit is shown in the leftmost bit
	// 	position.
	//
	// 	 If Z is an integer, 0 <= z < 2^64, then z = (2^32)x + y where
	// 	0 <= x < 2^32 and 0 <= y < 2^32. Since x and y can be
	// 	represented as words X and Y, respectively, z can be represented
	// 	as the pair of words (X, Y).
	/// A 64-bit word is implemented with an `Uint32Array(2)` in this code.

	////////////////////////////////////////////////////////////////////////
	// 3.  Operations on Words
	//
	// 	 The following logical operators will be applied to words in all
	// 	four hash operations specified herein. SHA-224 and SHA-256
	// 	operate on 32-bit words while SHA-384 and SHA-512 operate on
	// 	64-bit words.
	//
	// 	 In the operations below, x<<n is obtained as follows: discard
	// 	the leftmost n bits of x and then pad the result with n zeroed
	// 	bits on the right (the result will still be the same number of
	// 	bits). Similarly, x>>n is obtained as follows: discard the
	// 	rightmost n bits of x and then prepend the result with n zeroed
	// 	bits on the left (the result will still be the same number of
	// 	bits).

	// 	a.  Bitwise logical word operations
	//
	// 		X AND Y = bitwise logical "and" of X and Y.
	// 		X OR Y = bitwise logical "inclusive-or" of X and Y.
	// 		X XOR Y = bitwise logical "exclusive-or" of X and Y.
	// 		NOT X = bitwise logical "complement" of X.
	//
	// 		Example:
	// 			01101100101110011101001001111011
	// 		XOR	01100101110000010110100110110111
	// 			--------------------------------
	// 		=	00001001011110001011101111001100

	// 	b.  The operation X + Y is defined as follows: words X and Y
	// 	   represent w-bit integers x and y, where 0 <= x < 2^w and
	// 	   0 <= y < 2^w. For positive integers n and m, let
	//
	// 		n mod m
	//
	// 	   be the remainder upon dividing n by m. Compute
	//
	// 		z = (x + y) mod 2^w.
	//
	// 	   Then 0 <= z < 2^w. Convert z to a word, Z, and define
	// 	   Z = X + Y.
	static add_modulo_32(/* ...... */) // => Number
	{
		/// Addition modulo (2 ** 32) (modular addition)
		return Array
			.from(arguments)
			.reduce((accumulator, value) => (accumulator + value))
			| 0; /// Bitwise operators in Javascript treat
			/// their operands as a sequence of 32 bits.
	}
	static add_modulo_64(/* ...... */) // => Uint32Array(2)
	{
		/// Addition modulo (2 ** 64) (modular addition)
		const sums = Array
			.from(arguments)
			.reduce((accumulator, [high, low]) => {
				accumulator[0] += high;
				accumulator[1] += low;
				// Overflowed bits are ignored.
				return accumulator;
			}, [0, 0]);
		const [high_sum, low_sum] = sums;
		const result = new Uint32Array(2);
		/// Shift `low_sum` right by 32 bits.
		/// Bitwise operators in Javascript treat
		/// their operands as a sequence of 32 bits.
		const carry = (low_sum / 4294967296) | 0;
		result[0] = high_sum + carry; /// Overflowed bits are ignored.
		result[1] = low_sum | 0;
		return result;
	}

	// 	c.  The right shift operation SHR^n(x), where x is a w-bit word
	// 	   and n is an integer with 0 <= n < w, is defined by
	//
	// 		SHR^n(x) = x>>n
	static shr_64(
		[
			xh /*: Number */, // The highest 32 bits of x.
			xl /*: Number */ // The lowest 32 bits of x.
		],
		n /*: Number*/ // A value in a range [0, 63].
	) // => Uint32Array(2)
	{
		const result = new Uint32Array(2);
		if(n & 0b00100000) // n >= 32
		{
			result[1] = xh >>> n;
			///  A bitwise operation in Javascript takes only the
			/// lowest five bits of the value for its right operand.
			/// So (xh >>> n) is equivalent to (xh >>> (n - 32)).
		}
		else
		{
			result[0] = xh >>> n;
			result[1] = (xh << (32 - n)) | (xl >>> n);
		}
		return result;
	}

	// 	d.  The rotate right (circular right shift) operation ROTR^n(x),
	// 	   where x is a w-bit word and n is an integer with 0 <= n < w,
	// 	   is defined by
	//
	// 		ROTR^n(x) = (x>>n) OR (x<<(w-n))
	static rotr_32(
		x /*: Number */,
		n /*: Number*/ // A value in a range [0, 32].
	) // => Number
	{
		return (x >>> n) | (x << (32 - n));
	}
	static rotr_64(
		[
			xh /*: Number */, // The highest 32 bits of x.
			xl /*: Number */ // The lowest 32 bits of x.
		],
		n /*: Number*/ // A value in a range [0, 63].
	) // => Uint32Array(2)
	{
		const result = new Uint32Array(2);
		if(n & 0b00100000) // n >= 32
		{
			n ^= 0b00100000;
			const ih = xl, il = xh;
			result[0] = (ih >>> n) | (il << (32 - n));
			result[1] = (il >>> n) | (ih << (32 - n));
		}
		else
		{
			result[0] = (xh >>> n) | (xl << (32 - n));
			result[1] = (xl >>> n) | (xh << (32 - n));
		}
		return result;
	}

	// 	e.  The rotate left (circular left shift) operation ROTL^n(x),
	// 	   where x is a w-bit word and n is an integer with 0 <= n < w,
	// 	   is defined by
	//
	// 		ROTL^n(x) = (x<<n) OR (x>>(w-n))
	static rotl_32(
		x /*: Number */,
		n /*: Number*/ // A value in a range [0, 32].
	) // => Number
	{
		return (x << n) | (x >>> (32 - n));
	}
	static rotl_64(
		[
			xh /*: Number */, // The highest 32 bits of x.
			xl /*: Number */ // The lowest 32 bits of x.
		],
		n /*: Number*/ // A value in a range [0, 63].
	) // => Uint32Array(2)
	{
		const result = new Uint32Array(2);
		if(n & 0b00100000) // n >= 32
		{
			n ^= 0b00100000;
			const ih = xl, il = xh;
			result[0] = (ih << n) | (il >>> (32 - n));
			result[1] = (il << n) | (ih >>> (32 - n));
		}
		else
		{
			result[0] = (xh << n) | (xl >>> (32 - n));
			result[1] = (xl << n) | (xh >>> (32 - n));
		}
		return result;
	}

	// 	   Note the following equivalence relationships, where w is
	// 	   fixed in each relationship:
	//
	// 		ROTL^n(x) = ROTR^(w-n)(x)
	// 		ROTR^n(x) = ROTL^(w-n)(x)
	//

	////////////////////////////////////////////////////////////////////////
	// 4.  Message Padding and Parsing
	//
	// 	 The hash functions specified herein are used to compute a
	// 	message digest for a message or data file that is provided as
	// 	input. The message or data file should be considered to be a bit
	// 	string. The length of the message is the number of bits in the
	// 	message (the empty message has length 0). If the number of bits
	// 	in a message is a multiple of 8, for compactness we can
	// 	represent the message in hex. The purpose of message padding is
	// 	to make the total length of a padded message a multiple of 512
	// 	for SHA-224 and SHA-256 or a multiple of 1024 for SHA-384 and
	// 	SHA-512.
	//
	// 	 The following specifies how this padding shall be performed. As
	// 	a summary, a "1" followed by m "0"s followed by a 64-bit or
	// 	128-bit integer are appended to the end of the message to
	// 	produce a padded message of length 512*n or 1024*n. The appended
	// 	integer is the length of the original message. The padded
	// 	message is then processed by the hash function as n 512-bit or
	// 	1024-bit blocks.
	//
	static pad_512(view_message /*: Uint8Array */) // => ArrayBuffer
	{
		// 4.1.  SHA-224 and SHA-256
		//
		// 	 Suppose a message has length L < 2^64. Before it is
		// 	input to the hash function, the message is padded on the
		// 	right as follows:
		//
		// 	 a. "1" is appended. Example: if the original message is
		// 	"01010000", this is padded to "010100001".
		//
		// 	 b. K "0"s are appended where K is the smallest,
		// 	non-negative solution to the equation
		//
		// 		(L + 1 + K) mod 512 = 448
		//
		/// Let
		/// 	K be the number of the padding zero bits,
		/// 	P be the number of the padding bits,
		/// 		P＝1＋K,
		/// 	L_octet be the size, in octets, of the message,
		/// 		L_octet＝L÷8,
		/// 	P_octet be the size, in octets, of the padding,
		/// 		P_octet＝P÷8.
		/// L＋1＋K≡448 (mod 512)
		/// L＋P≡448 (mod 512)
		/// 	(∵ P＝1＋K)
		/// L＋P＋64≡448＋64 (mod 512)
		/// 	(∵ Compatibility with translation,
		/// 	of congruence relation in modular arithmetic.)
		/// L＋P＋64≡512 (mod 512)
		/// L＋P＋64≡512≡0 (mod 512)
		/// L＋P＋64≡0 (mod 512)
		/// 	(∵ Transitivity
		/// 	of congruence relation in modular arithmetic)
		/// {(L＋P＋64)－0}÷512∈ℤ
		/// 	(∵ a≡b (mod m) ⇔ (a－b)÷m∈ℤ)
		/// (L＋P＋64)÷512∈ℤ
		/// {(L＋P＋64)÷8}÷(512÷8)∈ℤ
		/// (L_octet＋P_octet＋8)÷64∈ℤ
		/// 	(∵ L_octet＝L÷8, P_octet＝P÷8.)
		/// {(L_octet＋P_octet＋8)－0}÷64∈ℤ
		/// L_octet＋P_octet＋8≡0 (mod 64)
		/// 	(∵ a≡b (mod m) ⇔ (a－b)÷m∈ℤ)
		/// ∴ P_octet＝64－{(L_octet＋8) mod 64}
		/// 	(∵ K is the smallest solution, K ≥ 0,
		/// 	P＝1＋K, P_octet＝P÷8.)
		const n_message_octets = view_message.length;
		const n_padding_octets = 64
			- ((n_message_octets + 8) & 0b00111111);

		// 	 c. Then append the 64-bit block that is L in binary
		// 	representation. After appending this block, the length
		// 	of the message will be a multiple of 512 bits.
		//
		///  Safely shifting 53-bit integer without 64-bit shift support
		/// ------------------------------------------------------------
		///  In Javascript, `Number.MAX_SAFE_INTEGER` is
		/// `((2 ** 53) - 1)`. And bitwise operators in Javascript treat
		/// their operands as a sequence of 32 bits. i.e. They do not
		/// work with 53-bit values.
		///
		///  From 53-bit value
		/// 	00000000 000????? ???????? ????????
		/// 	???????? ???????? ???????? ????????
		/// , divide the 53-bit value by (2 ** 29) and take the quotient
		/// into 32-bit value A, the remainder into 32-bit value B:
		/// 	000AAAAA AAAAAAAA AAAAAAAA AAAAAAAA
		/// 	AAABBBBB BBBBBBBB BBBBBBBB BBBBBBBB
		/// , and shift B left by 3 bits:
		/// 	AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA
		/// 	BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000
		/// ; then the 53-bit value is safely shifted left by 3 bits
		/// with its half being on A, another half being on B.
		/// 	00000000 ???????? ???????? ????????
		/// 	???????? ???????? ???????? ?????000
		/// .
		const divmod = (dividend, divisor) => [
			Math.floor(dividend / divisor),
			dividend % divisor
		];
		const [n_message_bits_more_sig, n_message_bits_less_sig] =
			divmod(n_message_octets, 536870912 /* (2 ** 29) */)
			.map((x, i) => (i ? (x << 3) : x));

		const n_length_block_octets = 8;
		const n_result_octets = n_message_octets
			+ n_padding_octets + n_length_block_octets;
		const result = new ArrayBuffer(n_result_octets);
		const octet_view_result = new Uint8Array(result);
		const view_result = new DataView(result);
		octet_view_result.set(view_message);
		view_result.setUint8(n_message_octets, 0b10000000);
		view_result.setUint32( // Big-endian
			n_message_octets + n_padding_octets,
			n_message_bits_more_sig
		);
		view_result.setUint32( // Big-endian
			n_message_octets + n_padding_octets + 4,
			n_message_bits_less_sig
		);

		// 	 Example: Suppose the original message is the bit string
		//
		// 		01100001 01100010 01100011 01100100 01100101
		//
		// 	After step (a) this gives
		//
		// 		01100001 01100010 01100011 01100100 01100101 1
		//
		// 	Since L = 40, the number of bits in the above is 41 and
		// 	K = 407 "0"s are appended, making the total now 448.
		// 	This gives the following in hex:
		//
		// 		61626364 65800000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000
		//
		// 	The 64-bit representation of L = 40 is hex 00000000
		// 	00000028. Hence the final padded message is the
		// 	following hex:
		//
		// 		61626364 65800000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000028

		return result;
	}
	static pad_1024(view_message /*: Uint8Array */) // => ArrayBuffer
	{
		// 4.2.  SHA-384 and SHA-512
		//
		// 	 Suppose a message has length L < 2^128. Before it is
		// 	input to the hash function, the message is padded on the
		// 	right as follows:
		//
		// 	 a. "1" is appended. Example: if the original message is
		// 	"01010000", this is padded to "010100001".
		//
		// 	 b. K "0"s are appended where K is the smallest,
		// 	non-negative solution to the equation
		//
		// 		(L + 1 + K) mod 1024 = 896
		//
		/// Let
		/// 	K be the number of the padding zero bits,
		/// 	P be the number of the padding bits,
		/// 		P＝1＋K,
		/// 	L_octet be the size, in octets, of the message,
		/// 		L_octet＝L÷8,
		/// 	P_octet be the size, in octets, of the padding,
		/// 		P_octet＝P÷8.
		/// L＋1＋K≡896 (mod 1024)
		/// L＋P≡896 (mod 1024)
		/// 	(∵ P＝1＋K)
		/// L＋P＋128≡896＋128 (mod 1024)
		/// 	(∵ Compatibility with translation,
		/// 	of congruence relation in modular arithmetic.)
		/// L＋P＋128≡1024 (mod 1024)
		/// L＋P＋128≡1024≡0 (mod 1024)
		/// L＋P＋128≡0 (mod 1024)
		/// 	(∵ Transitivity
		/// 	of congruence relation in modular arithmetic)
		/// {(L＋P＋128)－0}÷1024∈ℤ
		/// 	(∵ a≡b (mod m) ⇔ (a－b)÷m∈ℤ)
		/// (L＋P＋128)÷1024∈ℤ
		/// {(L＋P＋128)÷8}÷(1024÷8)∈ℤ
		/// (L_octet＋P_octet＋16)÷128∈ℤ
		/// 	(∵ L_octet＝L÷8, P_octet＝P÷8.)
		/// {(L_octet＋P_octet＋16)－0}÷128∈ℤ
		/// L_octet＋P_octet＋16≡0 (mod 128)
		/// 	(∵ a≡b (mod m) ⇔ (a－b)÷m∈ℤ)
		/// ∴ P_octet＝128－{(L_octet＋16) mod 128}
		/// 	(∵ K is the smallest solution, K ≥ 0,
		/// 	P＝1＋K, P_octet＝P÷8.)
		const n_message_octets = view_message.length;
		const n_padding_octets = 128
			- ((n_message_octets + 16) & 0b01111111);

		// 	 c. Then append the 128-bit block that is L in binary
		// 	representation. After appending this block, the length
		// 	of the message will be a multiple of 1024 bits.
		//
		///  Safely shifting 53-bit integer without 64-bit shift support
		/// ------------------------------------------------------------
		///  In Javascript, `Number.MAX_SAFE_INTEGER` is
		/// `((2 ** 53) - 1)`. And bitwise operators in Javascript treat
		/// their operands as a sequence of 32 bits. i.e. They do not
		/// work with 53-bit values.
		///
		///  From 53-bit value
		/// 	00000000 000????? ???????? ????????
		/// 	???????? ???????? ???????? ????????
		/// , divide the 53-bit value by (2 ** 29) and take the quotient
		/// into 32-bit value A, the remainder into 32-bit value B:
		/// 	000AAAAA AAAAAAAA AAAAAAAA AAAAAAAA
		/// 	AAABBBBB BBBBBBBB BBBBBBBB BBBBBBBB
		/// , and shift B left by 3 bits:
		/// 	AAAAAAAA AAAAAAAA AAAAAAAA AAAAAAAA
		/// 	BBBBBBBB BBBBBBBB BBBBBBBB BBBBB000
		/// ; then the 53-bit value is safely shifted left by 3 bits
		/// with its half being on A, another half being on B.
		/// 	00000000 ???????? ???????? ????????
		/// 	???????? ???????? ???????? ?????000
		/// .
		const divmod = (dividend, divisor) => [
			Math.floor(dividend / divisor),
			dividend % divisor
		];
		const [n_message_bits_more_sig, n_message_bits_less_sig] =
			divmod(n_message_octets, 536870912 /* (2 ** 29) */)
			.map((x, i) => (i ? (x << 3) : x));

		const n_length_block_octets = 16;
		const n_result_octets = n_message_octets
			+ n_padding_octets + n_length_block_octets;
		const result = new ArrayBuffer(n_result_octets);
		const octet_view_result = new Uint8Array(result);
		const view_result = new DataView(result);
		octet_view_result.set(view_message);
		view_result.setUint8(n_message_octets, 0b10000000);
		view_result.setUint32( // Big-endian
			n_message_octets + n_padding_octets + 8,
			n_message_bits_more_sig
		);
		view_result.setUint32( // Big-endian
			n_message_octets + n_padding_octets + 12,
			n_message_bits_less_sig
		);

		// 	 Example: Suppose the original message is the bit string
		//
		// 		01100001 01100010 01100011 01100100 01100101
		//
		// 	After step (a) this gives
		//
		// 		01100001 01100010 01100011 01100100 01100101 1
		//
		// 	Since L = 40, the number of bits in the above is 41 and
		// 	K = 855 "0"s are appended, making the total now 896.
		// 	This gives the following in hex:
		//
		// 		61626364 65800000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		//
		// 	The 128-bit representation of L = 40 is hex 00000000
		// 	00000000 00000000 00000028. Hence the final padded
		// 	message is the following hex:
		//
		// 		61626364 65800000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000000
		// 		00000000 00000000 00000000 00000028

		return result;
	}

	////////////////////////////////////////////////////////////////////////
	// 5.  Functions and Constants Used
	//
	// 	 The following subsections give the six logical functions and
	// 	the table of constants used in each of the hash functions.

	// 5.1.  SHA-224 and SHA-256
	//
	// 	 SHA-224 and SHA-256 use six logical functions, where each
	// 	function operates on 32-bit words, which are represented as x,
	// 	y, and z. The result of each function is a new 32-bit word.
	//
	static CH_32(
		x /*: Number */,
		y /*: Number */,
		z /*: Number */
	) // => Number
	{
		// CH(x, y, z) = (x AND y) XOR ((NOT x) AND z)
		return (x & y) ^ ((~x) & z);
	}
	static MAJ_32(
		x /*: Number */,
		y /*: Number */,
		z /*: Number */
	) // => Number
	{
		// MAJ(x, y, z) = (x AND y) XOR (x AND z) XOR (y AND z)
		return (x & y) ^ (x & z) ^ (y & z);
	}
	static BSIG0_32(x /*: Number */) // => Number
	{
		// BSIG0(x) = ROTR^2(x) XOR ROTR^13(x) XOR ROTR^22(x)
		return SHA2.rotr_32(x, 2) ^ SHA2.rotr_32(x, 13)
			^ SHA2.rotr_32(x, 22);
	}
	static BSIG1_32(x /*: Number */) // => Number
	{
		// BSIG1(x) = ROTR^6(x) XOR ROTR^11(x) XOR ROTR^25(x)
		return SHA2.rotr_32(x, 6) ^ SHA2.rotr_32(x, 11)
			^ SHA2.rotr_32(x, 25);
	}
	static SSIG0_32(x /*: Number */) // => Number
	{
		// SSIG0(x) = ROTR^7(x) XOR ROTR^18(x) XOR SHR^3(x)
		return SHA2.rotr_32(x, 7) ^ SHA2.rotr_32(x, 18) ^ (x >>> 3);
	}
	static SSIG1_32(x /*: Number */) // => Number
	{
		// SSIG1(x) = ROTR^17(x) XOR ROTR^19(x) XOR SHR^10(x)
		return SHA2.rotr_32(x, 17) ^ SHA2.rotr_32(x, 19) ^ (x >>> 10);
	}
	//
	// 	 SHA-224 and SHA-256 use the same sequence of sixty-four
	// 	constant 32-bit words, K0, K1, ..., K63. These words represent
	// 	the first 32 bits of the fractional parts of the cube roots of
	// 	the first sixty-four prime numbers. In hex, these contant words
	// 	are as follows (from left to right):
	//
	/// ==> SHA2.K_32

	// 5.2.  SHA-384 and SHA-512
	//
	// 	 SHA-384 and SHA-512 each use six logical functions, where each
	// 	function operates on 64-bit words, which are represented as x,
	// 	y, and z. The result of each function is a new 64-bit word.
	//
	static CH_64(
		[
			xh /*: Number */, // The highest 32 bits of x.
			xl /*: Number */ // The lowest 32 bits of x.
		],
		[
			yh /*: Number */, // The highest 32 bits of y.
			yl /*: Number */ // The lowest 32 bits of y.
		],
		[
			zh /*: Number */, // The highest 32 bits of z.
			zl /*: Number */ // The lowest 32 bits of z.
		]
	) // => Uint32Array(2)
	{
		// CH(x, y, z) = (x AND y) XOR ((NOT x) AND z)
		const result = new Uint32Array(2);
		result[0] = (xh & yh) ^ ((~xh) & zh);
		result[1] = (xl & yl) ^ ((~xl) & zl);
		return result;
	}
	static MAJ_64(
		[
			xh /*: Number */, // The highest 32 bits of x.
			xl /*: Number */ // The lowest 32 bits of x.
		],
		[
			yh /*: Number */, // The highest 32 bits of y.
			yl /*: Number */ // The lowest 32 bits of y.
		],
		[
			zh /*: Number */, // The highest 32 bits of z.
			zl /*: Number */ // The lowest 32 bits of z.
		]
	) // => Uint32Array(2)
	{
		// MAJ(x, y, z) = (x AND y) XOR (x AND z) XOR (y AND z)
		const result = new Uint32Array(2);
		result[0] = (xh & yh) ^ (xh & zh) ^ (yh & zh);
		result[1] = (xl & yl) ^ (xl & zl) ^ (yl & zl);
		return result;
	}
	static BSIG0_64(x /*: Uint32Array(2) */) // => Uint32Array(2)
	{
		// BSIG0(x) = ROTR^28(x) XOR ROTR^34(x) XOR ROTR^39(x)
		const [ah, al] = SHA2.rotr_64(x, 28);
		const [bh, bl] = SHA2.rotr_64(x, 34);
		const [ch, cl] = SHA2.rotr_64(x, 39);
		const result = new Uint32Array(2);
		result[0] = ah ^ bh ^ ch;
		result[1] = al ^ bl ^ cl;
		return result;
	}
	static BSIG1_64(x /*: Uint32Array(2) */) // => Uint32Array(2)
	{
		// BSIG1(x) = ROTR^14(x) XOR ROTR^18(x) XOR ROTR^41(x)
		const [ah, al] = SHA2.rotr_64(x, 14);
		const [bh, bl] = SHA2.rotr_64(x, 18);
		const [ch, cl] = SHA2.rotr_64(x, 41);
		const result = new Uint32Array(2);
		result[0] = ah ^ bh ^ ch;
		result[1] = al ^ bl ^ cl;
		return result;
	}
	static SSIG0_64(x /*: Uint32Array(2) */) // => Uint32Array(2)
	{
		// SSIG0(x) = ROTR^1(x) XOR ROTR^8(x) XOR SHR^7(x)
		const [ah, al] = SHA2.rotr_64(x, 1);
		const [bh, bl] = SHA2.rotr_64(x, 8);
		const [ch, cl] = SHA2.shr_64(x, 7);
		const result = new Uint32Array(2);
		result[0] = ah ^ bh ^ ch;
		result[1] = al ^ bl ^ cl;
		return result;
	}
	static SSIG1_64(x /*: Uint32Array(2) */) // => Uint32Array(2)
	{
		// SSIG1(x) = ROTR^19(x) XOR ROTR^61(x) XOR SHR^6(x)
		const [ah, al] = SHA2.rotr_64(x, 19);
		const [bh, bl] = SHA2.rotr_64(x, 61);
		const [ch, cl] = SHA2.shr_64(x, 6);
		const result = new Uint32Array(2);
		result[0] = ah ^ bh ^ ch;
		result[1] = al ^ bl ^ cl;
		return result;
	}
	//
	// 	 SHA-384 and SHA-512 use the same sequence of eighty constant
	// 	64-bit words, K0, K1, ..., K79. These words represent the first
	// 	64 bits of the fractional parts of the cube roots of the first
	// 	eighty prime numbers. In hex, these contant words are as follows
	// 	(from left to right):
	//
	/// ==> SHA2.K_64

	////////////////////////////////////////////////////////////////////////
	// 6.  Computing the Message Digest
	//
	// 	 The output of each of the secure hash functions, after being
	// 	applied to a message of N blocks, is the hash quantity H(N). For
	// 	SHA-224 and SHA-256, H(i) can be considered to be eight 32-bit
	// 	words, H(i)0, H(i)1, ..., H(i)7. For SHA-384 and SHA-512, it can
	// 	be considered to be eight 64-bit words, H(i)0, H(i)1, ...,
	// 	H(i)7.
	//
	// 	 As described below, the hash words are initialized, modified as
	// 	each message block is processed, and finally concatenated after
	// 	processing the last block to yield the output. For SHA-256 and
	// 	SHA-512, all of the H(N) variables are concatenated while the
	// 	SHA-224 and SHA-384 hashes are produced by omitting some from
	// 	the final concatenation.
	//
	static process_512(
		view_message /*: Uint8Array */,
		full_length /*: Boolean */
	) // => ArrayBuffer
	{
		// 6.1.  SHA-224 and SHA-256 Initialization
		//
		const H = full_length ? [
			//  For SHA-256, the initial hash value, H(0), consists
			// of the following eight 32-bit words in hex. These
			// words were obtained by taking the first 32 bits of
			// the fractional parts of the square roots of the first
			// eight prime numbers.
			0x6A09E667, /// H(0)0
			0xBB67AE85, /// H(0)1
			0x3C6EF372, /// H(0)2
			0xA54FF53A, /// H(0)3
			0x510E527F, /// H(0)4
			0x9B05688C, /// H(0)5
			0x1F83D9AB, /// H(0)6
			0x5BE0CD19 /// H(0)7
		] : [
			//  For SHA-224, the initial hash value, H(0), consists
			// of the following 32-bit words in hex:
			//
			///  They are the second 32 bits of the fractional parts
			/// of the square roots of the ninth through sixteenth
			/// prime numbers.
			0xC1059ED8, /// H(0)0
			0x367CD507, /// H(0)1
			0x3070DD17, /// H(0)2
			0xF70E5939, /// H(0)3
			0xFFC00B31, /// H(0)4
			0x68581511, /// H(0)5
			0x64F98FA7, /// H(0)6
			0xBEFA4FA4 /// H(0)7
		];

		// 6.2.  SHA-224 and SHA-256 Processing
		//
		// 	 SHA-224 and SHA-256 perform identical processing on
		// 	message blocks and differ only in how H(0) is
		// 	initialized and how they produce their final output.
		// 	They may be used to hash a message, M, having a length
		// 	of L bits, where 0 <= L < 2^64. The algorithm uses (1)
		// 	a message schedule of sixty-four 32-bit words, (2) eight
		// 	working variables of 32 bits each, and (3) a hash value
		// 	of eight 32-bit words.
		//
		// 	 The words of the message schedule are labeled W0, W1,
		// 	......, W63. The eight working variables are labeled a,
		// 	b, c, d, e, f, g, and h. The words of the hash value are
		// 	labeled H(i)0, H(i)1, ......, H(i)7, which will hold the
		// 	initial hash value, H(0), replaced by each successive
		// 	intermediate hash value (after each message block is
		// 	processed), H(i), and ending with the final hash value,
		// 	H(N), after all N blocks are processed. They also use
		// 	two temporary words, T1 and T2.
		//
		// 	 The input message is padded as described in Section 4.1
		// 	above, then parsed into 512-bit blocks that are
		// 	considered to be composed of sixteen 32-bit words M(i)0,
		// 	M(i)1, ......, M(i)15. The following computations are
		// 	then performed for each of the N message blocks. All
		// 	addition is performed modulo 2^32.
		//
		const padded = SHA2.pad_512(view_message);
		const n_blocks = padded.byteLength >>> 6; // (... / 64)
		const M = Array(n_blocks)
			.fill(undefined)
			.map((_, i) => new Proxy(
				new DataView(
					padded, i << 6 /* (i * 64) */, 64
				), {
				get(block_view, j)
				{
					///  Typed array views are in the native
					/// byte-order of the platform whereon
					/// the Javascript engine runs. So I
					/// cannot read a word out of the buffer
					/// with an `Uint32Array` directly.
					return block_view.getUint32(
						j << 2 // j * 4
					); // Big-endian
				}
			}));

		// 	 For i = 1 to N
		//
		/// The index of M in the RFC document starts from 1.
		for(let block_index = 0; block_index < n_blocks; ++block_index)
		{
			// 	1. Prepare the message schedule W:
			const W = [];
			// 		For t = 0 to 15
			for(let t = 0; t < 16; ++t)
			{
				// 		Wt = M(i)t
				W[t] = M[block_index][t];
			}
			// 		For t = 16 to 63
			for(let t = 16; t < 64; ++t)
			{
				// 		Wt = SSIG1(W(t-2)) + W(t-7)
				// 		+ SSIG0(W(t-15)) + W(t-16)
				W[t] = SHA2.add_modulo_32(
					SHA2.SSIG1_32(W[t - 2]),
					W[t - 7],
					SHA2.SSIG0_32(W[t - 15]),
					W[t - 16]
				);
			}

			// 	2. Initialize the working variables:
			// 		a = H(i-1)0
			// 		b = H(i-1)1
			// 		c = H(i-1)2
			// 		d = H(i-1)3
			// 		e = H(i-1)4
			// 		f = H(i-1)5
			// 		g = H(i-1)6
			// 		h = H(i-1)7
			let a = H[0];
			let b = H[1];
			let c = H[2];
			let d = H[3];
			let e = H[4];
			let f = H[5];
			let g = H[6];
			let h = H[7];

			// 	3. Perform the main hash computation:
			// 		For t = 0 to 63
			for(let t = 0; t < 64; ++t)
			{
				// 		T1 = h + BSIG1(e) + CH(e, f, g)
				// 		+ Kt + Wt
				// 		T2 = BSIG0(a) + MAJ(a, b, c)
				// 		h = g
				// 		g = f
				// 		f = e
				// 		e = d + T1
				// 		d = c
				// 		c = b
				// 		b = a
				// 		a = T1 + T2
				const T1 = SHA2.add_modulo_32(
					h,
					SHA2.BSIG1_32(e),
					SHA2.CH_32(e, f, g),
					SHA2.K_32[t],
					W[t]
				);
				const T2 = SHA2.add_modulo_32(
					SHA2.BSIG0_32(a),
					SHA2.MAJ_32(a, b, c)
				);
				h = g;
				g = f;
				f = e;
				e = SHA2.add_modulo_32(d, T1);
				d = c;
				c = b;
				b = a;
				a = SHA2.add_modulo_32(T1, T2);
			}

			// 	4. Compute the intermediate hash value H(i)
			// 		H(i)0 = a + H(i-1)0
			// 		H(i)1 = b + H(i-1)1
			// 		H(i)2 = c + H(i-1)2
			// 		H(i)3 = d + H(i-1)3
			// 		H(i)4 = e + H(i-1)4
			// 		H(i)5 = f + H(i-1)5
			// 		H(i)6 = g + H(i-1)6
			// 		H(i)7 = h + H(i-1)7
			H[0] = SHA2.add_modulo_32(a, H[0]);
			H[1] = SHA2.add_modulo_32(b, H[1]);
			H[2] = SHA2.add_modulo_32(c, H[2]);
			H[3] = SHA2.add_modulo_32(d, H[3]);
			H[4] = SHA2.add_modulo_32(e, H[4]);
			H[5] = SHA2.add_modulo_32(f, H[5]);
			H[6] = SHA2.add_modulo_32(g, H[6]);
			H[7] = SHA2.add_modulo_32(h, H[7]);
		}

		// 	 After the above computations have been sequentially
		// 	performed for all of the blocks in the message, the
		// 	final output is calculated. For SHA-256, this is the
		// 	concatenation of all of H(N)0, H(N)1, through H(N)7.
		// 	For SHA-224, this is the concatenation of H(N)0, H(N)1,
		// 	through H(N)6.
		const result = new ArrayBuffer(full_length ? 32 : 28);
		const view_result = new DataView(result);
		H.forEach((HNi, i) => {
			if(i === 7 && !full_length)
			{
				return;
			}
			// Big-endian
			view_result.setUint32(i << 2 /* (i * 4) */, HNi);
		});
		return result;
	}
	static process_1024(
		view_message /*: Uint8Array */,
		full_length /*: Boolean */,
		initial_vector /*: Array */
	) // => ArrayBuffer
	{
		// 6.3.  SHA-384 and SHA-512 Initialization
		//
		const custom_iv = initial_vector ?
			Array.from(initial_vector) : undefined;
		const H = custom_iv || (full_length ? [
			//  For SHA-512, the initial hash value, H(0), consists
			// of the following eight 64-bit words, in hex. These
			// words were obtained by taking the first 64 bits of
			// the fractional parts of the square roots of the first
			// eight prime numbers.
			new Uint32Array([0x6A09E667, 0xF3BCC908]), /// H(0)0
			new Uint32Array([0xBB67AE85, 0x84CAA73B]), /// H(0)1
			new Uint32Array([0x3C6EF372, 0xFE94F82B]), /// H(0)2
			new Uint32Array([0xA54FF53A, 0x5F1D36F1]), /// H(0)3
			new Uint32Array([0x510E527F, 0xADE682D1]), /// H(0)4
			new Uint32Array([0x9B05688C, 0x2B3E6C1F]), /// H(0)5
			new Uint32Array([0x1F83D9AB, 0xFB41BD6B]), /// H(0)6
			new Uint32Array([0x5BE0CD19, 0x137E2179]) /// H(0)7
		] : [
			//  For SHA-384, the initial hash value, H(0), consists
			// of the following eight 64-bit words, in hex. These
			// words were obtained by taking the first 64 bits of
			// the fractional parts of the square roots of the ninth
			// through sixteenth prime numbers.
			new Uint32Array([0xCBBB9D5D, 0xC1059ED8]), /// H(0)0
			new Uint32Array([0x629A292A, 0x367CD507]), /// H(0)1
			new Uint32Array([0x9159015A, 0x3070DD17]), /// H(0)2
			new Uint32Array([0x152FECD8, 0xF70E5939]), /// H(0)3
			new Uint32Array([0x67332667, 0xFFC00B31]), /// H(0)4
			new Uint32Array([0x8EB44A87, 0x68581511]), /// H(0)5
			new Uint32Array([0xDB0C2E0D, 0x64F98FA7]), /// H(0)6
			new Uint32Array([0x47B5481D, 0xBEFA4FA4]) /// H(0)7
		]);

		// 6.4.  SHA-384 and SHA-512 Processing
		//
		// 	 SHA-384 and SHA-512 perform identical processing on
		// 	message blocks and differ only in how H(0) is
		// 	initialized and how they produce their final output.
		// 	They may be used to hash a message, M, having a length
		// 	of L bits, where 0 <= L < 2^128. The algorithm uses (1)
		// 	a message schedule of eighty 64-bit words, (2) eight
		// 	working variables of 64 bits each, and (3) a hash value
		// 	of eight 64-bit words.
		//
		// 	 The words of the message schedule are labeled W0, W1,
		// 	......, W79. The eight working variables are labeled a,
		// 	b, c, d, e, f, g, and h. The words of the hash value are
		// 	labeled H(i)0, H(i)1, ......, H(i)7, which will hold the
		// 	initial hash value, H(0), replaced by each successive
		// 	intermediate hash value (after each message block is
		// 	processed), H(i), and ending with the final hash value,
		// 	H(N), after all N blocks are processed. They also use
		// 	two temporary words, T1 and T2.
		//
		// 	 The input message is padded as described in Section 4.2
		// 	above, then parsed into 1024-bit blocks that are
		// 	considered to be composed of sixteen 64-bit words M(i)0,
		// 	M(i)1, ......, M(i)15. The following computations are
		// 	then performed for each of the N message blocks. All
		// 	addition is performed modulo 2^64.
		//
		const padded = SHA2.pad_1024(view_message);
		const n_blocks = padded.byteLength >>> 7; // (... / 128)
		const M = Array(n_blocks)
			.fill(undefined)
			.map((_, i) => new Proxy(
				new DataView(
					padded, i << 7 /* (i * 128) */, 128
				), {
				get(block_view, j)
				{
					///  Typed array views are in the native
					/// byte-order of the platform whereon
					/// the Javascript engine runs. So I
					/// cannot read a word out of the buffer
					/// with an `Uint32Array` directly.
					const result = new Uint32Array(2);
					const word_offset = j << 3; // j * 8
					result[0] = block_view.getUint32(
						word_offset
					); // Big-endian
					result[1] = block_view.getUint32(
						word_offset | 0b0100 // + 4
					); // Big-endian
					return result;
				}
			}));

		// 	 For i = 1 to N
		//
		/// The index of M in the RFC document starts from 1.
		for(let block_index = 0; block_index < n_blocks; ++block_index)
		{
			// 	1. Prepare the message schedule W:
			const W = [];
			// 		For t = 0 to 15
			for(let t = 0; t < 16; ++t)
			{
				// 		Wt = M(i)t
				W[t] = M[block_index][t];
			}
			// 		For t = 16 to 63
			for(let t = 16; t < 80; ++t)
			{
				// 		Wt = SSIG1(W(t-2)) + W(t-7)
				// 		+ SSIG0(W(t-15)) + W(t-16)
				W[t] = SHA2.add_modulo_64(
					SHA2.SSIG1_64(W[t - 2]),
					W[t - 7],
					SHA2.SSIG0_64(W[t - 15]),
					W[t - 16]
				);
			}

			// 	2. Initialize the working variables:
			// 		a = H(i-1)0
			// 		b = H(i-1)1
			// 		c = H(i-1)2
			// 		d = H(i-1)3
			// 		e = H(i-1)4
			// 		f = H(i-1)5
			// 		g = H(i-1)6
			// 		h = H(i-1)7
			let a = H[0];
			let b = H[1];
			let c = H[2];
			let d = H[3];
			let e = H[4];
			let f = H[5];
			let g = H[6];
			let h = H[7];

			// 	3. Perform the main hash computation:
			// 		For t = 0 to 79
			for(let t = 0; t < 80; ++t)
			{
				// 		T1 = h + BSIG1(e) + CH(e, f, g)
				// 		+ Kt + Wt
				// 		T2 = BSIG0(a) + MAJ(a, b, c)
				// 		h = g
				// 		g = f
				// 		f = e
				// 		e = d + T1
				// 		d = c
				// 		c = b
				// 		b = a
				// 		a = T1 + T2
				const T1 = SHA2.add_modulo_64(
					h,
					SHA2.BSIG1_64(e),
					SHA2.CH_64(e, f, g),
					SHA2.K_64[t],
					W[t]
				);
				const T2 = SHA2.add_modulo_64(
					SHA2.BSIG0_64(a),
					SHA2.MAJ_64(a, b, c)
				);
				h = g;
				g = f;
				f = e;
				e = SHA2.add_modulo_64(d, T1);
				d = c;
				c = b;
				b = a;
				a = SHA2.add_modulo_64(T1, T2);
			}

			// 	4. Compute the intermediate hash value H(i)
			// 		H(i)0 = a + H(i-1)0
			// 		H(i)1 = b + H(i-1)1
			// 		H(i)2 = c + H(i-1)2
			// 		H(i)3 = d + H(i-1)3
			// 		H(i)4 = e + H(i-1)4
			// 		H(i)5 = f + H(i-1)5
			// 		H(i)6 = g + H(i-1)6
			// 		H(i)7 = h + H(i-1)7
			H[0] = SHA2.add_modulo_64(a, H[0]);
			H[1] = SHA2.add_modulo_64(b, H[1]);
			H[2] = SHA2.add_modulo_64(c, H[2]);
			H[3] = SHA2.add_modulo_64(d, H[3]);
			H[4] = SHA2.add_modulo_64(e, H[4]);
			H[5] = SHA2.add_modulo_64(f, H[5]);
			H[6] = SHA2.add_modulo_64(g, H[6]);
			H[7] = SHA2.add_modulo_64(h, H[7]);
		}

		// 	 After the above computations have been sequentially
		// 	performed for all of the blocks in the message, the
		// 	final output is calculated. For SHA-512, this is the
		// 	concatenation of all of H(N)0, H(N)1, through H(N)7.
		// 	For SHA-384, this is the concatenation of H(N)0, H(N)1,
		// 	through H(N)5.
		const result = new ArrayBuffer(full_length ? 64 : 48);
		const view_result = new DataView(result);
		H.forEach(([HNi_high, HNi_low], i) => {
			if(i >= 6 && !full_length)
			{
				return;
			}
			const word_offset = i << 3; // i * 8
			// Big-endian
			view_result.setUint32(word_offset, HNi_high);
			view_result.setUint32(
				word_offset | 0b0100, // word_offset + 4
				HNi_low
			);
		});
		return result;
	}
	static SHA224(view_message /*: Uint8Array */) // => ArrayBuffer
	{
		return SHA2.process_512(view_message, false);
	}
	static SHA256(view_message /*: Uint8Array */) // => ArrayBuffer
	{
		return SHA2.process_512(view_message, true);
	}
	static SHA384(view_message /*: Uint8Array */) // => ArrayBuffer
	{
		return SHA2.process_1024(view_message, false);
	}
	static SHA512(view_message /*: Uint8Array */) // => ArrayBuffer
	{
		return SHA2.process_1024(view_message, true);
	}
	static generate_SHA512_t_IV(
		t /*: Number */ // The truncation value. An integer within
		// [1, 383] and [385, 511].
	) // => Array
	{
		//  SHA-512/224 (t = 224) and SHA-512/256 (t = 256) are approved
		// hash algorithms. Other SHA-512/t hash algorithms with
		// different t values may be specified in [SP 800-107] in the
		// future as the need arises. Below are the IVs for SHA-512/224
		// and SHA-512/256.
		/// Cache
		if(t === 224) /// SHA-512/224
		{
			// 5.3.6.1  SHA-512/224
			//
			//  For SHA-512/224, the initial hash value, H(0), shall
			// consist of the following eight 64-bit words, in hex:
			//
			return [ /// H(0) for SHA-512/224
				new Uint32Array([0x8C3D37C8, 0x19544DA2]),
				new Uint32Array([0x73E19966, 0x89DCD4D6]),
				new Uint32Array([0x1DFAB7AE, 0x32FF9C82]),
				new Uint32Array([0x679DD514, 0x582F9FCF]),
				new Uint32Array([0x0F6D2B69, 0x7BD44DA8]),
				new Uint32Array([0x77E36F73, 0x04C48942]),
				new Uint32Array([0x3F9D85A8, 0x6A1D36C8]),
				new Uint32Array([0x1112E6AD, 0x91D692A1])
			];
			//  These words were obtained by executing the SHA-512/t
			// IV Generation Function with t = 224.
		}
		if(t === 256) /// SHA-512/256
		{
			// 5.3.6.2  SHA-512/256
			//
			//  For SHA-512/256, the initial hash value, H(0), shall
			// consist of the following eight 64-bit words, in hex:
			//
			return [ /// H(0) for SHA-512/256
				new Uint32Array([0x22312194, 0xFC2BF72C]),
				new Uint32Array([0x9F555FA3, 0xC84C64C2]),
				new Uint32Array([0x2393B86B, 0x6F53B151]),
				new Uint32Array([0x96387719, 0x5940EABD]),
				new Uint32Array([0x96283EE2, 0xA88EFFE3]),
				new Uint32Array([0xBE5E1E25, 0x53863992]),
				new Uint32Array([0x2B0199FC, 0x2C85B8AA]),
				new Uint32Array([0x0EB72DDC, 0x81C52CA2])
			];
			//  These words were obtained by executing the SHA-512/t
			// IV Generation Function with t = 256.
		}

		// 		SHA-512/t IV Generation Function
		//
		//  (begin:)
		// Denote H(0)' to be the initial hash value of SHA-512 as
		// as specified in Section 5.3.5 above.
		// Denote H(0)'' to be the initial hash value computed below.
		// H(0) is the IV for SHA-512/t.
		// For i = 0 to 7
		// 	{
		// 		H(0)''_i = H(0)'_i XOR a5a5a5a5a5a5a5a5 (in hex)
		// 	}
		const initial_vector = [ /// The default initial hash value
			/// of SHA-512, with its entire octets XOR'ed with 0xA5.
			new Uint32Array([0xCFAC43C2, 0x56196CAD]), /// H(0)0
			new Uint32Array([0x1EC20B20, 0x216F029E]), /// H(0)1
			new Uint32Array([0x99CB56D7, 0x5B315D8E]), /// H(0)2
			new Uint32Array([0x00EA509F, 0xFAB89354]), /// H(0)3
			new Uint32Array([0xF4ABF7DA, 0x08432774]), /// H(0)4
			new Uint32Array([0x3EA0CD29, 0x8E9BC9BA]), /// H(0)5
			new Uint32Array([0xBA267C0E, 0x5EE418CE]), /// H(0)6
			new Uint32Array([0xFE4568BC, 0xB6DB84DC]) /// H(0)7
		];
		// H(0) = SHA-512("SHA-512/t") using H(0)'' as the IV, where t
		// is the specific truncation value.
		//  (end.)
		const string_to_buffer_view = string => new Uint8Array(
			Array
				.from(string)
				.map(ch => ch.charCodeAt())
		);
		const generated_iv = SHA2.process_1024(
			string_to_buffer_view("SHA-512/" + t),
			true,
			initial_vector
		);
		const view_generated_iv = new DataView(generated_iv);
		const result = [];
		for(let word_index = 0; word_index < 8; ++word_index)
		{
			const offset = word_index << 3; /// word_index * 8
			const word = new Uint32Array(2);
			/// Big-endian
			word[0] = view_generated_iv.getUint32(offset);
			word[1] = view_generated_iv.getUint32(offset + 4);
			result.push(word);
		}
		return result;
	}
	static SHA512_t(
		t /*: Number */, // The truncation value. A multiple of 8,
		// within [1, 383] and [385, 511].
		view_message /*: Uint8Array */
	) // => ArrayBuffer
	{
		// 5.3.6  SHA-512/t
		//
		//  "SHA-512/t" is the general name for a t-bit hash function
		// based on SHA-512 whose output is truncated to t bits. Each
		// hash function requires a distinct initial hash value. This
		// section provides a procedure for determining the initial
		// value for SHA-512/t for a given value of t.
		//
		//  For SHA-512/t, t is any positive integer without a leading
		// zero such that t < 512, and t is not 384. For example: t is
		// 256, but not 0256, and "SHA-512/t" is "SHA-512/256" (an 11
		// character long ASCII string), which is equivalent to 53 48 41
		// 2D 35 31 32 2F 32 35 36 in hexadecimal.
		//
		//  The initial hash value for SHA-512/t, for a given value of
		// t, shall be generated by the SHA-512/t IV Generation Function
		// below.
		if(t & 0b0111) /// If t is not a multiple of 8.
		{
			/// In order to keep the implementation simple.
			throw Error(
				"Only SHA-512/t "
				+ "where t is a multiple of 8 is supported."
			);
		}
		const n_hash_octets = t >> 3; /// t / 8
		const iv = SHA2.generate_SHA512_t_IV(t);
		const hash = SHA2.process_1024(view_message, true, iv);
		const truncated = hash.slice(0, n_hash_octets);
		return truncated;
	}
	static SHA512_224(view_message /*: Uint8Array */) // => ArrayBuffer
	{
		return SHA2.SHA512_t(224, view_message);
	}
	static SHA512_256(view_message /*: Uint8Array */) // => ArrayBuffer
	{
		return SHA2.SHA512_t(256, view_message);
	}
}
SHA2.K_32 = Object.freeze([
	// (Math.cbrt(2) % 1).toString(16) === "0.428a2f98d728b"
	0x428A2F98, // K0
	0x71374491, // K1
	0xB5C0FBCF, // K2
	0xE9B5DBA5, // K3
	0x3956C25B, // K4
	0x59F111F1, // K5
	0x923F82A4, // K6
	0xAB1C5ED5, // K7
	0xD807AA98, // K8
	0x12835B01, // K9
	0x243185BE, // K10
	0x550C7DC3, // K11
	0x72BE5D74, // K12
	0x80DEB1FE, // K13
	0x9BDC06A7, // K14
	0xC19BF174, // K15
	0xE49B69C1, // K16
	0xEFBE4786, // K17
	0x0FC19DC6, // K18
	0x240CA1CC, // K19
	0x2DE92C6F, // K20
	0x4A7484AA, // K21
	0x5CB0A9DC, // K22
	0x76F988DA, // K23
	0x983E5152, // K24
	0xA831C66D, // K25
	0xB00327C8, // K26
	0xBF597FC7, // K27
	0xC6E00BF3, // K28
	0xD5A79147, // K29
	0x06CA6351, // K30
	0x14292967, // K31
	0x27B70A85, // K32
	0x2E1B2138, // K33
	0x4D2C6DFC, // K34
	0x53380D13, // K35
	0x650A7354, // K36
	0x766A0ABB, // K37
	0x81C2C92E, // K38
	0x92722C85, // K39
	0xA2BFE8A1, // K40
	0xA81A664B, // K41
	0xC24B8B70, // K42
	0xC76C51A3, // K43
	0xD192E819, // K44
	0xD6990624, // K45
	0xF40E3585, // K46
	0x106AA070, // K47
	0x19A4C116, // K48
	0x1E376C08, // K49
	0x2748774C, // K50
	0x34B0BCB5, // K51
	0x391C0CB3, // K52
	0x4ED8AA4A, // K53
	0x5B9CCA4F, // K54
	0x682E6FF3, // K55
	0x748F82EE, // K56
	0x78A5636F, // K57
	0x84C87814, // K58
	0x8CC70208, // K59
	0x90BEFFFA, // K60
	0xA4506CEB, // K61
	0xBEF9A3F7, // K62
	0xC67178F2 // K63
]);
SHA2.K_64 = Object.freeze([
	// Unfortunately, an `ArrayBuffer` cannot be frozen.
	Object.freeze([0x428A2F98, 0xD728AE22]), // K0
	Object.freeze([0x71374491, 0x23EF65CD]), // K1
	Object.freeze([0xB5C0FBCF, 0xEC4D3B2F]), // K2
	Object.freeze([0xE9B5DBA5, 0x8189DBBC]), // K3
	Object.freeze([0x3956C25B, 0xF348B538]), // K4
	Object.freeze([0x59F111F1, 0xB605D019]), // K5
	Object.freeze([0x923F82A4, 0xAF194F9B]), // K6
	Object.freeze([0xAB1C5ED5, 0xDA6D8118]), // K7
	Object.freeze([0xD807AA98, 0xA3030242]), // K8
	Object.freeze([0x12835B01, 0x45706FBE]), // K9
	Object.freeze([0x243185BE, 0x4EE4B28C]), // K10
	Object.freeze([0x550C7DC3, 0xD5FFB4E2]), // K11
	Object.freeze([0x72BE5D74, 0xF27B896F]), // K12
	Object.freeze([0x80DEB1FE, 0x3B1696B1]), // K13
	Object.freeze([0x9BDC06A7, 0x25C71235]), // K14
	Object.freeze([0xC19BF174, 0xCF692694]), // K15
	Object.freeze([0xE49B69C1, 0x9EF14AD2]), // K16
	Object.freeze([0xEFBE4786, 0x384F25E3]), // K17
	Object.freeze([0x0FC19DC6, 0x8B8CD5B5]), // K18
	Object.freeze([0x240CA1CC, 0x77AC9C65]), // K19
	Object.freeze([0x2DE92C6F, 0x592B0275]), // K20
	Object.freeze([0x4A7484AA, 0x6EA6E483]), // K21
	Object.freeze([0x5CB0A9DC, 0xBD41FBD4]), // K22
	Object.freeze([0x76F988DA, 0x831153B5]), // K23
	Object.freeze([0x983E5152, 0xEE66DFAB]), // K24
	Object.freeze([0xA831C66D, 0x2DB43210]), // K25
	Object.freeze([0xB00327C8, 0x98FB213F]), // K26
	Object.freeze([0xBF597FC7, 0xBEEF0EE4]), // K27
	Object.freeze([0xC6E00BF3, 0x3DA88FC2]), // K28
	Object.freeze([0xD5A79147, 0x930AA725]), // K29
	Object.freeze([0x06CA6351, 0xE003826F]), // K30
	Object.freeze([0x14292967, 0x0A0E6E70]), // K31
	Object.freeze([0x27B70A85, 0x46D22FFC]), // K32
	Object.freeze([0x2E1B2138, 0x5C26C926]), // K33
	Object.freeze([0x4D2C6DFC, 0x5AC42AED]), // K34
	Object.freeze([0x53380D13, 0x9D95B3DF]), // K35
	Object.freeze([0x650A7354, 0x8BAF63DE]), // K36
	Object.freeze([0x766A0ABB, 0x3C77B2A8]), // K37
	Object.freeze([0x81C2C92E, 0x47EDAEE6]), // K38
	Object.freeze([0x92722C85, 0x1482353B]), // K39
	Object.freeze([0xA2BFE8A1, 0x4CF10364]), // K40
	Object.freeze([0xA81A664B, 0xBC423001]), // K41
	Object.freeze([0xC24B8B70, 0xD0F89791]), // K42
	Object.freeze([0xC76C51A3, 0x0654BE30]), // K43
	Object.freeze([0xD192E819, 0xD6EF5218]), // K44
	Object.freeze([0xD6990624, 0x5565A910]), // K45
	Object.freeze([0xF40E3585, 0x5771202A]), // K46
	Object.freeze([0x106AA070, 0x32BBD1B8]), // K47
	Object.freeze([0x19A4C116, 0xB8D2D0C8]), // K48
	Object.freeze([0x1E376C08, 0x5141AB53]), // K49
	Object.freeze([0x2748774C, 0xDF8EEB99]), // K50
	Object.freeze([0x34B0BCB5, 0xE19B48A8]), // K51
	Object.freeze([0x391C0CB3, 0xC5C95A63]), // K52
	Object.freeze([0x4ED8AA4A, 0xE3418ACB]), // K53
	Object.freeze([0x5B9CCA4F, 0x7763E373]), // K54
	Object.freeze([0x682E6FF3, 0xD6B2B8A3]), // K55
	Object.freeze([0x748F82EE, 0x5DEFB2FC]), // K56
	Object.freeze([0x78A5636F, 0x43172F60]), // K57
	Object.freeze([0x84C87814, 0xA1F0AB72]), // K58
	Object.freeze([0x8CC70208, 0x1A6439EC]), // K59
	Object.freeze([0x90BEFFFA, 0x23631E28]), // K60
	Object.freeze([0xA4506CEB, 0xDE82BDE9]), // K61
	Object.freeze([0xBEF9A3F7, 0xB2C67915]), // K62
	Object.freeze([0xC67178F2, 0xE372532B]), // K63
	Object.freeze([0xCA273ECE, 0xEA26619C]), // K64
	Object.freeze([0xD186B8C7, 0x21C0C207]), // K65
	Object.freeze([0xEADA7DD6, 0xCDE0EB1E]), // K66
	Object.freeze([0xF57D4F7F, 0xEE6ED178]), // K67
	Object.freeze([0x06F067AA, 0x72176FBA]), // K68
	Object.freeze([0x0A637DC5, 0xA2C898A6]), // K69
	Object.freeze([0x113F9804, 0xBEF90DAE]), // K70
	Object.freeze([0x1B710B35, 0x131C471B]), // K71
	Object.freeze([0x28DB77F5, 0x23047D84]), // K72
	Object.freeze([0x32CAAB7B, 0x40C72493]), // K73
	Object.freeze([0x3C9EBE0A, 0x15C9BEBC]), // K74
	Object.freeze([0x431D67C4, 0x9C100D4C]), // K75
	Object.freeze([0x4CC5D4BE, 0xCB3E42B6]), // K76
	Object.freeze([0x597F299C, 0xFC657E2A]), // K77
	Object.freeze([0x5FCB6FAB, 0x3AD6FAEC]), // K78
	Object.freeze([0x6C44198C, 0x4A475817]) // K79
]);
Object.freeze(SHA2);

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

const crypto = require("crypto"); // Make use of this if available.
const crypto_available_hashes = crypto.getHashes();
const crypto_sha224_support = crypto_available_hashes.includes("sha224");
const crypto_sha256_support = crypto_available_hashes.includes("sha256");
const crypto_sha384_support = crypto_available_hashes.includes("sha384");
const crypto_sha512_support = crypto_available_hashes.includes("sha512");

class SHA2Wrapper
{
	static into_buffer(source, /* ...... */) // => Buffer
	{
		if(Buffer.isBuffer(source))
		{
			return source;
		} // else:
		return Buffer.from(...arguments);
	}

	static SHA224(/* ...... */) // => Buffer
	{ // SHA-224
		const source_buffer = SHA2Wrapper.into_buffer(...arguments);
		if(crypto_sha224_support)
		{
			const hash = crypto.createHash("sha224");
			hash.update(source_buffer);
			return hash.digest();
		} // else:
		return Buffer.from(SHA2.SHA224(source_buffer));
	}
	static SHA256(/* ...... */) // => Buffer
	{ // SHA-256
		const source_buffer = SHA2Wrapper.into_buffer(...arguments);
		if(crypto_sha256_support)
		{
			const hash = crypto.createHash("sha256");
			hash.update(source_buffer);
			return hash.digest();
		} // else:
		return Buffer.from(SHA2.SHA256(source_buffer));
	}
	static SHA384(/* ...... */) // => Buffer
	{ // SHA-384
		const source_buffer = SHA2Wrapper.into_buffer(...arguments);
		if(crypto_sha384_support)
		{
			const hash = crypto.createHash("sha384");
			hash.update(source_buffer);
			return hash.digest();
		} // else:
		return Buffer.from(SHA2.SHA384(source_buffer));
	}
	static SHA512(/* ...... */) // => Buffer
	{ // SHA-512
		const source_buffer = SHA2Wrapper.into_buffer(...arguments);
		if(crypto_sha512_support)
		{
			const hash = crypto.createHash("sha512");
			hash.update(source_buffer);
			return hash.digest();
		} // else:
		return Buffer.from(SHA2.SHA512(source_buffer));
	}
	static SHA512_224(/* ...... */) // => Buffer
	{ // SHA-512/224
		const source_buffer = SHA2Wrapper.into_buffer(...arguments);
		return Buffer.from(SHA2.SHA512_224(source_buffer));
	}
	static SHA512_256(/* ...... */) // => Buffer
	{ // SHA-512/256
		const source_buffer = SHA2Wrapper.into_buffer(...arguments);
		return Buffer.from(SHA2.SHA512_256(source_buffer));
	}
	static SHA512_t(t /*: Number */, /* ...... */) // => Buffer
	{ // SHA-512/t
		const source_arguments = Array.from(arguments);
		source_arguments.shift();
		const source_buffer =
			SHA2Wrapper.into_buffer(...source_arguments);
		return Buffer.from(SHA2.SHA512_t(t, source_buffer));
	}
}

module.exports = Object.freeze({
	// SHA-224
	"SHA-224": SHA2Wrapper.SHA224,
	"SHA_224": SHA2Wrapper.SHA224,
	"SHA224": SHA2Wrapper.SHA224,
	"sha-224": SHA2Wrapper.SHA224,
	"sha_224": SHA2Wrapper.SHA224,
	"sha224": SHA2Wrapper.SHA224,

	// SHA-256
	"SHA-256": SHA2Wrapper.SHA256,
	"SHA_256": SHA2Wrapper.SHA256,
	"SHA256": SHA2Wrapper.SHA256,
	"sha-256": SHA2Wrapper.SHA256,
	"sha_256": SHA2Wrapper.SHA256,
	"sha256": SHA2Wrapper.SHA256,

	// SHA-384
	"SHA-384": SHA2Wrapper.SHA384,
	"SHA_384": SHA2Wrapper.SHA384,
	"SHA384": SHA2Wrapper.SHA384,
	"sha-384": SHA2Wrapper.SHA384,
	"sha_384": SHA2Wrapper.SHA384,
	"sha384": SHA2Wrapper.SHA384,

	// SHA-512
	"SHA-512": SHA2Wrapper.SHA512,
	"SHA_512": SHA2Wrapper.SHA512,
	"SHA512": SHA2Wrapper.SHA512,
	"sha-512": SHA2Wrapper.SHA512,
	"sha_512": SHA2Wrapper.SHA512,
	"sha512": SHA2Wrapper.SHA512,

	// SHA-512/224
	"SHA-512/224": SHA2Wrapper.SHA512_224,
	"SHA_512_224": SHA2Wrapper.SHA512_224,
	"SHA512_224": SHA2Wrapper.SHA512_224,
	"SHA_512224": SHA2Wrapper.SHA512_224,
	"SHA512224": SHA2Wrapper.SHA512_224,
	"sha-512/224": SHA2Wrapper.SHA512_224,
	"sha_512_224": SHA2Wrapper.SHA512_224,
	"sha512_224": SHA2Wrapper.SHA512_224,
	"sha_512224": SHA2Wrapper.SHA512_224,
	"sha512224": SHA2Wrapper.SHA512_224,

	// SHA-512/256
	"SHA-512/256": SHA2Wrapper.SHA512_256,
	"SHA_512_256": SHA2Wrapper.SHA512_256,
	"SHA512_256": SHA2Wrapper.SHA512_256,
	"SHA_512256": SHA2Wrapper.SHA512_256,
	"SHA512256": SHA2Wrapper.SHA512_256,
	"sha-512/256": SHA2Wrapper.SHA512_256,
	"sha_512_256": SHA2Wrapper.SHA512_256,
	"sha512_256": SHA2Wrapper.SHA512_256,
	"sha_512256": SHA2Wrapper.SHA512_256,
	"sha512256": SHA2Wrapper.SHA512_256,

	// SHA-512/t
	// t must satisfy 0 < t < 512 and t =/= 384.
	// Only t that is a multiple of 8 is supported.
	"SHA-512/t": SHA2Wrapper.SHA512_t,
	"SHA_512_t": SHA2Wrapper.SHA512_t,
	"SHA512_t": SHA2Wrapper.SHA512_t,
	"SHA_512t": SHA2Wrapper.SHA512_t,
	"SHA512t": SHA2Wrapper.SHA512_t,
	"sha-512/t": SHA2Wrapper.SHA512_t,
	"sha_512_t": SHA2Wrapper.SHA512_t,
	"sha512_t": SHA2Wrapper.SHA512_t,
	"sha_512t": SHA2Wrapper.SHA512_t,
	"sha512t": SHA2Wrapper.SHA512_t
});
