const snarkjs = require("snarkjs");
const circom = require("circomlib");
const crypto = require("crypto");
const fs = require('fs');

function buffer2bits(buff) {
    const res = [];
    for (let i=0; i<buff.length; i++) {
        for (let j=0; j<8; j++) {
            if ((buff[i]>>j)&1) {
                res.push(snarkjs.bigInt.one);
            } else {
                res.push(snarkjs.bigInt.zero);
            }
        }
    }
    return res;
}

function stringifyBigInts(o) {
    if ((typeof(o) == "bigint") || (o instanceof snarkjs.bigInt))  {
        return o.toString(10);
    } else if (Array.isArray(o)) {
        return o.map(stringifyBigInts);
    } else if (typeof o == "object") {
        const res = {};
        for (let k in o) {
            res[k] = stringifyBigInts(o[k]);
        }
        return res;
    } else {
        return o;
    }
}

const msg = Buffer.from(fs.readFileSync("./message", "utf8"), "hex");
const prvKey = crypto.randomBytes(32);
console.log("Private key Hex: " + prvKey.toString('hex'))

const public_key = circom.eddsa.prv2pub(prvKey);
const public_point_in_curve = circom.babyJub.packPoint(public_key);

const signed_msg = circom.eddsa.sign(prvKey, msg);

const packed_signed_msg = circom.eddsa.packSignature(signed_msg);
const unpacked_signed_msg = circom.eddsa.unpackSignature(packed_signed_msg);

console.log("Verified: " + circom.eddsa.verify(msg, unpacked_signed_msg, public_key));

const msg_bits = stringifyBigInts(buffer2bits(msg));
const r8_bits = stringifyBigInts(buffer2bits(packed_signed_msg.slice(0, 32)));
const s_bits = stringifyBigInts(buffer2bits(packed_signed_msg.slice(32, 64)));
const a_bits = stringifyBigInts(buffer2bits(public_point_in_curve));


const inputs = {"A": a_bits, "R8": r8_bits, "S": s_bits, "msg": msg_bits}

fs.writeFileSync('./input.json', JSON.stringify(inputs));

// const w = circuit.calculateWitness({A: aBits, R8: r8Bits, S: sBits, msg: msgBits});
// assert(circuit.checkWitness(w));
