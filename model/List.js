//
//
//
class List {
    constructor(){
        this.list = []
    }

    getAll() {
        return this.list
    }

    /**
     * Add only unique values. 
     * 
     * @param {*} value The value to add. 
     * @param {*} callback (err, result) : err when duplicate, result when noduplicate found.
     */
    add(value, callback){

        /**
         * Add only unique values. We want to check wether the value to add already
         * exists in the list. We also want to abort further looping when a duplicate 
         * has been found. Otherwise we would always loop the entire list, even when 
         * a duplicate has already been found.
         * Since the first item must always be pushed onto the empty list, use do/while.
         */
        let duplicates = this.list.filter(function(elem) {
            // console.log(i, elem)
            return elem.email === value.email
        })
        // console.log(duplicates)
        if(duplicates.length === 0) {
            this.list.push(value)
            callback(null, true)
        } else {
            callback('Duplicate item found for ' + value.email, null)
        }
    }

    /**
     * Get the item having the given email, or error otherwise.
     * 
     * @param {*} email 
     * @param {*} callback 
     */
    getByEmail(email, callback) {
        let item = this.list.filter(function (elem) {
            return elem.email === email
        })
        if (item.length === 1) {
            callback(null, item[0])
        } else {
            callback('Item was not found: ' + email, null)
        }
    }
    
}

module.exports = List