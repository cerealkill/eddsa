# EdDSA Signature Zknark Smart-Contract Test

Boilerplate to deploy EdDSA signature validation circuit smart-contract.

## Usage
First install deps:
```
npm i
```
Generate new private key and `input.json` containing it:
```
node generate_inputs.js
```
Calculate the snark scheme witness, `witness.json` for provided input
```
snarkjs calculatewitness
```
Generate local proof and scheme outputs
```
snarkjs proof
```
Test is all went smooth:
```
snarkjs verify
```
Generate the solidity `verifier.sol` smart-contract
```
snarkjs generateverifier
```

Now deploy the smart-contract on your favorite EWM based chain
And then use the tool to generate the smart-contract method call
```
snarkjs generatecall
```

## References
- [Circom Tutorial](https://github.com/iden3/circom/blob/master/TUTORIAL.md)
- [Circom Features](https://hackmd.io/s/HyDvec4SN)
    - Binary to Field and Field to Binary converters
    - BabyJub Addition and scalar multiplication
    - EdDSA
    - BabyJub Point compressor/decompressor
    - Pedersen commitments
    - MiMC7 Hash
    - Sparse Merkle trees processors to add/update/remove elements to a Sparse merkle tree.
    - Sparse Merkle tree verifiers to verify inclusion and exclussion.
    - Comparators
    - Logical operators like adders and Binary Gates.
    - SHA256 Hash function.
- [EdDSA on Wikipedia](https://en.wikipedia.org/wiki/EdDSA)
- [Glitching Arduino Nano to steal EdDSA keys](https://research.kudelskisecurity.com/2017/10/04/defeating-eddsa-with-faults/)
- [Zcash on JubJub and other new primitives included in Circom](https://z.cash/technology/jubjub/)
