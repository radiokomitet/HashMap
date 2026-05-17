class HashMap{
    constructor(load_factor = 0.75, capacity = 16){
        this.load_factor = load_factor;
        this.capacity = capacity;
        this.buckets = Array.from({length: capacity}, () => []);
        this.size = 0;
    }

    hash(key){
        let hashCode = 0
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))% this.capacity;
        }
        return hashCode;
        }

    checkIndex(index){
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
    }

    set(key,value){
        if(typeof key !=="string"){
            throw new Error("Keys must be strings");
        }
        const index = this.hash(key);
        this.checkIndex(index);

        const bucket = this.buckets[index];

        for(let pair of bucket){
            if(pair[0] ===key){
                pair[1] = value;
                return;
            }
        }
        bucket.push([key,value]);
        this.size++;

        if(this.size/this.capacity > this.load_factor){
            this.resize();
        }
    }
    get(key){
        const index = this.hash(key);
        this.checkIndex(index);
        const bucket = this.buckets[index];
        for(let pair of bucket){
            if(pair[0] === key){
                return pair[1];
            }
        }
        return null;
    }
    has(key){
        const index = this.hash(key);
        this.checkIndex(index);
        let bucket = this.buckets[index];
        for(let pair of bucket){
            if(pair[0] === key){
                return true
            }
        }
        return false;
    }
    remove(key){
        const index = this.hash(key);
        this.checkIndex(index);
        const bucket = this.buckets[index];

        for(let i = 0; i<bucket.length;i++){
            if(bucket[i][0] ===key){
                bucket.splice(i,1);
                this.size--;
                return true;
            }
        }
        return false
    }
    length(){
        return this.size;
    }
    clear(){
        this.buckets = Array.from({length: this.capacity}, () => []);
        this.size = 0;
    }
    keys(){
        const keysArray = [];

        for(let bucket of this.buckets){
            for(let pair of bucket){
                keysArray.push(pair[0])
            }
        }
        return keysArray;
    }
    values(){
        const valueArray = [];
        for(let bucket of this.buckets){
            for(let pair of bucket){
                valueArray.push(pair[1])
            }
        }
        return valueArray;
    }
    entries(){
        let entryArray = [];
        for(let bucket of this.buckets){
            for(let pair of bucket){
                entryArray.push(pair);
            }
        }
        return entryArray;
    }
    resize(){
        const oldBuckets = this.buckets;

        this.capacity *= 2;

        this.buckets = Array.from({length: this.capacity},()=>[]);

        this.size = 0;

        for(let bucket of oldBuckets){
            for(let pair of bucket){
                this.set(pair[0], pair[1]);
            }
        }
    }
}


const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log(test.length()); // 12
console.log(test.capacity); // 16
test.set('moon', 'silver')
console.log(test.get('moon')) // silver
console.log(test.get('apple')) // RED
console.log(test.has('frog')) // true
console.log(test.has('unknown')) // false
test.remove('dog');
console.log(test.has('dog')); // false
console.log(test.length());   // 12
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.clear();

console.log(test.length()); // 0
console.log(test.capacity); // 32 (zostaje)